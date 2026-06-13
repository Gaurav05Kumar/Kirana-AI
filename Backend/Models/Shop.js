const mongoose = require('mongoose');
const ShopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gstNumber: {    
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Shop', ShopSchema);