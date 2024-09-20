import { UserModel } from "../models/user.model.js";
import nodemailer from "nodemailer";
import { config } from "../config.js";
import jwt from "jsonwebtoken"

// GET all users ✅
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).populate("products").populate("chats");

    res.status(200).json(users);
  } catch (e) {
    res.json({
      error: `Error ${e}`,
    });
  }
};

// GET user by id ✅
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate("products").populate("chats");

    res.status(200).json(user);
  } catch (e) {
    res.json({
      error: `Error ${e}`,
    });
    console.error(e)
  }
};

// GET user by email (Para olvide contraseña) ✅
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      // Crea un transportador de correo con las configuraciones del servicio
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Puedes cambiar el servicio según tu proveedor de correo (por ejemplo, 'hotmail', 'yahoo', etc.)
        auth: {
          user: config.email, // Tu dirección de correo electrónico
          pass: config.email_password, // Tu contraseña o una contraseña de aplicación (mejor usar un token de acceso)
        },
      });

      // Definir los detalles del correo electrónico
      const mailOptions = {
        from: config.email, // Dirección de correo del remitente
        to: email, // Dirección de correo del destinatario
        subject: 'Le recordamos su contraseña de Marketplace',
        text: `
        Su usuario y contraseña es:

          Usuario: ${email}
          Password: ${user.password}

          Por favor no comparta estos datos y anotelos en un lugar seguro.
      

          Este es un mail autogenerado, por favor no contestar.`
        //html: '<b>Este es el contenido del correo en formato HTML</b>', // Opcional: contenido HTML
      };

      // Enviar el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log('Error al enviar correo:', error);
        }
      });
      return res.status(200).json({
        Mensaje: "Se ha enviado la contraseña al mail ingresado",
      });
    }
    res.status(400).json({ Mensaje: "No existe usaurio con el mail ingresado" });
  } catch (e) {
    res.status(500).json({
      error: `Error ${e}`,
    });
  }
};

// POST create user ✅
export const createUser = async (req, res) => {
  try {
    const {
      name,
      lastname,
      email,
      password,
      image = `https://ui-avatars.com/api/?background=random&name=${email}`
    } = req.body;

    const userB = await UserModel.findOne({ email });
    if (userB) {
      return res.status(400).json({
        status: "Error.",
        message: "Ya existe un usuario con ese email.",
        error: "Ya existe un usuario con ese email."
      });
    }

    let newUser = await UserModel.create({
      name,
      lastname,
      email,
      password,
      image,
    });

    // Crea un transportador de correo con las configuraciones del servicio
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes cambiar el servicio según tu proveedor de correo (por ejemplo, 'hotmail', 'yahoo', etc.)
      auth: {
        user: config.email, // Tu dirección de correo electrónico
        pass: config.email_password, // Tu contraseña o una contraseña de aplicación (mejor usar un token de acceso)
      },
    });

    // Definir los detalles del correo electrónico
    const mailOptions = {
      from: config.email, // Dirección de correo del remitente
      to: email, // Dirección de correo del destinatario
      subject: 'Registro éxitoso al Marketplace',
      text: `Bienvenido a Marketplace !!
      Su registro ha sido exitoso. Por favor no comparta estos datos:
      Usuario: ${email}
      Password: ${password}
      
      Este es un mail autogenerado, por favor no contestar.`
      //html: '<b>Este es el contenido del correo en formato HTML</b>', // Opcional: contenido HTML
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error al enviar correo:', error);
      }
    });

    res.status(201).json({
      status: "Success",
      message: "El User ha sido creado.",
      data: newUser
    });
  } catch (e) {
    res.status(500).json({
      error: `Error ${e}`,
    });
  }
};

// POST login user ✅
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  

  const signJWT = (email, userId) => {
    const token = jwt.sign({ email: email, userId: userId }, process.env.JWT_SECRET)
    return token
  }

  try {
    const userA = {
      email,
      password,
    };
    const userB = await UserModel.findOne({ email });
    
    if (!userB) {
      return res.status(400).json({
        error: "User no encontrado",
      });
    }
    if (userA.password === userB.password) {
      const token = signJWT(userB.email, userB._id)
      res.status(200).json({ _id: userB._id.toString(), token: token });
    }
  } catch (e) {
    res.json({
      error: `Error ${e}`,
    });
  }
};

// No son necesarios.

// Delete user by id. ✅
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: "Error.",
        message: "User no encontrado.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "El User ha sido borrado.",
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error.",
      message: "Error al intentar borrar el User.",
      error: error.message,
    });
  }
};

// UPDATE user by id. ✅
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID de los parámetros de la ruta
    const userUpdate = req.body; // Obtiene los datos a actualizar del cuerpo de la solicitud

    // Actualiza el usuario y devuelve el nuevo documento con { new: true }
    const updatedUser = await UserModel.findByIdAndUpdate(id, userUpdate, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        status: "Error.",
        message: "User no encontrado.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "El User ha sido actualizado.",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error.",
      message: "Error al intentar actualizar el User.",
      error: error.message,
    });
  }
};


