const express = require("express");
const router = express.Router();

const protect = require("../Middlewares/authMiddleware");

const {
    getStockHistory,
    getProductStockHistory
} = require("../Controllers/stockMovementController");

router.get(
    "/",
    protect,
    getStockHistory
);

router.get(
    "/product/:productId",
    protect,
    getProductStockHistory
);

module.exports = router;