const Expense = require("../models/expenseModel");
const asyncHandler = require("../utils/asyncHandler");

exports.createExpense = asyncHandler(async (req, res) => {
    const { title, amount, category } = req.body;

    if (!title || !amount || !category) {
        return res.status(400).json({ message: "Fill required Field" })
    }

    const expense = await Expense.create({
        title,
        amount,
        category,
        user: req.user._id,
    });
    res.status(201).json(expense);
})

exports.getExpenses = asyncHandler(async (req, res) => {
    const { category } = req.query;

    let filter = { user: req.user._id };

    if (category) filter.category = category;

    const expenses = await Expense.find(filter);

    res.json(expenses);
});

exports.deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
        return res.status(404).json({ message: "Not found" });
    }
    if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
    }
    await expense.deleteOne();
    res.json({ message: "Deleted" });
});