// js/profile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, onValue, update, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const userId = 'exampleUserId'; // Замените на реальный идентификатор пользователя
    const profileRef = ref(database, 'users/' + userId);

    // Загрузка информации о профиле
    onValue(profileRef, (snapshot) => {
        const data = snapshot.val();
        document.getElementById('profile-avatar').src = data.avatar || 'default-avatar.png';
        document.getElementById('profile-username').textContent = data.username || 'Имя пользователя';
        document.getElementById('profile-email').textContent = data.email || 'Электронная почта';

        // Показать раздел управления пользователями, если пользователь - администратор или модератор
        if (data.role === 'admin' || data.role === 'moderator') {
            document.getElementById('ban-section').style.display = 'block';
        }
    });

    // Обработчики кнопок
    document.getElementById('edit-profile').addEventListener('click', function() {
        // Логика для редактирования профиля
    });

    document.getElementById('ban-user').addEventListener('click', function() {
        // Логика для бана пользователя
    });

    document.getElementById('unban-user').addEventListener('click', function() {
        // Логика для разбана пользователя
    });
});
