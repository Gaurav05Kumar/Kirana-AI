const express = require("express");
const router = express.Router();

const protect = require("../Middlewares/authMiddleware");

const {
    createSale,
    getSales,
    getSaleById
} = require("../Controllers/saleController");

router.route("/")
    .post(protect, createSale)
    .get(protect, getSales);

router.route("/:id")
    .get(protect, getSaleById);

module.exports = router;