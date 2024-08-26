import express from 'express';
import mongoose from 'mongoose';
import productsRoute from './routes/products.router.js';

const PORT = 8080;
const app = express();
//  Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use('/api/products', productsRoute);



//Conectar con MongoDB ATLAS a la Base de Datos.

const enviroment = async () => {
    await mongoose.connect('mongodb+srv://Ragepay:wKL1LFxdeeHbuw2z@coderback.vqrxnc2.mongodb.net/?retryWrites=true&w=majority&appName=Coderback', {
        dbName: 'Marketplace'
    })
        .then(() => {
            console.log("Listo la base de datos");
        });
}
enviroment()






app.listen(PORT, () => {
    console.log(`Servidor ON, PORT: ${PORT}`);
});