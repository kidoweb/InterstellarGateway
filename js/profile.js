// js/profile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    // Проверка состояния аутентификации
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = 'login.html'; // Перенаправление на вход при отсутствии пользователя
            return;
        }

        const userId = user.uid;
        const profileRef = ref(database, 'users/' + userId);

        // Получение данных профиля
        onValue(profileRef, (snapshot) => {
            const data = snapshot.val();
            document.getElementById('profile-avatar').src = data.avatar || 'default-avatar.png';
            document.getElementById('profile-username').textContent = data.username || 'Имя пользователя';
        });

        // Обработка выхода из аккаунта
        document.getElementById('logout-button').addEventListener('click', async () => {
            try {
                await signOut(auth);
                window.location.href = 'login.html'; // Перенаправление на вход после выхода
            } catch (error) {
                alert('Ошибка выхода: ' + error.message);
            }
        });
    });
});
