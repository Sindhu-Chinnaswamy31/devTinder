const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
// const JWT = require("jsonwebtoken");

//Send connection request
requestsRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{ 
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedSatauses = ["ignored","intrested"];
        if(!allowedSatauses.includes(status)){
            return res.status(400).send("Invalid status type" + status);
        }

        //if the to user is exist or not
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send("User not found");
        }

        //If there is an existing connection request
        const existingRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]//array of conditions
        });

        if(existingRequest){
            return res.status(400).send("Connection request already exists");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, 
            toUserId, 
            status
        });

        const data = await connectionRequest.save();
        return res.json({
            data: data,
            message: "Connection request sent successfully"
        });

    }catch(err){
        res.send(err.message);
    }
})

module.exports = requestsRouter;