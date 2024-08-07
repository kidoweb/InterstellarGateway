// js/servers.js

document.addEventListener('DOMContentLoaded', function() {
    const serverList = document.getElementById('server-list');

    // Пример серверов (замените на ваши реальные данные)
    const servers = [
        {
            name: "IG|Galactic Conflict",
            address: "46.174.50.56:27015",
            statusUrl: "http://localhost:3000/server-status" // URL вашего серверного скрипта
        }
    ];

    // Функция для получения статуса сервера
    async function checkServerStatus(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return `${data.current} / ${data.max}`;
        } catch (error) {
            console.error('Ошибка при получении статуса сервера:', error);
            return "Ошибка";
        }
    }

    // Функция для отображения серверов
    async function displayServers() {
        for (const server of servers) {
            const serverElement = document.createElement('div');
            serverElement.classList.add('server-item');

            const status = await checkServerStatus(server.statusUrl);
            serverElement.innerHTML = `
                <h3>${server.name}</h3>
                <p>Адрес: ${server.address}</p>
                <p>Статус: ${status}</p>
                <a href="steam://connect/${server.address}" class="connect-button">Подключиться</a>
            `;

            serverList.appendChild(serverElement);
        }
    }

    displayServers();
});
