const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  variants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Variant",
    },
  ],
  sellers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Seller",
    },
  ],
  description: String,
});

const VariantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Color", "Storage"],
  },
  price: {
    type: Number,
    required: true,
  },
  products: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      stock: {
        type: Boolean,
        default: true,
      },
      price: Number,
    },
  ],
});

const Product = mongoose.model("Product", ProductSchema);
const Variant = mongoose.model("Variant", VariantSchema);
const Category = mongoose.model("Category", CategorySchema);
const Seller = mongoose.model("Seller", SellerSchema);

module.exports = { Product, Category, Seller, Variant };
