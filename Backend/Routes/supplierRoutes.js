const express = require("express");
const router = express.Router();

const protect = require("../Middlewares/authMiddleware");

const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} = require("../Controllers/supplierController");

router.route("/")
    .post(protect, createSupplier)
    .get(protect, getSuppliers);

router.route("/:id")
    .get(protect, getSupplierById)
    .put(protect, updateSupplier)
    .delete(protect, deleteSupplier);

module.exports = router;