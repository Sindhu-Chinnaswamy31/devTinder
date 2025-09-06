const { default: mongoose } = require("mongoose");
const database = require("mongoose");
const validator = require("validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({ //schema for user collection

    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true, 
        minLength: 3,
        maxLength: 20
    },
    email: {//mongo db automaticaly create index to optimize the query for unique: true coloumn.
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        maxValue: 50,
        minValue: 10,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password should be strong");
            }
        }
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false,
        validate(value) {
            if(value !== "male" && value !== "female" && value !== "other"){
                throw new Error("Gender should be male, female or other");
            }
        }
    },
    age: {
        type: Number,
        required: false,
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
        required: false
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
        default: "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL : " + value);
            }
        }
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    membershipType: {
        type: String,
        required: false
    }
}, {timestamps: true});


//best practices
//don't use arrow function it will break the code here, use normal function
/*
Because in Mongoose schema methods and hooks, 
this should refer to the document or query — arrow functions don’t bind their own this, 
so it won’t work. Use a normal function so this points to the right object.

This code adds a method getJWTToken to the userSchema that generates a JSON Web Token (JWT) for a user. 
The token is signed with a secret key ("DEV@tinder123") and expires in 1 day. 
The method returns the generated token.
*/
userSchema.methods.getJWTToken = async function(){
    const user = this;
    const token = await JWT.sign({_id: user._id}, "DEV@tinder123", {expiresIn: "1d"});
    return token;
}

//password encryption
userSchema.methods.validatePassword = async function(password){
    const user = this;
    const result = await bcrypt.compare(password, user.password);
    return result;
}

//model
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;