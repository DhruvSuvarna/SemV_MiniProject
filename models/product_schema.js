const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  productImagePath: String, // This field will store the image path
  productSeller:String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
