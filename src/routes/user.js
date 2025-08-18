const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const ConnectionRequests = require("../models/connectionRequest");

const USER_SAFE_DATA = ["_id", "firstName", "lastName", "email"];

//get all the pending connection request for the loged in user
userRouter.get("/user/requests/recivied", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequests.find({
            toUserId: loggedInUser._id,
            status: "intrested"
        }).populate("fromUserId", "firstName lastName").populate("toUserId", USER_SAFE_DATA);//like this also we can call
        //populate("fromUserId", ["firstName", "lastName"]);// if we didn't pass second paramas it will give all the data of the user
        res.json({
            data: connectionRequests
        });
    }catch(err){
        res.send(err.message);
    }
});

//get coonections
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const connections = await ConnectionRequests.find({
            $or: [
                {
                    fromUserId: loggedInUser._id,
                    status: "accepted"
                },
                {
                    toUserId: loggedInUser._id,
                    status: "accepted"
                }
            ]
        }).populate("fromUserId", USER_SAFE_DATA);

        const data = connections.map((connection) => {
            if(connection.fromUserId._id == loggedInUser._id){
                return connection.toUserId;
            }else{
                return connection.fromUserId;
            }
        });

        res.json({
            data: connections
        });
    }catch(err){
        res.send(err.message);
    }
});

module.exports = userRouter;