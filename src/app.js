const express = require('express');
const app = express();
const {adminAuth} = require("./Middlewares/auth");
app.get("/admin/getAllData", adminAuth , (req,res)=>{
    res.send("All data sent");
});
app.delete("/admin/deleteData",adminAuth,(req,res)=>{
    res.send('Deleted the data');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000....');
});
 