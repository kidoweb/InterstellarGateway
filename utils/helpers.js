// Функция для проверки, что значение не пустое
export function isNotEmpty(value) {
    return value !== null && value !== undefined && value.trim() !== '';
}

// Функция для отображения уведомлений
export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Функция для сброса формы
export function resetForm(form) {
    form.reset();
}
