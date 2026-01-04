const validator = require("validator");

const validateSignupData = (req)=>{
    const {firstName, lastName , emailId, password} = req.body;
    if(validator.isEmpty(firstName) || validator.isEmpty(lastName) || validator.isEmpty(emailId) || validator.isEmpty(password)){
        throw new Error("Please enter required fields");
    }else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("FirstName length should be in between 4 to 50 characters");
    }else if(lastName.length<4 || lastName.length>50){
        throw new Error("FirstName length should be in between 4 to 50 characters");
    }else if(!validator.isEmail(emailId)){
         throw new Error("Please Enter correct emailId");

    }else if(!validator.isStrongPassword(password)){
         throw new Error("Please , enter a strong password");
    }

}
module.exports = {validateSignupData};