// Ensure Firebase is loaded
window.addEventListener('load', () => {
  // Check if Firebase is initialized
  if (typeof firebase !== 'undefined') {
    console.log('Firebase is loaded.');
  } else {
    console.error('Firebase is not loaded.');
  }

  // Handle user authentication state changes
  firebase.auth().onAuthStateChanged(user => {
    const loginLink = document.getElementById('login-link');
    const profileLink = document.querySelector('a[href="profile.html"]');
    
    if (user) {
      loginLink.style.display = 'none'; // Hide login link if user is logged in
      if (profileLink) {
        profileLink.style.display = 'block'; // Show profile link if user is logged in
      }
    } else {
      loginLink.style.display = 'block'; // Show login link if user is not logged in
      if (profileLink) {
        profileLink.style.display = 'none'; // Hide profile link if user is not logged in
      }
    }
  });

  // Example function to fetch server data and update UI
  function updateServerData() {
    const db = firebase.database();
    const serverRef = db.ref('servers/'); // Adjust path according to your database structure
    
    serverRef.once('value').then(snapshot => {
      const data = snapshot.val();
      // Update the UI with server data
      // For example, populate server cards
      console.log('Server data:', data);
      // You might want to update the UI here
    }).catch(error => {
      console.error('Error fetching server data:', error);
    });
  }

  // Call the function to update server data
  updateServerData();
});
document.addEventListener('DOMContentLoaded', function() {
    // Assuming the API provides an array of servers
    var servers = api.servers; // This should match the structure returned by your API

    var serverListDiv = document.querySelector('.server-list');
    servers.forEach(function(server) {
        var serverCard = `
            <div class="server-card">
                <h3>${server.name}</h3>
                <p>${server.description}</p>
                <b>Адрес сервера:</b> ${server.ip}:${server.port}<br/>
                <b>Версия сервера:</b> ${server.version}<br/>
                <b>Мод сервера:</b> ${server.gamemode}<br/>
                <b>Текущий онлайн:</b> ${server.players} из ${server.maxplayers} игроков<br/>
                <b>Рекорд игроков:</b> ${server.record}<br/>
                <b>Последнее обновление информации:</b> ${server.lastconnect}<br/>
                <b>Статус сервера:</b> ${server.status === 1 ? '<font style="color: green;">Работает</font><br />' : '<font style="color: red;">Сервер недоступен</font><br />'}
                <b>Рейтинг сервера:</b> ${server.votes}
            </div>`;
        serverListDiv.innerHTML += serverCard;
    });
});
