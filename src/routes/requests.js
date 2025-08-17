const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();
// const JWT = require("jsonwebtoken");

//Send connection request
requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try{   
        res.status(200).send("Connection request sent");
    }catch(err){
        res.send(err);
    }
})

module.exports = requestsRouter;