// js/news.js

// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, onValue, set, push, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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
const auth = getAuth(app);

let currentUser;

// Функция проверки прав администратора
function checkAdminRights() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            const userRef = ref(db, `users/${user.uid}`);
            onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData && (userData.role === 'admin' || userData.role === 'moderator')) {
                    document.getElementById('admin-controls').style.display = 'block';
                }
            });
        }
    });
}

// Функция загрузки новостей
function loadNews() {
    const newsRef = ref(db, 'news/');
    onValue(newsRef, (snapshot) => {
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const news = childSnapshot.val();
            const newsId = childSnapshot.key;
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');
            newsItem.innerHTML = `
                <h3>${news.title}</h3>
                <p>${news.content}</p>
                <button onclick="likeNews('${newsId}')">Лайк (${news.likes || 0})</button>
                <div class="comments">
                    <h4>Комментарии</h4>
                    <div id="comments-${newsId}"></div>
                    <input type="text" id="comment-input-${newsId}" placeholder="Добавить комментарий">
                    <button onclick="addComment('${newsId}')">Отправить</button>
                </div>
                <div id="admin-controls-${newsId}" style="display: none;">
                    <button onclick="editNews('${newsId}')">Редактировать</button>
                    <button onclick="deleteNews('${newsId}')">Удалить</button>
                </div>
            `;
            newsList.appendChild(newsItem);
            loadComments(newsId);
            // Показать административные кнопки, если у текущего пользователя есть права
            if (currentUser) {
                const userRef = ref(db, `users/${currentUser.uid}`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();
                    if (userData && (userData.role === 'admin' || userData.role === 'moderator')) {
                        document.getElementById(`admin-controls-${newsId}`).style.display = 'block';
                    }
                });
            }
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

// Функция редактирования новости
function editNews(newsId) {
    // Код для редактирования новости
    // Можно отобразить форму с текущим содержимым новости и обновить данные в базе
}

// Функция удаления новости
function deleteNews(newsId) {
    const newsRef = ref(db, `news/${newsId}`);
    remove(newsRef).then(() => {
        document.getElementById(`news-${newsId}`).remove();
    }).catch(error => {
        console.error('Ошибка удаления новости:', error);
    });
}

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

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    checkAdminRights();
});
