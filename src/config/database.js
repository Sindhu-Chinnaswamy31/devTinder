const database = require("mongoose"); // returns a promise

const connectDB = async () => {
    await database.connect("mongodb+srv://sindhucswamy:WIDvHhmL38FR2VSS@cluster0.vf5zi2b.mongodb.net/devTinder");//if we not mention db name it will default take the cluster
}

module.exports = connectDB;