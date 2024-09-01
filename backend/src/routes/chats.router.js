import { Router } from "express";
import {
    getChatById,
    createChat
} from "../controllers/chat.controllers.js"

const app = Router();

// GET chat by id 🚧
app.get("/:id", getChatById);

// POST create chat 🚧
app.post("/", createChat);

// No necesitamos eliminar ni editar mensajes para que sea mas sencillo.

export default app;