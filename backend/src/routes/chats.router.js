import { Router } from "express";
import {
    getChatById,
    createNewChat,
    getAllChats,
    deleteChat
} from "../controllers/chat.controllers.js"

const app = Router();

// GET de chats 🚧
app.get("/", getAllChats);

// GET chat by id 🚧
app.get("/:id", getChatById);

// POST create chat 🚧
app.post("/", createNewChat);

// Eliminar Chat  🚧
app.delete("/:id", deleteChat);

// No necesitamos eliminar ni editar mensajes para que sea mas sencillo.

export default app;