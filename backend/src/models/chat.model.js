import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const chatSchema = new mongoose.Schema({
  integrantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  mensajes: [
    {
      emisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      contenido: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

//  Plugin del paginate
chatSchema.plugin(mongoosePaginate);

export const ChatModel = mongoose.model("chats", chatSchema);
