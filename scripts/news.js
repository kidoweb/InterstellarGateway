import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase, ref, push, set, get, child, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { firebaseConfig } from './firebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const newsContainer = document.getElementById('news-container');
const addNewsButton = document.getElementById('add-news');

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const userRef = ref(db, 'users/' + uid);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.role === 'admin') {
          addNewsButton.style.display = 'block';
        }
      }
    }).catch((error) => {
      console.error(error);
    });

    // Load news
    const newsRef = ref(db, 'news');
    get(newsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const newsData = snapshot.val();
        for (const newsId in newsData) {
          const newsItem = newsData[newsId];
          createNewsCard(newsItem, newsId, userData.role === 'admin');
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  } else {
    window.location.href = 'login.html';
  }
});

addNewsButton.addEventListener('click', () => {
  const newsTitle = prompt('Введите заголовок новости:');
  const newsContent = prompt('Введите содержание новости:');
  const newsRef = push(ref(db, 'news'));

  set(newsRef, {
    title: newsTitle,
    content: newsContent,
    timestamp: Date.now()
  }).then(() => {
    window.location.reload();
  });
});

function createNewsCard(newsItem, newsId, isAdmin) {
  const card = document.createElement('div');
  card.classList.add('news-card');
  card.innerHTML = `
    <h3>${newsItem.title}</h3>
    <p>${newsItem.content}</p>
    <p><small>${new Date(newsItem.timestamp).toLocaleString()}</small></p>
    <div class="comments-container" id="comments-${newsId}"></div>
    <textarea placeholder="Оставьте комментарий"></textarea>
    <button onclick="addComment('${newsId}')">Отправить</button>
  `;

  if (isAdmin) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить новость';
    deleteButton.onclick = () => deleteNews(newsId);
    card.appendChild(deleteButton);
  }

  newsContainer.appendChild(card);
}

function deleteNews(newsId) {
  remove(ref(db, 'news/' + newsId)).then(() => {
    window.location.reload();
  }).catch((error) => {
    console.error(error);
  });
}

window.addComment = function(newsId) {
  const commentText = document.querySelector(`#comments-${newsId} textarea`).value;
  const commentsRef = push(ref(db, `news/${newsId}/comments`));
  const uid = auth.currentUser.uid;

  set(commentsRef, {
    text: commentText,
    userId: uid,
    timestamp: Date.now()
  }).then(() => {
    window.location.reload();
  });
};
