const mongoose = require("mongoose");

const blacklisttokenschema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

blacklisttokenschema.index({createdAt:1},{expireAfterSeconds:3600})