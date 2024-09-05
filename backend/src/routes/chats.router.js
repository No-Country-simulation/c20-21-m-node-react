import { Router } from "express";
import {
    getChatById,
    createNewChat
} from "../controllers/chat.controllers.js"

const app = Router();

// GET chat by id 🚧
app.get("/:id", getChatById);

// POST create chat 🚧
app.post("/", createNewChat);

// No necesitamos eliminar ni editar mensajes para que sea mas sencillo.

export default app;