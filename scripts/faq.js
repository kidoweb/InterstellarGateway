import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase, ref, push, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { firebaseConfig } from './firebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const faqContainer = document.getElementById('faq-container');
const addFaqButton = document.getElementById('add-faq');

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const userRef = ref(db, 'users/' + uid);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.role === 'admin') {
          addFaqButton.style.display = 'block';
        }
      }
    }).catch((error) => {
      console.error(error);
    });

    // Load FAQs
    const faqRef = ref(db, 'faq');
    get(faqRef).then((snapshot) => {
      if (snapshot.exists()) {
        const faqData = snapshot.val();
        for (const faqId in faqData) {
          const faqItem = faqData[faqId];
          createFaqCard(faqItem, faqId, userData.role === 'admin');
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  } else {
    window.location.href = 'login.html';
  }
});

addFaqButton.addEventListener('click', () => {
  const question = prompt('Введите вопрос:');
  const answer = prompt('Введите ответ:');
  const timestamp = new Date().toISOString();

  if (question && answer) {
    const newFaqRef = push(ref(db, 'faq'));
    set(newFaqRef, {
      question,
      answer,
      timestamp
    }).then(() => {
      window.location.reload();
    }).catch((error) => {
      console.error(error);
    });
  }
});

function createFaqCard(faqItem, faqId, isAdmin) {
  const card = document.createElement('div');
  card.classList.add('faq-card');
  card.innerHTML = `
    <h3>${faqItem.question}</h3>
    <p>${faqItem.answer}</p>
    <p><small>${new Date(faqItem.timestamp).toLocaleString()}</small></p>
  `;

  if (isAdmin) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить вопрос';
    deleteButton.onclick = () => deleteFaq(faqId);
    card.appendChild(deleteButton);
  }

  faqContainer.appendChild(card);
}

function deleteFaq(faqId) {
  const faqRef = ref(db, 'faq/' + faqId);
  remove(faqRef).then(() => {
    window.location.reload();
  }).catch((error) => {
    console.error(error);
  });
}
