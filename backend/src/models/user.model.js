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
    unique:true,
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
  productsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  }],
  chatsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chats'
  }],
});

// el password hasheado no debería mostrarse, para que no se muestre se usa el codigo de abajo

// userSchema.set("toJSON", {
//   transform: (_, returnedObject) => {
//     delete returnedObject.password;
//   },
// });

export const UserModel = mongoose.model("User", userSchema);
