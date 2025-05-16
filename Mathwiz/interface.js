function handleLogin(event) {
    event.preventDefault();

    var email = document.querySelector('input[name="email"]').value.trim();
    var password = document.querySelector('input[name="password"]').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var userFound = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            userFound = true;
            // Save current user info for profile
            localStorage.setItem("currentUsername", users[i].username);
            localStorage.setItem("currentUserEmail", users[i].email);
            localStorage.setItem("currentUserPassword", users[i].password);

            window.location.href = "HomePageWithUser.html"; // Adjust as needed
            break;
        }
    }

    if (!userFound) {
        document.getElementById('errorMessage').style.display = 'block';
    } else {
        document.getElementById('errorMessage').style.display = 'none';
    }
}

document.getElementById('loginButton')?.addEventListener('click', handleLogin);
