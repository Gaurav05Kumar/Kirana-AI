const mongoose = require('mongoose');

const StockMovementSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    movementType: {
        type: String,
        enum: ["IN", "OUT"]
    },

    quantity: Number,

    reason: {
        type: String,
        enum: [
            "PURCHASE",
            "SALE",
            "RETURN",
            "DAMAGE",
            "ADJUSTMENT"
        ]
    },

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    }
}, { timestamps: true });

module.exports = mongoose.model('StockMovement', StockMovementSchema);
