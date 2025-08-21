const server = require("express");
const connectDB = require("./config/database");
const app = server();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(server.json())
app.use(cookieParser());
app.use(cors())
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/requests");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

connectDB()
    .then(() => {
        console.log("Database connected")
        app.listen(8000, () =>{
            console.log("Server is running on port 8000");
        });
    })
    .catch((err) => console.log(err));


