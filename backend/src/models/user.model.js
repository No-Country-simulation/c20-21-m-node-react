import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: [
    {
      type: String
    }
  ],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }]
});

// el password hasheado no debería mostrarse, para que no se muestre se usa el codigo de abajo

// userSchema.set("toJSON", {
//   transform: (_, returnedObject) => {
//     delete returnedObject.password;
//   },
// });

export const UserModel = mongoose.model("User", userSchema, "users");
