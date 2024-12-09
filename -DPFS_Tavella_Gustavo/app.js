// Obtener elementos del DOM
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");

// Funciones para abrir y cerrar modales
function abrirModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Abrir modal de inicio de sesión
loginBtn.onclick = function() {
    abrirModal("loginModal");
}

// Abrir modal de carrito
cartBtn.onclick = function() {
    abrirModal("cartModal");
}

// Función para agregar producto al carrito
function agregarProducto() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;
    const category = document.getElementById("category").value;
    const colors = document.getElementById("colors").value;
    const price = document.getElementById("price").value;

    const item = document.createElement("li");
    item.innerHTML = `${name} - ${description} - ${price} <img src="${image}" alt="${name}" style="width: 50px;">`;
    cartItems.appendChild(item);

    cerrarModal('modalProducto');
}

// Función para cerrar ventana modal al hacer clic fuera de ella
window.onclick = function(event) {
    if (event.target == loginModal) {
        cerrarModal('loginModal');
    } else if (event.target == cartModal) {
        cerrarModal('cartModal');
    } else if (event.target == document.getElementById("modalProducto")) {
        cerrarModal('modalProducto');
    }
};

// Validar el formulario de inicio de sesión
document.getElementById("loginForm").onsubmit = async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch('data/users.json');
        const users = await response.json();

        const user = users.find(user => user.email === username && user.password === password);

        if (user) {
            alert("Inicio de sesión exitoso");
            cerrarModal('loginModal');
        } else {
            alert("Corrobora tu correo o contraseña");
        }
    } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        alert("Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo más tarde.");
    }
};

// Obtener elementos del DOM para las categorías
const accesoriosBtn = document.getElementById("accesoriosBtn");
const indumentariaBtn = document.getElementById("indumentariaBtn");
const tallerBtn = document.getElementById("tallerBtn");
const mainSection = document.querySelector("main");

// Función para mostrar productos filtrados por categoría
async function mostrarProductos(categoria) {
    try {
        const response = await fetch('data/products.json');
        const products = await response.json();

        // Filtrar productos según la categoría
        const productosFiltrados = products.filter(producto => producto.category === categoria);

        // Limpiar el contenido actual de la sección principal
        mainSection.innerHTML = '<section class="destacado"><img id="productoDestacado" src="imagenes/BiciDestacada.jpg" alt="Producto Destacado"></section>';

        // Crear un contenedor para los productos
        const productosContainer = document.createElement("div");
        productosContainer.classList.add("productos-container");

        // Agregar cada producto filtrado al contenedor
        productosFiltrados.forEach(producto => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("producto");

            productDiv.innerHTML = `
                <img src="${producto.image}" alt="${producto.name}" style="width: 150px;">
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <p>Colores: ${producto.colors}</p>
                <p>Precio: $${producto.price.toFixed(2)}</p>
            `;

            productosContainer.appendChild(productDiv);
        });

        // Agregar el contenedor de productos a la sección principal
        mainSection.appendChild(productosContainer);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Asignar eventos de clic a cada botón de categoría
accesoriosBtn.addEventListener("click", () => mostrarProductos("ACCESORIOS"));
indumentariaBtn.addEventListener("click", () => mostrarProductos("INDUMENTARIA"));
tallerBtn.addEventListener("click", () => mostrarProductos("TALLER"));



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