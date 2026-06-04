const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MONGODB IS CONNECTED ON ${conn.connection.host}`);
    }
    catch (err) {
        console.log(`DB ERROR: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;