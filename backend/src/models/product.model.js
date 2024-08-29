import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
  category: {
    type: String,
    required: true
  }

}, { timestamps: true });

//   Plugin del paginate
productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model("products", productSchema);