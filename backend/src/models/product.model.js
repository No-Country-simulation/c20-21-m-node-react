import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    productImage: [
      {
        public_id: String,
        secure_url: String,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: false, //Esto hay que agregarlo como obligatorio >> true
    },
  },
  { timestamps: true }
);

//   Plugin del paginate
productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model("products", productSchema);
