const mongoose = require('mongoose');
const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }
}, { timestamps: true });

module.exports = mongoose.model('Categories', CategoriesSchema);
