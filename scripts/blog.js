import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase, ref, push, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { firebaseConfig } from './firebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const blogContainer = document.getElementById('blog-container');
const addBlogPostButton = document.getElementById('add-blog-post');

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const userRef = ref(db, 'users/' + uid);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.role === 'admin') {
          addBlogPostButton.style.display = 'block';
        }
      }
    }).catch((error) => {
      console.error(error);
    });

    // Load blog posts
    const blogRef = ref(db, 'blog');
    get(blogRef).then((snapshot) => {
      if (snapshot.exists()) {
        const blogData = snapshot.val();
        for (const postId in blogData) {
          const postItem = blogData[postId];
          createBlogCard(postItem, postId, userData.role === 'admin');
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  } else {
    window.location.href = 'login.html';
  }
});

addBlogPostButton.addEventListener('click', () => {
  const postTitle = prompt('Введите заголовок поста:');
  const postContent = prompt('Введите содержание поста:');
  const postTimestamp = new Date().toISOString();

  if (postTitle && postContent) {
    const newPostRef = push(ref(db, 'blog'));
    set(newPostRef, {
      title: postTitle,
      content: postContent,
      timestamp: postTimestamp
    }).then(() => {
      window.location.reload();
    }).catch((error) => {
      console.error(error);
    });
  }
});

function createBlogCard(postItem, postId, isAdmin) {
  const card = document.createElement('div');
  card.classList.add('blog-card');
  card.innerHTML = `
    <h3>${postItem.title}</h3>
    <p>${postItem.content}</p>
    <p><small>${new Date(postItem.timestamp).toLocaleString()}</small></p>
  `;

  if (isAdmin) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить пост';
    deleteButton.onclick = () => deletePost(postId);
    card.appendChild(deleteButton);
  }

  blogContainer.appendChild(card);
}

function deletePost(postId) {
  const postRef = ref(db, 'blog/' + postId);
  remove(postRef).then(() => {
    window.location.reload();
  }).catch((error) => {
    console.error(error);
  });
}
