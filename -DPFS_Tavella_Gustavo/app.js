document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad del botón de suscripción
    document.getElementById('subscribeBtn').addEventListener('click', () => {
        alert('Gracias por suscribirte!');
    });

    // Variables para modales
    const loginModal = document.getElementById('loginModal');
    const cartModal = document.getElementById('cartModal');
    const loginBtn = document.getElementById('loginBtn');
    const cartBtn = document.querySelector('.carrito');
    const closeBtns = document.querySelectorAll('.close');
    const loginForm = document.getElementById('loginForm');
    const cartItems = document.getElementById('cartItems');

    // Abrir modal de login
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Cerrar modal
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.style.display = 'none';
        });
    });

    // Cerrar modal cuando se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Manejar el inicio de sesión
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'Gustavo' && password === 'Pedro') {
            alert('Inicio de sesión exitoso');
            loginModal.style.display = 'none';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    // Abrir modal del carrito
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    // Añadir producto al carrito
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        const newItem = document.createElement('li');
        newItem.textContent = 'Producto destacado';
        cartItems.appendChild(newItem);
        alert('Producto añadido al carrito');
    });
});