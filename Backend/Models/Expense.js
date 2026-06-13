const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: String,

    amount: Number,

    category: {
        type: String,
        enum: [
            "RENT",
            "SALARY",
            "ELECTRICITY",
            "INTERNET",
            "OTHER"
        ]
    },

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);