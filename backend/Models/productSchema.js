const mongoose = require("mongoose");

const productSchema = new mongoose.Schema();


const ProductModel = mongoose.model("product_types",productSchema);

module.exports = ProductModel;