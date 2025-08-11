const { default: mongoose } = require("mongoose");
const database = require("mongoose");

const userSchema = new mongoose.Schema({ //schema for user collection
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    interestedIn: {
        type: String,
        required: false
    },
    lookingFor: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: false
    },
    isBlocked: {
        type: Boolean,
        required: false
    },
    isDeleted: {
        type: Boolean,
        required: false
    },
    isOnline: {
        type: Boolean,
        required: false
    },
    lastSeen: {
        type: Date,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    deviceToken: {
        type: String,
        required: false
    },
    deviceType: {
        type: String,
        required: false
    },
    fcmToken: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    deletedAt: {
        type: Date,
        required: false
    },
    deletedBy: {
        type: String,
        required: false
    },
    blockedBy: {
        type: String,
        required: false
    },
    blockedAt: {
        type: Date,
        required: false
    },
    blockedReason: {
        type: String,
        required: false
    },
    deletedReason: {
        type: String,
        required: false
    },
    deletedBy: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    }
});

//model
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;