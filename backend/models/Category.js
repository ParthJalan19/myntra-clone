// const mongoose = require("mongoose");

// const CategorySchema = new mongoose.Schema(
//   {
//     name: String,
//     subcategory: [String],
//     image: String,
//     productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Category", CategorySchema);
// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema({
//   name: String,
//   image: String,
// });

// module.exports = mongoose.model("Category", categorySchema);

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    subcategory: [String],
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);