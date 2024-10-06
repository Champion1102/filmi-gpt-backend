const bcrypt = require("bcrypt");
require("dotenv").config();
const Verification = require("../../../middleware/verification");
const Users  = require('../../../Schemas/usersSchema');

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        console.log("Request body:", req.body);

        const checkEmail = await Users.findOne({ email: email });
        console.log("Email check:", checkEmail);

        if (checkEmail) {
            return res.status(400).send({ message: "Email is already registered" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new Users({
            name,
            email,
            password: hash,
            about: req.body.about || ""
        });

        await user.save();

        const payload = { name, email };

        console.log('Generating JWT token');
        const token = Verification.generateJwt(payload);

        console.log('Generating refresh token');
        const refreshToken = Verification.generateRefreshToken(payload);

        res.status(200).send({
            message: "Success",
            jwtToken: token,
            refreshToken: refreshToken,
        });

    } catch (e) {
        console.error('Error during signup:', e);
        res.status(500).send({ message: "Something went wrong while signing up" });
    }
};

module.exports = signup;
