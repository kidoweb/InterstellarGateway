// js/login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Ваши параметры Firebase
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

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'profile.html'; // Перенаправление на профиль после входа
        } catch (error) {
            alert('Ошибка входа: ' + error.message);
        }
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = 'profile.html'; // Если пользователь уже вошёл, перенаправляем на профиль
        }
    });
});
