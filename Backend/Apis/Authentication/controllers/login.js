const bcrypt = require("bcrypt");
require("dotenv").config();
const Verification = require("../../../middleware/verification");
const Users = require('../../../Schemas/usersSchema');

const login =  async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
      res.status(400).send({ message: "all fields are required" });
      return;
    }


    try {
      const user = await Users.findOne({ email: email });
      if (!user) {
        res
          .status(404)
          .send({ message: "User with this email does not exist" });
        return;
      }
      

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        res.status(400).send({ message: "Wrong password" });
        return;
      }


      const payload = {
        name: user.name,
        email: user.email
      };
      const token = Verification.generateJwt(payload);
      const refreshToken = Verification.generateRefreshToken(payload);


      res.status(200).send({
        message: "login successfull",
        jwtToken: token,
        refreshToken: refreshToken,
      });
      return;
      
    } catch (e) {
      res.status(500).send({ message: e + "something went wrong" });
    }
  }
module.exports = login;