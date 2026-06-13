const Expense = require("../Models/Expense");

// Create Expense
const createExpense = async (req, res) => {
    try {

        const expense = await Expense.create({
            ...req.body,
            shop: req.user.shop
        });

        res.status(201).json({
            success: true,
            data: expense
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Expenses
const getExpenses = async (req, res) => {
    try {

        const expenses = await Expense.find({
            shop: req.user.shop
        }).sort("-createdAt");

        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Expense By Id
const getExpenseById = async (req, res) => {
    try {

        const expense = await Expense.findOne({
            _id: req.params.id,
            shop: req.user.shop
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            data: expense
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Expense
const updateExpense = async (req, res) => {
    try {

        const expense = await Expense.findOneAndUpdate(
            {
                _id: req.params.id,
                shop: req.user.shop
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            data: expense
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Expense
const deleteExpense = async (req, res) => {
    try {

        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            shop: req.user.shop
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
};