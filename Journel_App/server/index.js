require("dotenv").config()
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/journel", require("./routes/journelRoutes"));

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on ${process.env.PORT}`);
})