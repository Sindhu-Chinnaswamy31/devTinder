const server = require("express");

const app = server();

app.use("/hello", (req, res) => {
    res.send("Hellooooooo sindhu");
});

// if we want to run multiple request handler
app.use("/test", 
[(req, res, next) => {
    next(); //it will call next request handler
    res.send("router handler 1");
}, (req, res, next) => {
    res.send("router handler 2");
    next()
}], (req, res, next)=>{
    res.send("router handler 3");
    next();
}, (req, res, next)=>{
    res.send("router handler 4");
    next();
});

app.listen(8000, () =>{
    console.log("Server is running on port 8000");
});