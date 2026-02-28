// BACKEND: backend/routes/SavedRoutes.js
// Add this new file to your backend

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const SavedSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    size: String,
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Saved = mongoose.models.Saved || mongoose.model("Saved", SavedSchema);

// GET saved items
router.get("/:userId", async (req, res) => {
  try {
    const items = await Saved.find({ userId: req.params.userId }).populate("productId");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved items" });
  }
});

// SAVE item (move from bag)
router.post("/", async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;
    const existing = await Saved.findOne({ userId, productId });
    if (existing) return res.json(existing);
    const item = await Saved.create({ userId, productId, size, quantity });
    const populated = await item.populate("productId");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Error saving item" });
  }
});

// DELETE saved item
router.delete("/:itemId", async (req, res) => {
  try {
    await Saved.findByIdAndDelete(req.params.itemId);
    res.json({ message: "Removed from saved" });
  } catch (err) {
    res.status(500).json({ message: "Error removing saved item" });
  }
});

module.exports = router;