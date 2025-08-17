const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
// const JWT = require("jsonwebtoken");

//POST API
authRouter.post("/signUp", async (req, res) => {
    try{
        //validate the password
        validateSignUpData(req,res);

        const {firstName, lastName, email, password, phoneNumber, gender, age, bio, status} = req.body;
        //encrypt the password
        // const {password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        // req.body.password = passwordHash;

        //create a instance of user model
        const user = new UserModel(
            {
                firstName,
                lastName,
                email,
                password: passwordHash,
                phoneNumber,
                gender,
                age,
                bio,
                status
            }
        );
        // const user = new UserModel(req.body); //insted of using userObj we are using post data
        await user.save(); // instance of model
        res.send("User added succesfully!");
    }catch(err){
       res.status(400).send(err.message);
    }
});

//login API
authRouter.post("/login", async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            const result = await user.validatePassword(password, user.password);
            if(result){
                //Logic of cookie
                //Create JWT token
                // const token = await JWT.sign({_id: user._id}, "DEV@tinder123", {expiresIn: "1d"});//DEV@tinder123 is the password only server knows
                const token = await user.getJWTToken();
                //Add the token to cookie and send the response back to user
                res.cookie("token",token, {expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true});//cookie will expire in 1 day, 
                return res.send("Login successful");
            }else{
                throw new Error("Invalid credentials");
            }
        }else{
            throw new Error("User not found");
        }
    }catch(err){
        res.status(400).send(err.message);
    }
});

//logout API
authRouter.post("/logout", async (req, res) => {
    //clear the cookie
    try{
        res.clearCookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).send("Logout successful");
    }catch(err){
        res.status(400).send(err.message);
    }
});

module.exports = authRouter;