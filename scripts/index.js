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
