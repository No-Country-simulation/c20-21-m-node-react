import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from "../controllers/user.controllers.js";

const app = Router();

// GET all users ✅
app.get("/", getAllUsers);

// GET user by id ✅
app.get("/:id", getUserById);

// POST create user ✅
app.post("/", createUser);

// UPDATE user by me 🚧
app.put("/", updateUser);

// DELETE user by me 🚧
app.delete("/", deleteUser);

// POST login user ✅
app.post("/login", loginUser);

export default app;
