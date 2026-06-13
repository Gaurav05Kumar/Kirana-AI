const Product = require("../Models/Product");
const Supplier = require("../Models/Supplier");
const Purchase = require("../Models/Purchase");
const Sale = require("../Models/Sale");

const getDashboardStats = async (req, res) => {
    try {

        const shopId = req.user.shop;

        // Counts
        const totalProducts = await Product.countDocuments({
            shop: shopId
        });

        const totalSuppliers = await Supplier.countDocuments({
            shop: shopId
        });

        const totalPurchases = await Purchase.countDocuments({
            shop: shopId
        });

        const totalSales = await Sale.countDocuments({
            shop: shopId
        });

        // Stock Value
        const products = await Product.find({
            shop: shopId
        });

        const stockValue = products.reduce(
            (sum, product) =>
                sum +
                (product.stockQuantity *
                 product.purchasePrice),
            0
        );

        // Low Stock
        const lowStockProducts =
            await Product.countDocuments({
                shop: shopId,
                $expr: {
                    $lte: [
                        "$stockQuantity",
                        "$minStockLevel"
                    ]
                }
            });

        // Revenue
        const sales = await Sale.find({
            shop: shopId
        });

        const totalRevenue = sales.reduce(
            (sum, sale) =>
                sum + sale.totalAmount,
            0
        );

        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                totalSuppliers,
                totalPurchases,
                totalSales,
                stockValue,
                lowStockProducts,
                totalRevenue
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDashboardStats
};