import mongoose from "mongoose";
import { ChatModel } from "../models/chat.model.js";
// const users = require("../models/user.model.js");

export const getAllChats = async (req, res) => {
  const chats = await ChatModel.find({}).populate({
    path: "mensajes.emisor",
    select: "name email",
  });
  response.json(chats);
};

export const getChatById = async (req, res) => {
  const { id } = req.params;
  const chat = await ChatModel.findById(id).populate("users", {
    username: 1,
    name: 1,
  });
  res.json(chat);
};

export const createNewChat = async (req, res) => {
  try {
    const { integrantes, mensajes } = req.body;
    if (
      !Array.isArray(integrantes) ||
      integrantes.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      return res.status(400).json({ error: "Integrantes inválidos" });
    }
    const newChat = new ChatModel({
      integrantes,
      mensajes,
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

