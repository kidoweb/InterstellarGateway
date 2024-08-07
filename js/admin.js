// Инициализация Firebase
import { getDatabase, ref, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
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
const database = getDatabase(app);

// Загрузка и отображение новостей
function loadNews() {
    const newsRef = ref(database, 'news');
    onValue(newsRef, (snapshot) => {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; // Очистка контейнера перед обновлением
        snapshot.forEach((childSnapshot) => {
            const newsItem = childSnapshot.val();
            const newsElement = document.createElement('div');
            newsElement.className = 'news-item';
            newsElement.innerHTML = `
                <h3>${newsItem.title}</h3>
                <p>${newsItem.content}</p>
                <button onclick="deleteNews('${childSnapshot.key}')">Удалить</button>
            `;
            newsContainer.appendChild(newsElement);
        });
    });
}

// Удаление новости
function deleteNews(newsId) {
    const newsRef = ref(database, 'news/' + newsId);
    remove(newsRef).then(() => {
        showNotification('Новость удалена.');
    }).catch((error) => {
        showNotification('Ошибка удаления новости: ' + error.message, 'error');
    });
}

// Загрузка новостей при инициализации страницы админ-панели
document.addEventListener('DOMContentLoaded', loadNews);
