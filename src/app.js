const express = require('express');
const app = express();
// error handling
// app.get("/user",(req,res)=>{
//     // suppose there is any error in the code
//     throw new Error("tewjvjk  bqj najwnfjb efbubjksabwiuf ");
//     res.send("This is the error handling portion");
    
// })
// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something went wrong");

//     }
// });
//Second way to handle this error always use try and catch block
app.use("/user",(req,res)=>{
    try{
       throw new Error("tewjvjk  bqj najwnfjb efbubjksabwiuf ");
        res.send("This is the error handling portion");
    }catch(err){
        res.status(500).send("Something went wrong please conatct the support team");
    }
});
//this will run when we throw an error but we are handling it inside try catch block if you do not use it it will run
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong");

    }
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000....');
});
 