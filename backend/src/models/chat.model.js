import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const chatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
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

export const ChatModel = mongoose.model("Chat", chatSchema, "chats");
