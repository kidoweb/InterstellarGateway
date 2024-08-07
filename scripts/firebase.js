// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification };
