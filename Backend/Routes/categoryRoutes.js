const express = require("express");
const router = express.Router();

const protect = require("../Middlewares/authMiddleware");

const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../Controllers/categoryController");

router.route("/")
    .post(protect, createCategory)
    .get(protect, getCategories);

router.route("/:id")
    .get(protect, getCategoryById)
    .put(protect, updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;