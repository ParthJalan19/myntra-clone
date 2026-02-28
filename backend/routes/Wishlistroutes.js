// const express = require("express");
// const Wishlist = require("../models/Wishlist");
// const router = express.Router();

// // ADD TO WISHLIST
// router.post("/", async (req, res) => {
//   try {
//     const wishlist = new Wishlist(req.body);
//     await wishlist.save();
//     res.status(201).json(wishlist);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding to wishlist" });
//   }
// });

// // GET USER WISHLIST
// router.get("/:userId", async (req, res) => {
//   try {
//     const wishlist = await Wishlist.find({ userId: req.params.userId }).populate("productId");
//     res.json(wishlist);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching wishlist" });
//   }
// });

// module.exports = router;

const express = require("express");
const Wishlist = require("../models/Wishlist");
const router = express.Router();

// ADD TO WISHLIST
router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if already in wishlist
    const existing = await Wishlist.findOne({ userId, productId });
    if (existing) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const item = await Wishlist.create({ userId, productId });
    res.json(item);
  } catch (err) {
    console.log("WISHLIST POST ERROR:", err.message);
    res.status(500).json({ message: "Error adding to wishlist" });
  }
});

// GET USER WISHLIST
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      userId: req.params.userId,
    }).populate("productId");
    res.json(wishlist);
  } catch (err) {
    console.log("WISHLIST GET ERROR:", err.message);
    res.status(500).json({ message: "Error fetching wishlist" });
  }
});

// DELETE FROM WISHLIST ✅ THIS WAS MISSING
router.delete("/:itemId", async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.itemId);
    res.json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.log("WISHLIST DELETE ERROR:", err.message);
    res.status(500).json({ message: "Error removing from wishlist" });
  }
});

module.exports = router;