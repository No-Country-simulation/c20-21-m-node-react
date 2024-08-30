import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user.controllers.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = Router();

// GET all users ✅
app.get("/", getAllUsers);

// GET user by id ✅
app.get("/:id", getUserById);

// POST create user ✅
app.post("/", upload.array("image"), createUser);

// UPDATE user by me 🚧
app.put("/", updateUser);

// DELETE user by me 🚧
app.delete("/", deleteUser);

// POST login user ✅
app.post("/login", loginUser);

export default app;
