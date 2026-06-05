const express = require("express");
const router = express.Router();

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask } = require("../controllers/taskController");

const validationTask = require("../middleware/validateTask");

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", validationTask, createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;