const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SavedRoutes = require("./routes/SavedRoutes");
require("dotenv").config();

const userrouter = require("./routes/Userroutes");
const categoryrouter = require("./routes/Categoryroutes");
const productrouter = require("./routes/Productroutes");
const bagrouter = require("./routes/Bagroutes");
const wishlistrouter = require("./routes/Wishlistroutes");
const orderrouter = require("./routes/OrderRoutes");

const app = express();

// ── Middlewares ──
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// ── Logger ──
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// ── Test route ──
app.get("/", (req, res) => {
  res.send("✅ Myntra backend is running on Render!");
});

// ── Routes ──
app.use("/user",     userrouter);
app.use("/category", categoryrouter);
app.use("/product",  productrouter);
app.use("/bag",      bagrouter);
app.use("/wishlist", wishlistrouter);
app.use("/order",    orderrouter);
app.use("/saved",    SavedRoutes);

// ── Database ──
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  family: 4,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB error:", err.message));

// ── Server ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);