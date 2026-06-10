import { Router } from "express";
import auth from '../middlewares/auth.js'
import {
    getChatById,
    createNewChat,
    getAllChats,
    deleteChat,
    addMessages
} from "../controllers/chat.controllers.js"

const app = Router();

// GET de chats ✅ (falta ver populate).
app.get("/", getAllChats);

// GET chat by id ✅ (falta populate). Para tarer los mensajes.
app.get("/:id", getChatById);

// POST create chat ✅
app.post("/", auth, createNewChat);

// POST mandar mensajes a ese chat(id). ✅
app.post("/:id", auth, addMessages);

// Eliminar Chat  ✅
app.delete("/:id", deleteChat);

// No necesitamos eliminar ni editar mensajes para que sea mas sencillo.

export default app;