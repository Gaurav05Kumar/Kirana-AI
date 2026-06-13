const Sale = require("../Models/Sale");
const Product = require("../Models/Product");
const StockMovement = require("../Models/StockMovement");

// Create Sale
const createSale = async (req, res) => {
    try {

        const {
            customerName,
            paymentMethod,
            products
        } = req.body;

        let totalAmount = 0;

        for (const item of products) {

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

            if (product.stockQuantity < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} stock not available`
                });
            }

            const previousStock = product.stockQuantity;

            product.stockQuantity -= item.quantity;

            await product.save();

            await StockMovement.create({
                product: product._id,
                movementType: "SALE",
                quantity: item.quantity,
                previousStock,
                currentStock: product.stockQuantity,
                shop: req.user.shop
            });

            item.sellingPrice = product.sellingPrice;

            item.subtotal =
                item.quantity * product.sellingPrice;

            totalAmount += item.subtotal;
        }

        const sale = await Sale.create({
            customerName,
            paymentMethod,
            products,
            totalAmount,
            shop: req.user.shop
        });

        res.status(201).json({
            success: true,
            data: sale
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Sales
const getSales = async (req, res) => {
    try {

        const sales = await Sale.find({
            shop: req.user.shop
        })
            .populate("products.product");

        res.status(200).json({
            success: true,
            count: sales.length,
            data: sales
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Sale By Id
const getSaleById = async (req, res) => {
    try {

        const sale = await Sale.findOne({
            _id: req.params.id,
            shop: req.user.shop
        })
            .populate("products.product");

        if (!sale) {
            return res.status(404).json({
                success: false,
                message: "Sale not found"
            });
        }

        res.status(200).json({
            success: true,
            data: sale
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createSale,
    getSales,
    getSaleById
};