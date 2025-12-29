const express = require('express');
const app = express();

app.use("/test",(req,res)=>{
    res.send('Hello Chaudhary Saab from this side!!!');
});

app.use("/about",(req,res)=>{
    res.send('This is about us page and I am Jaat!!!');
});

app.use("/",(req,res)=>{
    res.send('Hello World Jaat!!!');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000....');
});
