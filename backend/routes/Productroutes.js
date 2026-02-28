const express = require("express");
const Product = require("../models/Product");
const mongoose = require("mongoose");
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

// Get products by category ID or name
router.get("/category/:id", async (req, res) => {
  try {
    const param = req.params.id;
    console.log("Category param:", param);

    let products = [];

    // Try by categoryId first (ObjectId)
    if (mongoose.Types.ObjectId.isValid(param)) {
      products = await Product.find({ categoryId: param });
    }

    // If no results, try by category name
    if (products.length === 0) {
      products = await Product.find({
        category: { $regex: new RegExp(param, "i") }
      });
    }

    // If still no results, try by subcategory
    if (products.length === 0) {
      products = await Product.find({
        subcategory: { $regex: new RegExp(param, "i") }
      });
    }

    console.log("Found products:", products.length);
    res.json(products);
  } catch (err) {
    console.log("CATEGORY ROUTE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get recommendations by categoryId or name
router.get("/recommend/:categoryId", async (req, res) => {
  try {
    const param = req.params.categoryId;
    let products = [];

    if (mongoose.Types.ObjectId.isValid(param)) {
      products = await Product.find({ categoryId: param }).limit(10);
    }

    if (products.length === 0) {
      products = await Product.find({
        category: { $regex: new RegExp(param, "i") }
      }).limit(10);
    }

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