// js/servers.js

document.addEventListener('DOMContentLoaded', function() {
    const serverList = document.getElementById('server-list');
    
    // Пример сервера (замените на ваши реальные данные)
    const servers = [
        {
            name: "IG|Galactic Conflict",
            address: "46.174.50.56:27015",
            status: "Загрузка..."
        }
    ];
    
    // Функция для получения статуса сервера
    function checkServerStatus(address) {
        // Здесь вы можете использовать реальный API для проверки статуса сервера
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Онлайн"); // Статус сервера (временно статический)
            }, 1000);
        });
    }

    // Функция для отображения серверов
    async function displayServers() {
        for (const server of servers) {
            const serverElement = document.createElement('div');
            serverElement.classList.add('server-item');
            
            const status = await checkServerStatus(server.address);
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
