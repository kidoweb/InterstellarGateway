// Функция для отображения уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Пример функции для переключения видимости пароля
function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.add('fa-eye-slash');
        icon.classList.remove('fa-eye');
    } else {
        passwordInput.type = 'password';
        icon.classList.add('fa-eye');
        icon.classList.remove('fa-eye-slash');
    }
}

// Пример обработки ошибки 404
function handle404() {
    if (window.location.pathname === '/404.html') {
        document.body.innerHTML = '<h1>404 - Страница не найдена</h1>';
    }
}

// Вызов функции для обработки ошибки 404, если страница не найдена
handle404();
