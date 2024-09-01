import { UserModel } from "../models/user.model.js";
import { processImagesToBase64 } from "../utils/imageProcessor.js";
import nodemailer from "nodemailer";



export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json(users);
  } catch (e) {
    res.json({
      error: `Error ${e}`,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    res.status(200).json(user);
  } catch (e) {
    res.json({
      error: `Error ${e}`,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const imageBuffers = req.files.map((image) => image.buffer);

    const processedImages = await processImagesToBase64(imageBuffers);
    let newUser = await UserModel.create({
      name,
      lastname,
      email,
      password,
      image: processedImages,
    });

    // Crea un transportador de correo con las configuraciones del servicio
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes cambiar el servicio según tu proveedor de correo (por ejemplo, 'hotmail', 'yahoo', etc.)
      auth: {
        user: 'tu_correo@gmail.com', // Tu dirección de correo electrónico
        pass: 'tu_contraseña', // Tu contraseña o una contraseña de aplicación (mejor usar un token de acceso)
      },
    });

    // Definir los detalles del correo electrónico
    const mailOptions = {
      from: 'tu_correo@gmail.com', // Dirección de correo del remitente
      to: email, // Dirección de correo del destinatario
      subject: 'Registro éxitoso al Marketplace',
      text: `Bienvenido a Marketplace, su registro ha sido exitoso.
      Su  Usuario es: ${email}
      Su password es: ${password}`
      //html: '<b>Este es el contenido del correo en formato HTML</b>', // Opcional: contenido HTML
    };

    // Enviar el correo electrónico
    /* transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error al enviar correo:', error);
      }
      console.log('Correo enviado: ' + info.response);
    });
    */
    res.status(201).json(newUser);
  } catch (e) {
    console.log(e);

    res.json({
      error: `Error ${e}`,
    });
  }
};

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
};

// No son necesarios.
export const updateUser = () => { };
export const deleteUser = () => { };
