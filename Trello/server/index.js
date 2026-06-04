require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
    res.send("API running..")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})