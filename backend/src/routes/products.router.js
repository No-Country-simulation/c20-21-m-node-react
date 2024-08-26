import { Router } from "express";

const app = Router();

//  Traer todos los productos.
app.get('/', async (req, res) => {
    try {
        res.json({
            status: "Exitoso."
        })
    } catch (error) {
        res.json({
            status: "Falló."
        })
    }
});

//  Traer un producto por id.
app.get('/:id', async (req, res) => {
    try {
        res.json({
            status: "Exitoso."
        })
    } catch (error) {
        res.json({
            status: "Falló."
        })
    }
});

// Crear un producto.
app.post('/', async (req, res) => {
    try {
        res.json({
            status: "Exitoso."
        })
    } catch (error) {
        res.json({
            status: "Falló."
        })
    }
});

//  Modificar un producto.
app.put('/', async (req, res) => {
    try {
        res.json({
            status: "Exitoso."
        })
    } catch (error) {
        res.json({
            status: "Falló."
        })
    }
});

// Eliminar un producto.
app.delete('/', async (req, res) => {
    try {
        res.json({
            status: "Exitoso."
        })
    } catch (error) {
        res.json({
            status: "Falló."
        })
    }
});

export default app;