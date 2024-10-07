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

// Abrir modales para cada categoría
document.getElementById("accesoriosBtn").onclick = function() {
    abrirModal("modalProducto");
};
document.getElementById("indumentariaBtn").onclick = function() {
    abrirModal("modalProducto");
};
document.getElementById("tallerBtn").onclick = function() {
    abrirModal("modalProducto");
};

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
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "gustavo" && password === "lalo") {
        alert("Inicio de sesión exitoso");
        cerrarModal('loginModal');
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}