const Purchase = require("../Models/Purchase");
const Product = require("../Models/Product");

const createPurchase = async (req, res) => {
    try {

        const {
            supplier,
            products
        } = req.body;

        let totalAmount = 0;

        for (const item of products) {

            totalAmount += item.quantity * item.purchasePrice;

            const product = await Product.findOne({
                _id: item.product,
                shop: req.user.shop
            });

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            product.stockQuantity += item.quantity;

            await product.save();

            item.subtotal =
                item.quantity * item.purchasePrice;
        }

        const purchase = await Purchase.create({
            supplier,
            products,
            totalAmount,
            shop: req.user.shop
        });

        res.status(201).json({
            success: true,
            data: purchase
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getPurchases = async (req, res) => {
    try {

        const purchases = await Purchase.find({
            shop: req.user.shop
        })
        .populate("supplier", "name")
        .populate("products.product");

        res.status(200).json({
            success: true,
            count: purchases.length,
            data: purchases
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getPurchaseById = async (req, res) => {
    try {

        const purchase = await Purchase.findOne({
            _id: req.params.id,
            shop: req.user.shop
        })
        .populate("supplier")
        .populate("products.product");

        if (!purchase) {
            return res.status(404).json({
                success: false,
                message: "Purchase not found"
            });
        }

        res.status(200).json({
            success: true,
            data: purchase
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPurchase,
    getPurchases,
    getPurchaseById
};