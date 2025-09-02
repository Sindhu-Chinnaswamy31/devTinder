const database = require("mongoose"); // returns a promise

const connectDB = async () => {
    await database.connect(process.env.DB_CONNECTION_SECRET);//if we not mention db name it will default take the cluster
}

module.exports = connectDB;