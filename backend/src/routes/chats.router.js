import { Router } from "express";
import { ChatModel } from "../models/chat.model.js";

const app = Router();

// Obtener chat por id
app.get("/:id", async (req, res) => {

});


//  Agregar mensaje a chat por id.
app.post("/:Id", async (req, res) => {

});

// No necesitamos eliminar ni editar mensajes para que sea mas sencillo.

export default app;
