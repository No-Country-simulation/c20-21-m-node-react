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

//  Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
