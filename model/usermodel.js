const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is Required field"],
        unique:true,
        trim:true
    },
    age:{
        type:Number,
        required:[true,"age is Required field"]
    },
    address:{
        type:String,
        required:[true,"address is Required field"]
    },
    gender:{
        type:String,
        required:[true,"gender is Required field"]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    }
})

module.exports = User = mongoose.model("user",userSchema);