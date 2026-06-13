const StockMovement = require("../Models/StockMovement");

// Get All Stock History
const getStockHistory = async (req, res) => {
    try {

        const history = await StockMovement.find({
            shop: req.user.shop
        })
        .populate("product", "name sku")
        .sort("-createdAt");

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Product Stock History
const getProductStockHistory = async (
    req,
    res
) => {
    try {

        const history =
            await StockMovement.find({
                product: req.params.productId,
                shop: req.user.shop
            })
            .populate(
                "product",
                "name sku"
            )
            .sort("-createdAt");

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getStockHistory,
    getProductStockHistory
};