import mongoose from "mongoose";
import { ChatModel } from "../models/chat.model.js";
// const users = require("../models/user.model.js");

export const getAllChats = async (req, res) => {
  const chats = await ChatModel.find({})
  /*.populate({
    path: "mensajes.emisor",
    select: "name email",
  });
  */
  res.status(200).json(chats);
};

export const getChatById = async (req, res) => {
  const { id } = req.params;
  const chat = await ChatModel.findById(id);

  res.json(chat);
};

//   Crear un chat.
export const createNewChat = async (req, res) => {
  try {
    const { users, message } = req.body;
    if (
      !Array.isArray(users) ||
      users.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      return res.status(400).json({ error: "Integrantes inválidos" });
    }
    const newChat = new ChatModel({
      users,
      message,
    });
    const savedChat = await newChat.save();

    res.status(201).json({
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
