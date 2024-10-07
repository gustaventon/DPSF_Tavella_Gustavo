// Obtener elementos del DOM
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLoginModal = document.querySelector("#loginModal .close");
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
document.getElementById("cartBtn").onclick = function() {
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

    // Aquí se debe utilizar await dentro de una función async
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
}

// Función para cargar datos de productos y usuarios (opcional)
async function cargarDatos() {
    try {
        const responseProducts = await fetch('data/products.json');
        const products = await responseProducts.json();

        const responseUsers = await fetch('data/users.json');
        const users = await responseUsers.json();

        console.log(products); // Puedes usar estos datos en tu aplicación
        console.log(users); // Igualmente para los usuarios
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

// Llamar a la función para cargar datos
cargarDatos();