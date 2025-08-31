const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const userAuth = async (req, res, next) => {
  try{
    //Read the token from the request cookies
    const {token} = req.cookies;
    if(!token){
        return res.status(403).send("Please Login!!!!");
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
    if(err.status === 403){
      navigate("/Login");
    }
    
    res.status(403).send(err.message);
  }
  


}

module.exports = 
{
    userAuth
}