const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createExpense, deleteExpense, getExpenses } = require("../controllers/expenseController");

router.use(protect);

router.route("/")
    .post(createExpense)
    .get(getExpenses)

router.route("/:id")
    .delete(deleteExpense)

module.exports = router;
