import mongoose from "mongoose";
import { ChatModel } from "../models/chat.model.js";
// const users = require("../models/user.model.js");

// Trae todos los chats.
export const getAllChats = async (req, res) => {
  try {
    const chats = await ChatModel.find({})
    /*.populate({
      path: "mensajes.emisor",
      select: "name",
    });
    */
    res.status(200).json({
      chats: chats
    });
  } catch (error) {
    res.status(400).json({
      status: "Error.",
      message: "Error al traer los chats.",
      Error: error
    });
  }
};

// Tarer un chat por id(id del chat).
export const getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatModel.findById(id);

    if (!chat) {
      return res.status(404).json({
        status: "Error.",
        message: "ID no encontrado."
      });
    }

    res.status(200).json({
      chat: chat
    });
  } catch (error) {
    res.status(500).json({
      status: "Error.",
      message: "Error al traer los chats.",
      Error: error
    });
  }

};

//   Crear un chat.
export const createNewChat = async (req, res) => {
  try {
    const { userId } = req.user;
    const { ownerId } = req.body;
    const users = [userId, ownerId];

    //  Validacion de id existentes.
    if (
      !Array.isArray(users) ||
      users.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      return res.status(400).json({ error: "Integrantes inválidos." });
    }


    const newChat = new ChatModel({
      users,
      message: []
    });

    const savedChat = await newChat.save();

    res.status(200).json({
      status: "success",
      chat: savedChat,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error al crear el chat: ${error.message}`,
    });
  }
};

// Agregar mensajes en un chat.
export const addMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido } = req.body;
    const { userId } = req.user;

    // Validar parámetros de entrada
    if (!id || !contenido || !userId) {
      return res.status(400).json({
        status: "error",
        message: "ID del chat, contenido del mensaje o ID del usuario faltantes."
      });
    }

    //  Encontrar el chat por id.
    const chat = await ChatModel.findById(id);

    // Verificar si el chat existe
    if (!chat) {
      return res.status(404).json({
        status: "error",
        message: "Chat no encontrado."
      });
    }

    //  Crear el mensaje.
    const newMessage = {
      emisor: userId,
      contenido: contenido
    }

    // Pushear el mensaje.
    chat.messages = [...chat.messages, newMessage];

    //  Guardar mensaje
    const savedMessage = await chat.save();

    res.status(200).json({
      message: savedMessage
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error al agregar el mensaje. ${error}`,
    });
  }
};

//  Delete Chat.
export const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatModel.findByIdAndDelete(id);

    // Verificacion de la existencia del chat.
    if (!chat) {
      res.status(404).json({
        status: "Error",
        message: "No se ha encontrado el chat por id.",
      });
    }

    res.status(200).json({
      status: "Success,",
      message: "Se ha eliminado el chat correctamente.",
      datas: chat
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error
    });
  }
};
