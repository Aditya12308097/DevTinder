const mongoose =  require("mongoose");
const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://adityateotia59_db_user:Aditya21ajay@namastenode.iaci2vl.mongodb.net/devTinder"
    );
};
module.exports = connectDB;
