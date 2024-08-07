import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from './firebase.js';

// Registration
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    alert('Регистрация успешна! Проверьте свою почту для подтверждения.');
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    alert('Ошибка регистрации: ' + error.message);
  }
});

// Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      alert('Пожалуйста, подтвердите свою почту.');
      await auth.signOut();
    } else {
      alert('Вход успешен!');
      // Redirect to profile page or another page
    }
  } catch (error) {
    console.error('Ошибка входа:', error);
    alert('Ошибка входа: ' + error.message);
  }
});
