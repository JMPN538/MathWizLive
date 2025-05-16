window.onload = function() {
    // Use currentUsername (or fallback to userName)
    let userName = localStorage.getItem("currentUsername") || localStorage.getItem("userName");

    if (userName) {
        document.getElementById("user-name").textContent = `Welcome, ${userName}`;
        document.getElementById("logout-link").style.display = 'inline'; // use inline or block
    } else {
        document.getElementById("user-name").textContent = "Welcome, Guest!";
        document.getElementById("logout-link").style.display = 'none';
    }

    // Attach logout listener here to ensure element is loaded
    document.getElementById("logout-link").addEventListener("click", function(event) {
        event.preventDefault(); // prevent default link behavior
        // Clear all user-related data from localStorage
        localStorage.removeItem("currentUsername");
        localStorage.removeItem("userName");
        localStorage.removeItem("currentUserEmail");
        // Redirect to homepage after logout
        window.location.href = "Home.html";
    });
};
