const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { Connection } = require("mongoose");
const ConnectionRequests = require("../models/connectionRequest");
const User = require("../models/user");

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

//feed api
userRouter.get("/user/feed", userAuth, async (req, res) => {
    try{
        // user should see all the user card except his own card, and rejected by him users
        // he shouldn't see the users on his connection request
        // he shouldn't see the users that have sent connection request to him
        // he shouldn't see the users that are blocked/ignored by him

        const loggedInUser = req.user;
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10;
        const skip = (page - 1) * limit;

        //find all connection request either sent/recived
        const connectionRequests = await ConnectionRequests.find({
            $or: [
                {
                    fromUserId: loggedInUser._id
                },
                {
                    toUserId: loggedInUser._id
                }
            ]
        }).select("fromUserId toUserId status").populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const hideUsersFromFeed = new Set();//datastructure
        connectionRequests.forEach((req) => {
                hideUsersFromFeed.add(req.toUserId._id.toString());
                hideUsersFromFeed.add(req.fromUserId._id.toString());
        });

        const users = await User.find({
            $and: [
                {_id: { $nin: Array.from(hideUsersFromFeed)}}, 
                {_id: { $ne: loggedInUser._id }}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users)

    }catch(err){
        res.send(err.message);
    }
})


module.exports = userRouter;