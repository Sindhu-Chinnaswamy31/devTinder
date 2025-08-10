const server = require("express");

const app = server();
// to handle the request handler 
// app.use() it will take two params one is router and another one is call back function
// app.use("/", (req, res) => {
//     res.send("This is home page");
// });

app.use("/home", (req, res) => {
    res.send("This is home page");
});

app.post("/user", (req, res) => {
    res.send({"name":"sindhu"});
});

app.get("/test", (req, res) => {
    res.send("heloo sindhu");
});

app.post("/queryParams", (req, res) => {
    res.send(req.query);
});

app.post("/queryParams/:userId/:password", (req, res) => {
    res.send(req.params);
});

// app.get("/a(b?)c", (req, res) => {
//     res.send("Matches /abc or /ac");
// }); -> this will match /abc or /ac, but it wont work in express 5.X.X

app.listen(8000, () =>{
    console.log("Server is running on port 8000");
});