const server = require("express");

const app = server();
// to handle the request handler 
// app.use() it will take two params one is router and another one is call back function
app.use("/test", (req, res) => {
    res.send("heloo nodeJs server");
});

app.listen(8000, () =>{
    console.log("Server is running on port 8000");
});