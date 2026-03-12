const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const userAuth = async (req,res,next)=>{
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Validation Failed , Please Login again");
        }

        const decodedObj = await jwt.verify(token,"DEV@Tinder$123");
        
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User does not exists");

        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).send("Error "+ err.message);
    }
};
module.exports = {userAuth};
// const cookies = req.cookies; // this is to read the cookie
        // const {token} = cookies; //extract the token from the cookie
        // if(!token){
        //     //if there is no cookie then or your cookie has expired then login again 
        //     throw new Error("Validation failed, please login again");
        // }
        // //validate the token
        // const decoded = await jwt.verify(token,"DEV@Tinder$123"); // retuns a object with hiding information and something which is addded by jwt 
        // const {_id} = decoded; // extract the id from the decoded message
        // const user = await User.findOne({_id }); //fetching the data of user from the database
        // if(!user){
        //     throw new Error("User does not exists");
        // }