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
       res.send(err);
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
        res.send(err);
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
        res.send(err);
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
        res.send(err);
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
        res.send(err);
    }
});

const ALLOWED_UPDATE_FIELDS = ["firstName", "lastName", "phoneNumber", "gender", "age", "interestedIn"];

//update data of teh user
app.patch("/updateUserData/:userId", async (req, res) => {
    const UserId = req.params?.userId;
    const body = req.body;

    const updates = Object.keys(body);
    const isValidOperation = updates.every((update) => ALLOWED_UPDATE_FIELDS.includes(update));

    if(!isValidOperation){
        return res.status(400).send({error: "Update not allowed for this field"});
    }

    if(data?.interestedIn.length > 10){
        return res.status(400).send({error: "You cannot add more than 10 skills"});
    }
    
    try{
        const user = await UserModel.findByIdAndUpdate({_id: UserId}, body, {returnDocument: "before", runValidators: true});
        console.log(user);

        if(user == null){
            res.status(404).send("User not found");
        }else{
            res.status(200).send("User updated successfully");
        }
    }catch(err){
        res.send(err);
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


