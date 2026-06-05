const Task = require("../models/taskSchema");
const asyncHandler = require("../utils/asyncHandler");

exports.createTask = asyncHandler(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
})

exports.getTasks = asyncHandler(async (req, res) => {
    const { status, priority } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
});

exports.getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.json(task);
});

exports.updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    Object.assign(task, req.body);

    const updated = await task.save();
    res.json(updated);
});

exports.deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
});