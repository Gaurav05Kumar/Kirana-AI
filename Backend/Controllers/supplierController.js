const Supplier = require("../Models/Supplier");

// Create Supplier
const createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create({
            ...req.body,
            shop: req.user.shop
        });

        res.status(201).json({
            success: true,
            data: supplier
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Suppliers
const getSuppliers = async (req, res) => {
    try {

        const suppliers = await Supplier.find({
            shop: req.user.shop
        });

        res.status(200).json({
            success: true,
            count: suppliers.length,
            data: suppliers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Supplier By Id
const getSupplierById = async (req, res) => {
    try {

        const supplier = await Supplier.findOne({
            _id: req.params.id,
            shop: req.user.shop
        });

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        res.status(200).json({
            success: true,
            data: supplier
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Supplier
const updateSupplier = async (req, res) => {
    try {

        const supplier = await Supplier.findOneAndUpdate(
            {
                _id: req.params.id,
                shop: req.user.shop
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        res.status(200).json({
            success: true,
            data: supplier
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Supplier
const deleteSupplier = async (req, res) => {
    try {

        const supplier = await Supplier.findOne({
            _id: req.params.id,
            shop: req.user.shop
        });

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        await supplier.deleteOne();

        res.status(200).json({
            success: true,
            message: "Supplier deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};