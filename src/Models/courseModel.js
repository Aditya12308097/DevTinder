const mongoose = require("mongoose");
 const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    instructor : {
        type : String,
        default : "Staff"
    },
    students :{
        type : [String],
        default : ["students"]
    },
    createdAt :{
        type : Date,
        default : Date.now()
    }
 },{
    timestamps : true
 });

const Course = mongoose.model("Course",courseSchema);

module.exports = Course;