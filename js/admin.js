// Инициализация Firebase Auth и Database
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
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
const auth = getAuth(app);
const database = getDatabase(app);

// Проверка прав доступа администратора
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        const userRef = ref(database, 'users/' + userId);
        
        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData && (userData.role === 'admin' || userData.role === 'moderator')) {
                document.getElementById('admin-panel').style.display = 'block';
            } else {
                window.location.href = 'login.html'; // Перенаправление на страницу входа
            }
        });
    } else {
        window.location.href = 'login.html'; // Перенаправление на страницу входа
    }
});

// Обработчик формы для добавления новости
document.getElementById('add-news-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;

    const newNewsRef = ref(database, 'news/' + Date.now());
    set(newNewsRef, {
        title: title,
        content: content,
        timestamp: Date.now()
    }).then(() => {
        alert('Новость добавлена.');
        document.getElementById('add-news-form').reset();
    }).catch((error) => {
        alert("Ошибка добавления новости: " + error.message);
    });
});

// Обработчик удаления новости
function deleteNews(newsId) {
    const newsRef = ref(database, 'news/' + newsId);
    remove(newsRef).then(() => {
        alert('Новость удалена.');
    }).catch((error) => {
        alert("Ошибка удаления новости: " + error.message);
    });
}

// Обработчик редактирования новости
function editNews(newsId, newContent) {
    const newsRef = ref(database, 'news/' + newsId);
    update(newsRef, { content: newContent }).then(() => {
        alert('Новость обновлена.');
    }).catch((error) => {
        alert("Ошибка обновления новости: " + error.message);
    });
}
