const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const userAuth = async (req, res, next) => {
  try{
    //Read the token from the request cookies
    const {token} = req.cookies;
    if(!token){
        throw new Error("Invalid token");
    }
    //validate the token
    const decodedOBJ = await jwt.verify(token, "DEV@tinder123");
    const {_id} = decodedOBJ;
    // Find the user
    const user = await UserModel.findById(_id);
    if(!user){
        res.status(403).send("unauthorised");
    }else{
        req.user = user;
        next();
    }
  }catch(err){
    res.status(403).send("unauthorised");
  }
  


}

module.exports = 
{
    userAuth
}