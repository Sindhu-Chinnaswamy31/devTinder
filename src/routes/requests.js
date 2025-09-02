const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
// const JWT = require("jsonwebtoken");

const sendEmail = require("../utils/sendEmail");

//Send connection request
requestsRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{ 
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatuses = ["ignored", "interested"]; 
        if (!allowedStatuses.includes(status.toLowerCase())) {
        return res.status(400).send("Invalid status type: " + status);
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
        
        const EmailResponse = await sendEmail.run(
            toUser.email,
            "New connection request",
            `You have a new connection request from ${fromUserId} ${fromUserId.firstName} ${fromUserId.lastName}`
        );
        console.log(EmailResponse);

        return res.json({
            data: data,
            message: "Connection request sent successfully"
        });

    }catch(err){
        res.send(err.message);
    }
});

//reject or accept the request
requestsRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        //is reciver logedin User or not
        //status should be definetly intrested
        const status = req.params.status;
        const requestId = req.params.requestId;

        const allowedStatuses = ["rejected", "accepted"]; 
        if (!allowedStatuses.includes(status.toLowerCase())) {
            return res.status(400).send("Invalid status type " + status);
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId: loggedInUserId,
            status: "interested"
        });
        if(!connectionRequest){
            return res.status(400).send("Connection request not found");
        }

        console.log(connectionRequest);

        // if(connectionRequest.toUserId != loggedInUserId){
        //     return res.status(403).send("Please login before accept/reject the conection request");
        // }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        return res.json({
            data: data,
            message: "Connection request updated successfully"
        });
        
    }catch(err){
        res.send(err.message);
    }
});




module.exports = requestsRouter;