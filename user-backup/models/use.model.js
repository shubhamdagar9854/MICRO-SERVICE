const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model("User",userSchema);