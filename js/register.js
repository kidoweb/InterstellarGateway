// Инициализация Firebase Auth
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBo6sm-D7KpWhnYkjZrhJnoIE0sNwpTVIc",
    authDomain: "interstellargateway-149ae.firebaseapp.com",
    databaseURL: "https://interstellargateway-149ae-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "interstellargateway-149ae",
    storageBucket: "interstellargateway-149ae.appspot.com",
    messagingSenderId: "665939536665",
    appId: "1:665939536665:web:ce35dc47d05810bf677388",
    measurementId: "G-BEH8RS3YGB"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Обработчик регистрации
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Отправка письма для подтверждения электронной почты
            sendEmailVerification(userCredential.user)
                .then(() => {
                    alert('Проверьте свою почту для подтверждения.');
                    window.location.href = 'login.html'; // Перенаправление на страницу входа
                });
        })
        .catch((error) => {
            alert("Ошибка регистрации: " + error.message);
        });
});

// Функция для предпросмотра пароля
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye');
});
