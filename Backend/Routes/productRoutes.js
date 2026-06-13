const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
} = require("../Controllers/productController");

const protect = require("../Middlewares/authMiddleware");

router.route("/")
  .post(protect, createProduct)
  .get(protect, getProducts);

router.get(
  "/low-stock",
  protect,
  getLowStockProducts
);

router.route("/:id")
  .get(protect, getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;