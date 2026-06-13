const express = require("express");
const router = express.Router();

const protect = require("../Middlewares/authMiddleware");

const {
    getDashboardStats
} = require("../Controllers/dashboardController");

router.get(
    "/",
    protect,
    getDashboardStats
);

module.exports = router;