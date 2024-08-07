// js/news.js

// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, onValue, set, push, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Функция загрузки новостей
function loadNews() {
    const newsRef = ref(db, 'news/');
    onValue(newsRef, (snapshot) => {
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const news = childSnapshot.val();
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');
            newsItem.innerHTML = `
                <h3>${news.title}</h3>
                <p>${news.content}</p>
                <button onclick="likeNews('${childSnapshot.key}')">Лайк (${news.likes || 0})</button>
                <div class="comments">
                    <h4>Комментарии</h4>
                    <div id="comments-${childSnapshot.key}"></div>
                    <input type="text" id="comment-input-${childSnapshot.key}" placeholder="Добавить комментарий">
                    <button onclick="addComment('${childSnapshot.key}')">Отправить</button>
                </div>
            `;
            newsList.appendChild(newsItem);
            loadComments(childSnapshot.key);
        });
    });
}

// Функция добавления новости
document.getElementById('news-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    const newsRef = ref(db, 'news/');
    const newNewsRef = push(newsRef);
    set(newNewsRef, {
        title,
        content,
        likes: 0
    }).then(() => {
        document.getElementById('news-form').reset();
        document.getElementById('add-news-form').style.display = 'none';
    }).catch(error => {
        console.error('Ошибка добавления новости:', error);
    });
});

// Функция добавления комментария
function addComment(newsId) {
    const commentInput = document.getElementById(`comment-input-${newsId}`);
    const comment = commentInput.value;
    const commentsRef = ref(db, `news/${newsId}/comments`);
    const newCommentRef = push(commentsRef);
    set(newCommentRef, {
        text: comment
    }).then(() => {
        commentInput.value = '';
        loadComments(newsId);
    }).catch(error => {
        console.error('Ошибка добавления комментария:', error);
    });
}

// Функция загрузки комментариев
function loadComments(newsId) {
    const commentsRef = ref(db, `news/${newsId}/comments`);
    onValue(commentsRef, (snapshot) => {
        const commentsContainer = document.getElementById(`comments-${newsId}`);
        commentsContainer.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const comment = childSnapshot.val();
            const commentElement = document.createElement('p');
            commentElement.textContent = comment.text;
            commentsContainer.appendChild(commentElement);
        });
    });
}

// Функция лайка новости
function likeNews(newsId) {
    const newsRef = ref(db, `news/${newsId}`);
    onValue(newsRef, (snapshot) => {
        const news = snapshot.val();
        const newLikes = (news.likes || 0) + 1;
        set(newsRef, { ...news, likes: newLikes });
    });
}

// Проверка прав администратора (например, через Firebase Authentication)
function checkAdminRights() {
    // Примерный код для проверки прав администратора
    // Здесь нужно интегрировать с Firebase Authentication для проверки прав
    const isAdmin = true; // Или другая логика
    if (isAdmin) {
        document.getElementById('admin-controls').style.display = 'block';
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    checkAdminRights();
});
