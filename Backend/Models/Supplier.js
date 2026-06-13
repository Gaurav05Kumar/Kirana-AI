const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: String,
    email: String,
    address: String,
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', SupplierSchema);