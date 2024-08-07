import { auth } from '../utils/firebaseConfig.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { showNotification } from '../utils/helpers.js';

// Функция входа пользователя
export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Успешный вход
            showNotification('Вход выполнен успешно!', 'success');
            window.location.href = 'profile.html'; // Перенаправление на страницу профиля
        })
        .catch((error) => {
            // Ошибка входа
            showNotification('Ошибка входа: ' + error.message, 'error');
        });
}

// Функция регистрации пользователя
export function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Успешная регистрация
            showNotification('Регистрация выполнена успешно!', 'success');
            // Отправить подтверждение email
            userCredential.user.sendEmailVerification();
            window.location.href = 'login.html'; // Перенаправление на страницу входа
        })
        .catch((error) => {
            // Ошибка регистрации
            showNotification('Ошибка регистрации: ' + error.message, 'error');
        });
}

// Функция сброса пароля
export function resetPassword(email) {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            showNotification('Ссылка для сброса пароля отправлена на ваш email!', 'success');
        })
        .catch((error) => {
            showNotification('Ошибка сброса пароля: ' + error.message, 'error');
        });
}

// Проверка состояния аутентификации
export function checkAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}
