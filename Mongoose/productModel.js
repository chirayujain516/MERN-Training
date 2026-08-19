const { required } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
    trim: true,
  },
  SKU: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Electronics", "Clothing", "Books", "Home", "Sports"],
    required: true,
    trim: true,
  },
});

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
