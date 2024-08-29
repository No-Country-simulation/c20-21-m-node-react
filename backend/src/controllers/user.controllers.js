import { UserModel } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {

    const users = await UserModel.find({});

    res.status(200).json(users);

  } catch (e) {

    res.json({
      error: `Error ${e}`,
    });
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    res.status(200).json(user)

  } catch (e) {

    res.json({
      error: `Error ${e}`,
    });
  }
}

export const createUser = async (req, res) => {
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
}

export const updateUser = () => {};

export const deleteUser = () => {};

export const loginUser = async (req, res) => {
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
}