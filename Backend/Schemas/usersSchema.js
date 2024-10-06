const mongoose = require('mongoose')
const details = {
   name : {
        type : String,
        unique : false
    },
    email : {
        type : String,
        unique : true
    },
    password : String,
    about : {
        type : String,
        default : ""
    }

}
const detailsSchema = new mongoose.Schema(details,{collection : 'Users'});
const Users = mongoose.model('Users',detailsSchema);
module.exports = Users;