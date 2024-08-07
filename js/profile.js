// Инициализация Firebase Auth и Database
import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
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
const database = getDatabase(app);

// Функция для отображения информации о пользователе
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Пользователь вошел
        document.getElementById('username').textContent = user.displayName || 'Не установлен';
        document.getElementById('user-email').textContent = user.email;
        // Здесь можно добавить код для загрузки дополнительных данных профиля из базы данных
    } else {
        // Пользователь не вошел
        window.location.href = 'login.html'; // Перенаправление на страницу входа
    }
});

// Обработчик формы для обновления профиля
document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const displayName = document.getElementById('display-name').value;
    const user = auth.currentUser;

    if (user) {
        updateProfile(user, { displayName: displayName })
            .then(() => {
                alert('Профиль обновлен.');
                // Обновление информации о пользователе на странице
                document.getElementById('username').textContent = displayName;
            })
            .catch((error) => {
                alert("Ошибка обновления профиля: " + error.message);
            });
    }
});

// Обработчик кнопки выхода из аккаунта
document.getElementById('logout-button').addEventListener('click', function() {
    auth.signOut().then(() => {
        window.location.href = 'login.html'; // Перенаправление на страницу входа
    }).catch((error) => {
        alert("Ошибка выхода: " + error.message);
    });
});
