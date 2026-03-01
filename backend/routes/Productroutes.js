const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
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

// Get products by category name or ID
router.get("/category/:name", async (req, res) => {
  try {
    const param = req.params.name;
    const category = await Category.findOne({
      name: { $regex: new RegExp("^" + param + "$", "i") }
    });
    let products = [];
    if (category) {
      products = await Product.find({ categoryId: category._id });
    }
    if (products.length === 0) {
      products = await Product.find({
        category: { $regex: new RegExp("^" + param + "$", "i") }
      });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get products by subcategory
router.get("/subcategory/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const products = await Product.find({
      subcategory: { $regex: new RegExp("^" + name + "$", "i") }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get recommendations
router.get("/recommend/:name", async (req, res) => {
  try {
    const param = req.params.name;
    const category = await Category.findOne({
      name: { $regex: new RegExp("^" + param + "$", "i") }
    });
    let products = [];
    if (category) {
      products = await Product.find({ categoryId: category._id }).limit(10);
    }
    if (products.length === 0) {
      products = await Product.find({
        category: { $regex: new RegExp("^" + param + "$", "i") }
      }).limit(10);
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recommendations" });
  }
});

// Get single product by ID - MUST BE LAST
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