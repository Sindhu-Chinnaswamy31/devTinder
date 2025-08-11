const server = require("express");
const connectDB = require("./config/database");
const app = server();
const UserModel = require("./models/user");

app.use(server.json())
//POST API
app.post("/signUp", async (req, res) => {
    console.log(req.body);
    //create a instance of user model
    const user = new UserModel(req.body); //insted of using userObj we are using post data
    try{
        await user.save(); // instance of model
        res.send("User added succesfully!");
    }catch(err){
        console.log(err);
    }
});

//find user by email
app.get("/userData", async (req, res) => {
    try{
        const users = await UserModel.find({email: req.body.email});
        if(users.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        console.log(err);
    }
})

//feed API - Get / feed get all the user from the database
app.get("/feed", async (req, res) => {
    try{
        const users = await UserModel.findOne();//find also work
        if(users.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        console.log(err);
    }
});

//get by id
app.get("/findById", async (req, res) => {
    try{
        const users = await UserModel.findById(req.body._id);
        if(users.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        console.log(err);
    }
});

//delete API
app.delete("/deleteUser", async (req, res) => {
    try{
        const users = await UserModel.findByIdAndDelete({_id: req.body.userId});
        if(users == null){
            res.status(404).send("User not found");
        }else{
            res.status(200).send("User deleted successfully");
        }
    }catch(err){
        console.log(err);
    }
});

//update data of teh user
app.patch("/updateUserData", async (req, res) => {
    const UserId = req.body.userId;
    const body = req.body;
    
    try{
        const user = await UserModel.findByIdAndUpdate({_id: UserId}, body, {returnDocument: "before"});
        console.log(user);

        if(user == null){
            res.status(404).send("User not found");
        }else{
            res.status(200).send("User updated successfully");
        }
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


