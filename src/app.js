const express = require('express');
const app = express();



// app.use("/test/2",(req,res)=>{
//     res.send('Hello Test2 Route!!!');
// });

// app.use("/test",(req,res)=>{
//     res.send('Hello Chaudhary Saab from this side!!!');
// });// here an by default get api call comes 

// app.use("/about",(req,res)=>{
//     res.send('This is about us page and I am Jaat!!!');
// });

// app.use("/",(req,res)=>{
//     res.send('Hello World Jaat!!!');
// });//if you write this at first route then it will override all other routes

app.get("/user",(req,res)=>{
    res.send({name :"Aditya Teotia", age:21, city:"Delhi"});
});
app.post("/user",(req,res)=>{
    
    res.send("User data saved successfully into the database!!!");
});
app.put("/user",(req,res)=>{
    res.send('Update the user data !!!');
});
app.delete("/user",(req,res)=>{
    res.send('Delete the user data !!!');
});





app.listen(3000,()=>{
    console.log('Server is running on port 3000....');
});
 