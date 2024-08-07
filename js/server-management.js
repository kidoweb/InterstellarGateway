// Инициализация Firebase
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
const database = getDatabase(app);

// Обработчик добавления сервера
document.getElementById('add-server-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const serverName = document.getElementById('server-name').value;
    const serverAddress = document.getElementById('server-address').value;

    const newServerRef = ref(database, 'servers/' + Date.now());
    set(newServerRef, {
        name: serverName,
        address: serverAddress
    }).then(() => {
        alert('Сервер добавлен.');
        document.getElementById('add-server-form').reset();
    }).catch((error) => {
        alert("Ошибка добавления сервера: " + error.message);
    });
});

// Обработчик удаления сервера
function deleteServer(serverId) {
    const serverRef = ref(database, 'servers/' + serverId);
    remove(serverRef).then(() => {
        alert('Сервер удален.');
    }).catch((error) => {
        alert("Ошибка удаления сервера: " + error.message);
    });
}

// Обработчик редактирования сервера
function editServer(serverId, newDetails) {
    const serverRef = ref(database, 'servers/' + serverId);
    update(serverRef, newDetails).then(() => {
        alert('Сервер обновлен.');
    }).catch((error) => {
        alert("Ошибка обновления сервера: " + error.message);
    });
}
