import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  productImage: {
    type: [String],
    required: false
  },
  createdAt: {
    type: Date,
    required: true
  }
});

export default ProductModel  = mongoose.model("Product", productSchema);