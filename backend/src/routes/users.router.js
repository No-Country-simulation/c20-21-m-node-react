import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  addProduct
} from "../controllers/user.controllers.js";
import multer from "multer";

// Middleware
const storage = multer.memoryStorage();
const upload = multer({ storage });
const app = Router();

// GET all users ✅
app.get("/", getAllUsers);

// GET user by id ✅
app.get("/:id", getUserById);

// GET user by email (Para olvide contraseña) ✅
app.post("/recover", getUserByEmail);

// POST create user ✅
app.post("/", upload.array("image"), createUser);

// POST login user ✅
app.post("/login", loginUser);

// POST prodcuto al array de ProductsID.
app.post("/:uid/product/:pid", addProduct);

// POST login user ✅
app.post("/login", loginUser);

// UPDATE user by me ✅
app.put("/:id", updateUser);

// DELETE user by me ✅
app.delete("/:id", deleteUser);

export default app;
