const Task = require("../models/task");
const asyncHandler = require("../utils/asyncHandler");

const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
})

const getTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task Not Found!" })
    }
    res.status(200).json(task);
})

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" })
    }
    const task = await Task.create({ title, description, status, priority })
    res.status(201).json(task);
})

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task Not Found!" })
    }
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )
    res.status(200).json(updatedTask);
})

const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task Not Found!" })
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
})

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}