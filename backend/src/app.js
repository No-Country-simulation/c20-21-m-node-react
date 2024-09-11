import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import productsRoute from "./routes/products.router.js";
import usersRoute from "./routes/users.router.js";
import chatRoute from "./routes/chats.router.js";
import { config } from "./config.js";

const PORT = config.port;
const API_USER = config.api_user;
const API_PASSWORD = config.api_password;
const app = express();

// const allowedOrigins = [
//     'http://localhost:5173',     // Tu entorno de desarrollo local
//     'https://popmart-frontend-psi.vercel.app'  // URL de tu frontend desplegado
//   ];

//  Middlewares
app.use(cors({
  origin: '*', // Permitir todos los orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Permisos para que permita conexiones de allowedOrigins
// app.use(cors({
//     origin: function(origin, callback) {
//       // Permite solicitudes sin origen (como cURL, Postman, etc.)
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Asegúrate de permitir los métodos que estás utilizando
//     allowedHeaders: ['Content-Type', 'Authorization'], // Asegúrate de permitir los encabezados que estás utilizando
//   }));

//  Routes
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/chats", chatRoute);

//Conectar con MongoDB ATLAS a la Base de Datos.
const enviroment = async () => {
    await mongoose
        .connect(
            `mongodb+srv://${API_USER}:${API_PASSWORD}@coderback.vqrxnc2.mongodb.net/?retryWrites=true&w=majority&appName=Coderback`,
            {
                dbName: "Marketplace",
            }
        )
        .then(() => {
            console.log("Listo la base de datos");
        });
};
enviroment();

// Escuchar en el puerto.
app.listen(PORT, () => {
    console.log(`Servidor ON, PORT: ${PORT}`);
});
