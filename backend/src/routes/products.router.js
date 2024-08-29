import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } from "../controllers/product.controllers.js";

const app = Router();

// GET all products ✅
app.get('/', getAllProducts);

// GET all products by id 🚧
app.get('/:id', getProductById);

// POST create product ✅
app.post('/', createProduct);

// PUT update product by id 🚧
app.put('/:id', updateProductById);

// DELETE product by id 🚧
app.delete('/:id', deleteProductById);

export default app;