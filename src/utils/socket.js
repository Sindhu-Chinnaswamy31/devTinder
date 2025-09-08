const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const connectionRequest = require("../models/connectionRequest");
const { stat } = require("fs");

const getSecretRoomId = (userId, targetUserid) => {
    return crypto.createHash("sha256")
        .update([userId, targetUserid].sort().join("_"))
        .digest("hex");
}

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });
    
    io.on("connection", (socket) => {
        //Handle connection
        socket.on("joinChat", ({firstName, userId, targetUserid}) => {
            const roomId = getSecretRoomId(userId, targetUserid);
            socket.join(roomId);
        })

        socket.on("sendMessage", async ({firstName,lastName,userId,targetUserid,text}) => {
            //save message to the database
            try{
                const roomId = getSecretRoomId(userId, targetUserid);
                //check if the connection request is accepted
                connectionRequest.findOne({
                    status: "accepted",
                    $or: [
                        { fromUserId: userId, toUserId: targetUserid },
                        { fromUserId: targetUserid, toUserId: userId }
                    ]
                });

                if (connection) {
                    console.log("Connection exists and is accepted.");
                } else {
                    console.log("No accepted connection.");
                }

                let chat = await Chat.findOne({
                    participants: {$all: [userId, targetUserid]}
                });

                if(!chat){
                    chat = new Chat({
                        participants: [userId, targetUserid],
                        messages: []
                    }) 
                }

                chat.messages.push({senderId: userId, text});
                await chat.save();

                io.to(roomId).emit("messageRecivied", {
                    firstName,lastName,text,senderId: userId
                });

            }catch(err){
                console.log(err.message);
            }
        })

        

        socket.on("disconnect", () => {
            // console.log("User Disconnected", socket.id);
        })
    })
};

module.exports = initializeSocket;