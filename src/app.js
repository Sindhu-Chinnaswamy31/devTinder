const server = require("express");
const connectDB = require("./config/database");
const app = server();
const UserModel = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(server.json())

//POST API
app.post("/signUp", async (req, res) => {
    try{
        //validate the password
        validateSignUpData(req,res);

        const {firstName, lastName, email, password, phoneNumber, gender, age, bio, status} = req.body;
        //encrypt the password
        // const {password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        // req.body.password = passwordHash;

        //create a instance of user model
        const user = new UserModel(
            {
                firstName,
                lastName,
                email,
                password: passwordHash,
                phoneNumber,
                gender,
                age,
                bio,
                status
            }
        );
        // const user = new UserModel(req.body); //insted of using userObj we are using post data
        await user.save(); // instance of model
        res.send("User added succesfully!");
    }catch(err){
       res.status(400).send(err.message);
    }
});

//login API

app.post("/login", async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            const result = await bcrypt.compare(password, user.password);
            if(result){
                return res.send("Login successful");
            }else{
                throw new Error("Invalid credentials");
            }
        }else{
            throw new Error("User not found");
        }
    }catch(err){
        res.status(400).send(err.message);
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


