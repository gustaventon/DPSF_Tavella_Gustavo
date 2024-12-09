//dashboard

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function App() {
    const [usuarios, setUsuarios] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuariosRes = await axios.get("http://localhost:5000/api/usuarios");
                const productosRes = await axios.get("http://localhost:5000/api/productos");
                setUsuarios(usuariosRes.data);
                setProductos(productosRes.data);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        fetchData();
    }, []);

    const productosPorCategoria = productos.reduce((acc, producto) => {
        acc[producto.category] = (acc[producto.category] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(productosPorCategoria),
        datasets: [
            {
                label: "Productos por Categoría",
                data: Object.values(productosPorCategoria),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
        ]
    };

    return (
        <div className="App">
            <h1>Dashboard</h1>
            <div>
                <h2>Métricas</h2>
                <p>Total de usuarios: {usuarios.length}</p>
                <p>Total de productos: {productos.length}</p>
            </div>
            <div style={{ width: "600px", margin: "0 auto" }}>
                <Bar data={data} />
            </div>
        </div>
    );
}

export default App;