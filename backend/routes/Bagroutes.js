// const express = require("express");
// const Bag = require("../models/Bag");
// const router = express.Router();

// // ADD TO BAG
// router.post("/", async (req, res) => {
//   try {
//     const bagItem = new Bag(req.body);
//     await bagItem.save();
//     res.status(201).json(bagItem);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding to bag" });
//   }
// });

// // GET USER BAG
// router.get("/:userId", async (req, res) => {
//   try {
//     const bagItems = await Bag.find({ userId: req.params.userId }).populate("productId");
//     res.json(bagItems);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bag" });
//   }
// });

// module.exports = router;

const express = require("express");
const Bag = require("../models/Bag");
const router = express.Router();

// ADD TO BAG
router.post("/", async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;

    // Check if item already exists in bag
    const existing = await Bag.findOne({ userId, productId, size });
    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.json(existing);
    }

    const item = await Bag.create({ userId, productId, size, quantity: quantity || 1 });
    res.json(item);
  } catch (err) {
    console.log("BAG POST ERROR:", err.message);
    res.status(500).json({ message: "Error adding to bag" });
  }
});

// GET USER BAG
router.get("/:userId", async (req, res) => {
  try {
    const items = await Bag.find({
      userId: req.params.userId,
    }).populate("productId");
    res.json(items);
  } catch (err) {
    console.log("BAG GET ERROR:", err.message);
    res.status(500).json({ message: "Error fetching bag" });
  }
});

// UPDATE QUANTITY
router.patch("/:itemId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await Bag.findByIdAndUpdate(
      req.params.itemId,
      { quantity },
      { new: true }
    ).populate("productId");
    res.json(item);
  } catch (err) {
    console.log("BAG PATCH ERROR:", err.message);
    res.status(500).json({ message: "Error updating quantity" });
  }
});

// DELETE FROM BAG ✅ THIS WAS MISSING
router.delete("/:itemId", async (req, res) => {
  try {
    await Bag.findByIdAndDelete(req.params.itemId);
    res.json({ message: "Item removed from bag" });
  } catch (err) {
    console.log("BAG DELETE ERROR:", err.message);
    res.status(500).json({ message: "Error removing from bag" });
  }
});

module.exports = router;