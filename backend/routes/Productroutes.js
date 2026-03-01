const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Get products by category name
router.get("/category/:name", async (req, res) => {
  try {
    const name = req.params.name;
    console.log("Searching category:", name);
    const products = await Product.find({
      category: { $regex: new RegExp("^" + name + "$", "i") }
    });
    console.log("Found:", products.length, "products");
    res.json(products);
  } catch (err) {
    console.log("CATEGORY ROUTE ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get recommendations
router.get("/recommend/:name", async (req, res) => {
  try {
    const products = await Product.find({
      category: { $regex: new RegExp("^" + req.params.name + "$", "i") }
    }).limit(10);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recommendations" });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

module.exports = router;