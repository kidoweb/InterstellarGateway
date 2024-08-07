import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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
const auth = getAuth(app);

document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    try {
        await sendPasswordResetEmail(auth, email);
        alert('Ссылка для сброса пароля отправлена. Пожалуйста, проверьте свою почту.');
    } catch (error) {
        alert('Ошибка сброса пароля: ' + error.message);
    }
});
