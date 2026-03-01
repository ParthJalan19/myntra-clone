const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    price: Number,
    discount: String,
    description: String,
    sizes: [String],
    images: [String],
    subcategory: { type: String, default: "" },
    category: { type: String, default: "" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);