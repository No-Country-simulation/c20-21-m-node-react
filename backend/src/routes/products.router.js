import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } from "../controllers/product.controllers.js";
import multer from 'multer'

const storage = multer.memoryStorage();
const upload = multer({ storage });
const app = Router();

// GET all products ✅
app.get('/', getAllProducts);

// GET product by id ✅ TODO > add middleware: auth
app.get('/:productId', getProductById);

// POST create product ✅ TODO > add middleware: auth
app.post('/', upload.array("productImage"), createProduct);

// PUT update product by id ✅ TODO > add middleware: auth, owner
app.put('/:productId', updateProductById);

// DELETE product by id ✅ TODO > add middleware: auth, owner | admin
app.delete('/:productId', deleteProductById);

export default app;