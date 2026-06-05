require("dotenv").config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));


const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})