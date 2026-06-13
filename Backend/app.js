require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
const authRoutes = require("./Routes/authRoutes");
const productRoutes = require("./Routes/productRoutes");
const expenseRoutes = require("./Routes/expenseRoutes");
const stockMovementRoutes = require("./Routes/stockMovementRoutes");
const dashboardRoutes = require("./Routes/dashboardRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const supplierRoutes = require("./Routes/supplierRoutes");
const saleRoutes = require("./Routes/saleRoutes");
const purchaseRoutes = require("./Routes/purchaseRoutes");

//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/purchases", purchaseRoutes);

//Healthg Check Route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
