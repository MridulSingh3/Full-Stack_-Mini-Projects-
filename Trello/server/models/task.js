const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["All", "Pending", "In Progress", "Completed"],
        default: "Pending"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    }
}, { timeStamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;