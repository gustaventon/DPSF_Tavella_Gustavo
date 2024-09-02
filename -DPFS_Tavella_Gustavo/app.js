// Obtener elementos del DOM
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLoginModal = document.querySelector("#loginModal .close");

// Función para abrir la ventana modal
loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

// Función para cerrar la ventana modal
closeLoginModal.onclick = function() {
    loginModal.style.display = "none";
}

// Cerrar la ventana modal al hacer clic fuera de ella
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}

// Validar el formulario de inicio de sesión
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "gustavo" && password === "lalo") {
        alert("Inicio de sesión exitoso");
        loginModal.style.display = "none"; // Cerrar la ventana modal
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}
