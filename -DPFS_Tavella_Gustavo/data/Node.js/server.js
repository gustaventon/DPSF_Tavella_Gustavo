const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Datos simulados
const usuarios = [
    { id: 1, firstName: "Juan", lastName: "Pérez", email: "juan.perez@example.com" },
    { id: 2, firstName: "Ana", lastName: "Gómez", email: "ana.gomez@example.com" },
    { id: 3, firstName: "Luis", lastName: "Martínez", email: "luis.martinez@example.com" },
    { id: 4, firstName: "María", lastName: "Lopez", email: "maria.lopez@example.com" },
    { id: 5, firstName: "Carlos", lastName: "Fernández", email: "carlos.fernandez@example.com" },
    { id: 6, firstName: "Laura", lastName: "Cruz", email: "laura.cruz@example.com" },
    { id: 7, firstName: "José", lastName: "Ramírez", email: "jose.ramirez@example.com" },
    { id: 8, firstName: "Isabel", lastName: "Díaz", email: "isabel.diaz@example.com" },
    { id: 9, firstName: "David", lastName: "Morales", email: "david.morales@example.com" },
    { id: 10, firstName: "Patricia", lastName: "Mendoza", email: "patricia.mendoza@example.com" }
];

const productos = [
    { id: 1, name: "Cesta de bicicleta", description: "Cesta de acero para bicicleta.", price: 25.50, category: "ACCESORIOS" },
    { id: 2, name: "Camiseta para ciclistas", description: "Camiseta transpirable y ligera.", price: 35.00, category: "INDUMENTARIA" },
    { id: 3, name: "Servicio de reparación", description: "Reparación completa de bicicletas.", price: 50.00, category: "TALLER" }
];

// Endpoints
app.get("/api/usuarios", (req, res) => {
    res.json(usuarios);
});

app.get("/api/productos", (req, res) => {
    res.json(productos);
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});