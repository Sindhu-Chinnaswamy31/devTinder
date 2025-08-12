const validator = require("validator");

const validateSignUpData = (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password){
        throw new Error("All fields are required");
    }

    if(firstName.length < 3 || firstName.length > 20){
        throw new Error("First name should be between 3 to 20 characters");
    }

    if(lastName.length < 3 || lastName.length > 20){
        throw new Error("Last name should be between 3 to 20 characters");

    }

    if(!validator.isEmail(email)){
       throw new Error("Email is not valid");

    }

    if(password.length < 6 || password.length > 20){
        throw new Error("Password should be between 6 to 20 characters");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error( "Please enter a strong password");
    }
}

module.exports = {
    validateSignUpData
}