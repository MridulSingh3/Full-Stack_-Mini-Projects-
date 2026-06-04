require("dotenv").config()
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URL);
        console.log(`mongoDB is connected on ${conn.connection.host}`)
    }
    catch (err) {
        console.log("error occur");
        process.exit(1);
    }
}

module.exports = connectDB;