
const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images:{
    type: String, // Array of strings
    required: true
  }
});

// Create a model using the product schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;