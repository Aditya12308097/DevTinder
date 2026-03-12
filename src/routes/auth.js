const express = require('express');

const {validateSignupData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../Models/userModel");


const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
    // console.log(req.body);
    try{
        //validate the data
        validateSignupData(req);
        //now encrypt the password
        const {firstName, lastName , emailId , password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        // save the data to the database
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash
        });
        await user.save();//this command will save the data inside the User collection
        res.send("User data successfully saved into database");
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
  
});
authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Please, enter correct emailId");
        }
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isValidPassword = await user.validatePassword(password);
        if(isValidPassword){
            //generate the token
                const token = await user.getJWT();

                res.cookie("token",token,{
                expires : new Date(Date.now()+8*3600000)
            });
            res.status(201).send("Login Succesfull");
        }else{
            throw new Error("Invalid credentials");
        }
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
})

module.exports = authRouter;