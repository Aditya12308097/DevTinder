const express = require('express');

const connectDB = require("./config/database");
const User = require("./Models/userModel");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
    console.log(req.body);
    try{
        const user = new User(req.body);
        await user.save();//this command will save the data inside the User collection
        res.send("User data successfully saved into database");
    }catch(err){
        res.status(400).send("Something went wrong : "+ err.message);
    }
  
});
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

 