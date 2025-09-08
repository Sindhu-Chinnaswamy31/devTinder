const server = require("express");
const connectDB = require("./config/database");
const app = server();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/socket");

require("dotenv").config();
require("./utils/cronJob");

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(server.json())
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/requests");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const socketServer = http.createServer(app);//craeted server here
initializeSocket(socketServer);

connectDB()
    .then(() => {
        console.log("Database connected")
        socketServer.listen(process.env.PORT, () =>{
            console.log("Server is running on port 8000");
        });
    })
    .catch((err) => console.log(err));


