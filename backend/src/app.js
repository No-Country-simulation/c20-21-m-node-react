import express from "express";
import mongoose from "mongoose";
import productsRoute from "./routes/products.router.js";
import usersRoute from "./routes/users.router.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const API_USER = process.env.API_USER;
const API_PASSWORD = process.env.API_PASSWORD;
const app = express();
//  Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);

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

app.listen(PORT, () => {
  console.log(`Servidor ON, PORT: ${PORT}`);
});
