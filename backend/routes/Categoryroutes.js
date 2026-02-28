// IMPORTANT — Backend Must Support This Route

// Your backend must have:

// GET /product/category/:id


// Example in backend Productroutes.js:

// router.get("/category/:id", async (req, res) => {
//   try {
//     const products = await Product.find({ categoryId: req.params.id });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching products" });
//   }
// });

// 🔥 Now Connect Home → Category

// In your Home screen update category touch:

// <TouchableOpacity
//   key={category._id}
//   style={styles.categoryCard}
//   onPress={() => router.push(`/category/${category._id}`)}
// >

// const express = require("express");
// const Category = require("../models/Category");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching categories" });
//   }
// });


// router.get("/:id", async (req, res) => {
//   const category = await Category.findById(req.params.id);
//   res.json(category);
// });

// module.exports = router;


const express = require("express");
const Category = require("../models/Category");
const Product = require("../models/Product");
const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// GET single category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category" });
  }
});

// GET all products belonging to a category
router.get("/:id/products", async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;