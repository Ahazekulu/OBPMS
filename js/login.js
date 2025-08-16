document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role-select');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');
    const loginBox = document.querySelector('.login-box');

    // --- Mock Authentication Data ---
    // Use these credentials to log in for each role
    // Admin:      Username -> 'adminuser',    Password -> 'adminpassword'
    // Manager:    Username -> 'manageruser',  Password -> 'managerpassword'
    // User:       Username -> 'useruser',     Password -> 'userpassword'
    const mockUsers = {
        'adminuser': { password: 'adminpassword', role: 'admin' },
        'manageruser': { password: 'managerpassword', role: 'manager' },
        'useruser': { password: 'userpassword', role: 'user' }
    };

    // --- Core Functions ---
    const validateForm = () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const role = roleSelect.value;
        
        // Enable button if all fields are filled
        if (username && password && role) {
            loginBtn.removeAttribute('disabled');
        } else {
            loginBtn.setAttribute('disabled', 'disabled');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;
        const selectedRole = roleSelect.value;
        
        errorMessage.style.display = 'none';

        if (mockUsers[username] && mockUsers[username].password === password && mockUsers[username].role === selectedRole) {
            // Success: Store role in localStorage and redirect
            localStorage.setItem('userRole', selectedRole);
            
            // Add a magical fade-out animation before redirecting
            loginBox.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500); // Wait for the animation to complete
            
        } else {
            // Failure: Display error message
            errorMessage.textContent = 'Invalid username, password, or role.';
            errorMessage.style.display = 'block';
        }
    };

    // --- Event Listeners ---
    loginForm.addEventListener('input', validateForm);
    loginForm.addEventListener('submit', handleLogin);
});