import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductsByUser,
} from "../controllers/product.controllers.js";
import { uploadImages } from "../middlewares/cloudinary.middleware.js";

const app = Router();

// GET all products ✅
app.get("/", getAllProducts);

// POST create product ✅ TODO > add middleware: auth
app.post("/", uploadImages, auth, createProduct);

// GET user by id ✅
app.get("/posts", auth, getProductsByUser);

// GET product by id ✅ TODO > add middleware: auth
app.get("/:productId", auth, getProductById);

// PUT update product by id ✅ TODO > add middleware: auth, owner
app.put("/:productId", uploadImages, auth, updateProductById);

// DELETE product by id ✅ TODO > add middleware: auth, owner | admin
app.delete("/:productId", auth, deleteProductById);

export default app;
