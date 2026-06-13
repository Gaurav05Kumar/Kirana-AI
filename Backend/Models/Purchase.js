const mongoose = require('mongoose');
const PurchaseSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number,
            purchasePrice: Number,
            subtotal: Number
        }
    ],

    totalAmount: Number,

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    }
}, { timestamps: true });

module.exports = mongoose.model('Purchase', PurchaseSchema);