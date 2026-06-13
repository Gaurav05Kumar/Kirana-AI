const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    sku: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },

    barcode: {
      type: String,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    purchasePrice: {
      type: Number,
      required: [true, "Purchase price is required"],
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: 0,
    },

    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    minStockLevel: {
      type: Number,
      default: 5,
      min: 0,
    },

    unit: {
      type: String,
      enum: ["pcs", "kg", "liters", "packs"],
      default: "pcs",
    },

    image: {
      type: String,
      default: "",
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
  },
  {
    timestamps: true,
  }
);

// Search Index
ProductSchema.index({ name: "text", sku: "text", barcode: "text" });

module.exports = mongoose.model("Product", ProductSchema);