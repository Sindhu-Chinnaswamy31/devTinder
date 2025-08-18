const mongoose = require("mongoose");

const connectionRequestSchema  =  new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",//refrence of user connection 
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "accepted", "rejected", "favorite", "ignored"],
            message: `{VALUE} is not supported`
        },
        default: "pending"
    }
},
{
    timestamps: true
});

//call this when ever we are calling saving method, it is pre save
connectionRequestSchema.pre("save", function(next){ // write normal function
    const connectionRequest = this;
    //check if the fromUserId and toUserId are same
    if(connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()){ //this is not mandatory to check here
        throw new Error("You can't send connection request to ypourself!!!!");
    }
    next();//without next things won't move
});

//compound index, 1 means asc order, -1 means desc order
connectionRequestSchema.index({fromUserId: 1, toUserId: 1}, {unique: true});

module.exports = new mongoose.model("ConnectionRequest", connectionRequestSchema);