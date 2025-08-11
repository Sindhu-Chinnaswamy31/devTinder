const server = require("express");
const connectDB = require("./config/database");
const app = server();
const UserModel = require("./models/user");

//POST API
app.post("/signUp", async (req, res) => {
    const userObj = {
        firstName: "Sindhu",
        lastName: "Chinnaswamy",
        email: "sindhu@gmail.com",
        password: "sindhu@123",
        phoneNumber: "9876543210",
        gender: "female",
        age: 28,
        bio: "i am a software developer",
        status: "active"
    }

    //create a instance of user model
    const user = new UserModel(userObj);
    try{
        await user.save(); // instance of model
        res.send("User added succesfully!");
    }catch(err){
        console.log(err);
    }
});

connectDB()
    .then(() => {
        console.log("Database connected")
        app.listen(8000, () =>{
            console.log("Server is running on port 8000");
        });
    })
    .catch((err) => console.log(err));


