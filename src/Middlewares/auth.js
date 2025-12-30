const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";// we are authorizing the admin wheather is this admin or someone is trying to fetch the data;
    console.log("Inside the middleware");
    if(!isAdminAuthorized){
        res.status(401).send("Authorization Fails , you are not Admin");
    }else{
        
        next();
    }
};
module.exports = {adminAuth};