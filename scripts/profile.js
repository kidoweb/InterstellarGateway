import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase, ref, get, child, update } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { firebaseConfig } from './firebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const userRef = ref(db, 'users/' + uid);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        document.getElementById('avatar').src = userData.avatar;
        document.getElementById('username').textContent = userData.username;
        document.getElementById('server').textContent = userData.server;
        document.getElementById('birthdate').textContent = userData.birthdate;
        document.getElementById('bio').textContent = userData.bio;

        if (userData.role === 'admin') {
          document.getElementById('add-news').style.display = 'block';
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  } else {
    window.location.href = 'login.html';
  }
});
