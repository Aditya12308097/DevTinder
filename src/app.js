const express = require('express');

const connectDB = require("./config/database");
const User = require("./Models/userModel");
const app = express();
app.use(express.json());
// app.delete("/user",async (req,res)=>{
//     const count = await User.deleteOne({firstName : req.body.firstName});
//     try{console.log(count);
//     res.send("Deleteed User successfully");
//     }catch(err){
//         res.status(400).send("Something went wrong");
//     }
// })
app.delete("/user", async (req,res) =>{
    const userId = req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});
app.patch("/user/:userId", async (req,res)=>{
    const data = req.body;
    const userId = req.params?.userId;

    try{
        const Allowed_updates = ["age","gender","skills","photo","password"];
        const isAllowedUpdates = Object.keys(data).every((k)=>{
                Allowed_updates.includes(k);
        });
        if(!isAllowedUpdates){
            throw new Error("Do not update so much data");
        }
        if(data?.skills.length > 10){
            throw new Error("Can't Store too much skills minimum is 10");
        }
        const user = await User.findByIdAndUpdate({_id: userId},data,{
            returnDocument : "after",
            runValidators : true
        })
        // console.log(user);
        res.send("User Updated Successfully");
    }catch(err){
        res.status(400).send("Something went wrong"+err.message);
    }
})
app.get("/user",async (req,res)=>{
    try{
        const userEmail = req.body.emailId;
        const users = await User.findOne({emailId : userEmail});
        if(!users){
         res.status(401).send("User not found");   
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Something went wrong : "+ err.message);
    }

});
app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})
// app.get("/findById",async (req,res)=>{
//     try{
//         const user = await User.findById({ _id :req.body._id});
//         if(!user){
//             res.status(401).send("User not found");
//         }else{
//             res.send(user)
//         }
//     }catch(err){
//         res.status(400).send("Something went wrong : "+ err.message);
//     }
// })
app.post("/user", async (req, res) => {
    // console.log(req.body);
    try{
        const email = req.body.emailId;
        const userExist = await User.findOne({emailId : email});
        if(userExist){
            throw new Error("User Exists, try with different Email Id ");
        }
        if(req.body.skills.length > 10){
            throw new Error("Can't store too much skills");
        }
        const user = new User(req.body);
        await user.save();//this command will save the data inside the User collection
        res.send("User data successfully saved into database");
    }catch(err){
        res.status(400).send("Something went wrong : "+ err.message);
    }
  
});
// app.post("/dummyDataSignup", async (req,res)=>{
//     try{
//         const userData = {
//             firstName : "Govind Singh",
//             lastName : "Teotia",
//             emailId : "govindSingh@gmail.com",
//             password : "Govind@123",
//         };
//         const user = new User(userData);
//         await user.save();
//         res.send("Data saved successfully");
//     }catch(err){
//         res.status(400).send("Something went wrong");
//     }
// })
connectDB()
.then(()=>{
    console.log("Connected to the Database");
    app.listen(3000,()=>{
    console.log('Server is running on port 3000....');
    });
})
.catch((err)=>{
    console.error("Error in the connection");
    console.log(err);
});

 