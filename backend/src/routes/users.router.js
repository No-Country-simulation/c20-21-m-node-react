import { Router } from "express";
import { UserModel } from "../models/user.model.js";

const app = Router();

app.get("/", async (_, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (e) {
    res.json({
      error: `Error ${e}`,
    });
  }
});

// app.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await UserModel.findById(id);
//     res.status(200).json(user)
//   } catch (e) {
//     res.json({
//       error: `Error ${e}`,
//     });
//   }
// });

//CREAR USUARIO

app.post("/", async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    let newUser = await UserModel.create({
      name,
      lastname,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (e) {
    res.json({
      error: `Error ${e}`,
    });
  }
});

// app.put("/", async (req, res) => {
//   try {
//   } catch (e) {
//     res.json({
//       error: `Error ${e}`,
//     });
//   }
// });

// app.delete("/", async (_, res) => {
//   try {
//   } catch (e) {
//     res.json({
//       error: `Error ${e}`,
//     });
//   }
// });

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userA = {
      email,
      password,
    };
    const userB = await UserModel.findOne({ email });

    if (!userB) {
      return res.status(200).json({
        error: "User no encontrado",
      });
    }
    if (userA.password === userB.password) {
      res.status(200).json({ _id: userB._id.toString() });
    }
  } catch (e) {
    res.json({
      error: `Error ${e}`,
    });
  }
});

export default app;
