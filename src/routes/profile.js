const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const UserModel = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");
// const JWT = require("jsonwebtoken");

//get profile
profileRouter.get("/profile", userAuth,async (req, res) => {
    try{
        // const cookie = req.cookies.token;
        // if(!cookie){
        //     return res.status(403).send("unauthorised");
        // }
        // console.log(cookie)
        // const users = await UserModel.find({email: req.body.email});
        // if(users.length === 0){
        //     res.status(404).send("User not found");
        // }else{
        //     res.send(users);
        // }

        //second class code
        // const cookies = req.cookies;
        // const {token} = cookies;

        // if(!token){
        //     throw new Error("Invalid token");
        // }

        // const decoded = await JWT.verify(token, "DEV@tinder123");
        const user = req.user;
        if(!user){
            return res.status(404).send("User not found");
        }

        return res.send(user);

    }catch(err){
        res.send(err);
    }
});

//find user by email
profileRouter.get("/userData", async (req, res) => {
    try{
        const users = await UserModel.find({email: req.body.email});
        if(users.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.send(err);
    }
})

//feed API - Get / feed get all the user from the database
profileRouter.get("/feed", async (req, res) => {
    try{
        const users = await UserModel.find();//find also work
        if(users.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.send(err);
    }
});

//get by id
profileRouter.get("/findById", async (req, res) => {
    try{
        const users = await UserModel.findById(req.body._id);
        if(users.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.send(err);
    }
});

//delete API
profileRouter.delete("/deleteUser", async (req, res) => {
    try{
        const users = await UserModel.findByIdAndDelete({_id: req.body.userId});
        if(users == null){
            res.status(404).send("User not found");
        }else{
            res.status(200).send("User deleted successfully");
        }
    }catch(err){
        res.send(err);
    }
});

const ALLOWED_UPDATE_FIELDS = ["firstName", "lastName", "phoneNumber", "gender", "age", "interestedIn"];

//update data of teh user
profileRouter.patch("/updateUserData/:userId", async (req, res) => {
    const UserId = req.params?.userId;
    const body = req.body;

    const updates = Object.keys(body);
    const isValidOperation = updates.every((update) => ALLOWED_UPDATE_FIELDS.includes(update));

    if(!isValidOperation){
        return res.status(400).send({error: "Update not allowed for this field"});
    }

    if(data?.interestedIn.length > 10){
        return res.status(400).send({error: "You cannot add more than 10 skills"});
    }
    
    try{
        const user = await UserModel.findByIdAndUpdate({_id: UserId}, body, {returnDocument: "before", runValidators: true});
        console.log(user);

        if(user == null){
            res.status(404).send("User not found");
        }else{
            res.status(200).send("User updated successfully");
        }
    }catch(err){
        res.send(err);
    }
});

//Edit API
profileRouter.patch("/profile/editProfile/:userId", userAuth, async (req, res) => {
    try{
        validateEditProfileData(req, res);
        //fetch and update the data here
        const user = await UserModel.findByIdAndUpdate({_id: req.params.userId}, req.body, {returnDocument: "after", runValidators: true});
        if(user == null){
            res.status(404).send("User not found");
        }else{
            res.status(200).json({
                message: "User saved successfully",
                user: user
            });
        }
        
    }catch(err){
        return res.send(err.message);
    }
});

module.exports = profileRouter;