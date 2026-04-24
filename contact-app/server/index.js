require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contact", require("./routes/contactRoutes"));

app.get("/", (req, res) => {
    res.send("API Running...");
});

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})