// const express = require("express");
// const Order = require("../models/Order");
// const router = express.Router";

// // CREATE ORDER
// router.post("/", async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Error placing order" });
//   }
// });

// // GET USER ORDERS
// router.get("/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching orders" });
//   }
// });

// module.exports = router;

const express = require("express");
const Order = require("../models/Order");
const Bag = require("../models/Bag");
const router = express.Router();

// CREATE ORDER FROM BAG
router.post("/create/:userId", async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.params.userId;

    // Get all bag items for this user
    const bagItems = await Bag.find({ userId }).populate("productId");

    if (!bagItems || bagItems.length === 0) {
      return res.status(400).json({ message: "Bag is empty" });
    }

    // Build products array from bag
    const products = bagItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      size: item.size,
    }));

    // Calculate total
    const totalAmount = bagItems.reduce(
      (sum, item) =>
        sum + (item.productId?.price || 0) * (item.quantity || 1),
      0
    );

    // Create order
    const order = await Order.create({
      userId,
      products,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: "Processing",
    });

    // Clear the bag after order placed
    await Bag.deleteMany({ userId });

    res.status(201).json(order);
  } catch (err) {
    console.log("ORDER CREATE ERROR:", err.message);
    res.status(500).json({ message: "Error creating order" });
  }
});

// GET USER ORDERS
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.log("ORDER GET ERROR:", err.message);
    res.status(500).json({ message: "Error fetching orders" });
  }
});


module.exports = router;
