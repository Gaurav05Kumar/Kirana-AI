const express = require("express");
const router = express.Router();

const protect = require("../Middlewares/authMiddleware");

const {
    createPurchase,
    getPurchases,
    getPurchaseById
} = require("../controllers/purchaseController");

router.route("/")
    .post(protect, createPurchase)
    .get(protect, getPurchases);

router.route("/:id")
    .get(protect, getPurchaseById);

module.exports = router;