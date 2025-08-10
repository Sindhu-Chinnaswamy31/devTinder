const server = require("express");

const app = server();
//Handle auth middleware for all request GET, POST, DELETE
// const {adminAuth, userAuth} = require("./middlewares/auth");
// app.use("/admin", adminAuth);
// app.use("/user", userAuth);

// app.get("UserLogin", (req, res) => {
//     res.send("Login page");
// });

// app.get("/userData", userAuth, (req, res) => {// either call middle ware like this or use app.use("/user/userData"........;
//     res.send("Fetch user data");
// });//here admin middleware wont call because it will not match /admin

// app.get("/admin/getAllUserData", (req, res) => {
//     res.send("Get all the data");
// });

// app.get("/admin/deleteUser", (req, res) => {
//     res.send("User deleted successfully");
// });

//db call and get user data
app.get("/getData", (req, res) => {
    throw new Error("Something went wrong");
});

app.get("/getDataError", (req, res) => {
    try{
        throw new Error("Something went wrong");
    }catch (error) {
        res.send(500).send("Something error");
    }
});

//error handling in the middleware
app.get("/getUserData", (err, req, res, next) => { // error should be first parameter, req, res, next
    if(err){
        //log your error
        res.status(500).send("Something went wrong");
    }
});

app.listen(8000, () =>{
    console.log("Server is running on port 8000");
});