const userModel = require("../models/use.model");
const bcrypt = require('bcrypt');
const blacklisttokenmodel = require("../models/blacklisttoken.model");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");

module.exports.register = async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const user =await userModel.findOne({email});

        if (user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await userModel.create({name,email,password:hashedPassword})

        await newUser.save();
        
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.cookie('token',token);
        res.send({message:"User registered successfully"});
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports.login = async (req, res) => {
    try {
        const {email,password}=req.body;
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const ismatch = await bcrypt.compare(password,user.password);
        if (!ismatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.cookie('token',token);
        res.send({message:"Login successful", user: {id: user._id, name: user.name, email: user.email}});
    }catch(error){
        res.status(500).json({message:error.message})
    }
}