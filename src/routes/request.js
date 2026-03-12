const express = require('express');

const {userAuth} = require("../Middlewares/auth");

const requestRouter = express.Router();
requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
   try{ 
        const user = req.user;
        res.send(user.firstName + " is sending a friend request!!!!");
    }catch(err){
        res.status(400).send("Error: "+ err.message);

    }
});

module.exports = requestRouter;