const Users = require('../../../Schemas/usersSchema');
const update = async (req,res)=>{
    const {email,name,about} = req.body;
    if(!email){
        return res.status(400).json({
            message : "please specify the user"
        })
    }
    if(!name && !about){
        return res.status(400).json({
            message : "please provide some data"
        })
    }
    try{
        const user = await Users.findOne({email:email});
        if(!user){
            return res.status(404).json({
                message : "user does not exist"
            })
        }
        if(name){
            await Users.updateOne({email : email},{$set : {name : name}})
        }
        if(about){
            await Users.updateOne({email : email},{$set : {about : about}})
        }
        return res.status(200).json({
            message : "info updated successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            message : "something went wrong while updating info"
        })
    }

}
module.exports = update;