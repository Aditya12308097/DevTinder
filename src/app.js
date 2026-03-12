const express = require('express');
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');

const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const requestRouter = require('./routes/request');


const app = express();
app.use(express.json());//middleware
app.use(cookieParser());//middleware




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

 