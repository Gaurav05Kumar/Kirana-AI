const Category = require("../Models/Categories");

// Create Category
const createCategory = async (req, res) => {
    try {

        const category = await Category.create({
            ...req.body,
            shop: req.user.shop
        });

        res.status(201).json({
            success: true,
            data: category
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Categories
const getCategories = async (req, res) => {
    try {

        const categories = await Category.find({
            shop: req.user.shop
        });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Category
const getCategoryById = async (req, res) => {
    try {

        const category = await Category.findOne({
            _id: req.params.id,
            shop: req.user.shop
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    try {

        const category = await Category.findOneAndUpdate(
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

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    try {

        const category = await Category.findOne({
            _id: req.params.id,
            shop: req.user.shop
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};