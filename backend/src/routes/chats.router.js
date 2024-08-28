import { Router } from "express";

const app = Router();

// GET chat by id 🚧
app.get("/:id", getChatById);

// POST create chat 🚧
app.post("/", createChat);

// No necesitamos eliminar ni editar mensajes para que sea mas sencillo.

export default app;
