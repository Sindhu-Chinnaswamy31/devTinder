const { default: mongoose } = require("mongoose");
const database = require("mongoose");

const userSchema = new mongoose.Schema({ //schema for user collection
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: false, 
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        maxValue: 12,
        minValue: 10
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        validate(value) {
            if(value !== "male" && value !== "female" && value !== "other"){
                throw new Error("Gender should be male, female or other");
            }
        }
    },
    age: {
        type: Number,
        required: true,
        max: 80,
        min: 18
    },
    bio: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false,
        default: "India"
    },
    interestedIn: {
        type: [String],
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
        required: false,
        default: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"
    },
    createAt: {
        type: Date,
        required: false,
        default: Date.now
    },
}, {timestamps: true});

//model
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;