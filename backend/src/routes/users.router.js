import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
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
app.post("/register", createUser);

// POST login user ✅
app.post("/login", loginUser);

// UPDATE user by id. ✅
app.put("/:id", auth, updateUser);

// DELETE user by id. ✅
app.delete("/:id", auth, deleteUser);

export default app;
