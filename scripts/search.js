import { getDatabase, ref, get, query, orderByChild, startAt, endAt } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { firebaseConfig } from './firebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function performSearch() {
  const searchInput = document.getElementById('search-input').value;
  const searchResultsContainer = document.getElementById('search-results');

  searchResultsContainer.innerHTML = '';

  if (searchInput.trim() === '') {
    return;
  }

  const searchPromises = [];

  const newsRef = query(ref(db, 'news'), orderByChild('title'), startAt(searchInput), endAt(searchInput + "\uf8ff"));
  const blogRef = query(ref(db, 'blog'), orderByChild('title'), startAt(searchInput), endAt(searchInput + "\uf8ff"));
  const faqRef = query(ref(db, 'faq'), orderByChild('question'), startAt(searchInput), endAt(searchInput + "\uf8ff"));

  searchPromises.push(get(newsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const newsData = snapshot.val();
      for (const newsId in newsData) {
        const newsItem = newsData[newsId];
        createSearchResult('Новости', newsItem.title, newsItem.content, newsId);
      }
    }
  }));

  searchPromises.push(get(blogRef).then((snapshot) => {
    if (snapshot.exists()) {
      const blogData = snapshot.val();
      for (const blogId in blogData) {
        const blogItem = blogData[blogId];
        createSearchResult('Блог', blogItem.title, blogItem.content, blogId);
      }
    }
  }));

  searchPromises.push(get(faqRef).then((snapshot) => {
    if (snapshot.exists()) {
      const faqData = snapshot.val();
      for (const faqId in faqData) {
        const faqItem = faqData[faqId];
        createSearchResult('FAQ', faqItem.question, faqItem.answer, faqId);
      }
    }
  }));

  Promise.all(searchPromises).then(() => {
    if (searchResultsContainer.innerHTML === '') {
      searchResultsContainer.innerHTML = '<p>Ничего не найдено</p>';
    }
  }).catch((error) => {
    console.error(error);
  });
}

function createSearchResult(category, title, content, id) {
  const searchResultsContainer = document.getElementById('search-results');
  const resultItem = document.createElement('div');
  resultItem.classList.add('search-result');
  resultItem.innerHTML = `
    <h3>${category}: ${title}</h3>
    <p>${content}</p>
  `;
  searchResultsContainer.appendChild(resultItem);
}
