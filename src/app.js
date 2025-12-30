const express = require('express');
const app = express();



app.use("/test/2",(req,res)=>{
    res.send('Hello Test2 Route!!!');
});

app.use("/test",(req,res)=>{
    res.send('Hello Chaudhary Saab from this side!!!');
});// here an by default get api call comes 

app.use("/about",(req,res)=>{
    res.send('This is about us page and I am Jaat!!!');
});

app.use("/",(req,res)=>{
    res.send('Hello World Jaat!!!');
});//if you write this at first route then it will override all other routes

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

app.use("/user",(req,res)=>{
     //what if yoou do not send anything in response , it will go to pending state and will keep loading so giving response is mandatory
    res.send('Hello User , this is user page!!!');
})

// Now a route can have multiple route handlers 
app.use("/multiple",[(req,res,next)=>{
    console.log("This is the first route handler");
    // res.send("Response from first handler");
    next(); // now error will come because as js code is excetes line buy line so that response is already  sent to the client and connection is lost so next handler will not be able to send response again
},(req,res,next)=>{
    console.log("This is the second route handler");
    // res.send("Response from second handler"); /// it is trying to send the response again but connection is already closed so we would get an error in console
    next();
},(req,res,next)=>{
    console.log("This is the third route handler");
    res.send("Response from third handler");
}],(req,res)=>{
    console.log("This is the fourth route handler");
    res.send("Response from fourth handler");
}
);
app.listen(3000,()=>{
    console.log('Server is running on port 3000....');
});
 