function loadContent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
                console.log(`Content loaded for ${elementId} from ${filePath}`);
            } else {
                console.error(`Element with ID ${elementId} not found`);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    loadContent('header', 'header.html');
    loadContent('footer', 'footer.html');
});
