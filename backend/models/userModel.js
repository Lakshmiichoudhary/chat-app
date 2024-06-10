const mongoose = require('mongoose');

const user = mongoose.Schema(
    {
        name : {type : String,required : true},
        email : {type : String , required : true},
        password : { type : String, required : true},
        pic : {
            type : String,
            required : true,
            default : 
            "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
        }
    },
    {
        timestamps : true,
    }
)

const User = mongoose.model("Message",user)

module.exports = User

module.exports = Message;