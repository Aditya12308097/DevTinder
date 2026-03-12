const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("Can't leave blank firstName");
            }
        }
    },
    lastName :{
        type: String,
        required : true
    },
    emailId :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter the correct Email Address");
            }
        }
    },
    password :{
        type : String,
        required : true,
        minLength : 6,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must contain atleast 1 lowercase letter , 1 upparcase letter, 1 symbol and minimum length must be 8");
            }
        }
    },
    age : {
        type : Number,
        min : 18,
        max : 80
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender Data is not Valid");
            }
        }

    },
    skills :{
        type : [String]
    },
    photo : {
        type : String,
        default : "https://tse1.mm.bing.net/th/id/OIP.PerzV5exJnL_r9J-ZDFY4QHaI4?pid=Api&P=0&h=180",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Please enter correct URL");
            }
        }
    },
    about : {
        type : String,
        default : "I am a Software Developer"
    }

},{
    timestamps : true
  }
);
userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id},"DEV@Tinder$123",{expiresIn : "1h"});
    return token;
}
userSchema.methods.validatePassword = async function(inputPasswordByUser){
     const user = this;
     const passwordhash = user.password;
     const isValidPassword = await bcrypt.compare(inputPasswordByUser,passwordhash);
     return isValidPassword;
}
const User = mongoose.model("User", userSchema);
module.exports = User;
