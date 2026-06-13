const express = require("express");
const router = express.Router();

const protect = require("../Middlewares/authMiddleware");

const {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require("../Controllers/expenseController");

router.route("/")
    .post(protect, createExpense)
    .get(protect, getExpenses);

router.route("/:id")
    .get(protect, getExpenseById)
    .put(protect, updateExpense)
    .delete(protect, deleteExpense);

module.exports = router;