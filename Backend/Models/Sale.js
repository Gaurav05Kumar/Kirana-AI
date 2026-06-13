const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    customerName: String,

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number,
            sellingPrice: Number,
            subtotal: Number
        }
    ],

    totalAmount: Number,

    paymentMethod: {
        type: String,
        enum: ["cash", "upi", "card"]
    },

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    }
}, { timestamps: true });

module.exports = mongoose.model('Sale', SaleSchema);