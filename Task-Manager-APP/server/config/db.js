require("dotenv").config()
const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`MongoDB is successfully connected on port ${conn.connection.host}`);
}

module.exports = connectDB;