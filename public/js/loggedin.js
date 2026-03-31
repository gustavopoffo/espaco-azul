function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        // Check if the session cookie exists
        const sessionCookie = getCookie('session');

        // If the session cookie exists, update the button
        if (sessionCookie) {
            const loginButton = document.querySelector('.botao-login');
            if (loginButton) {
                loginButton.textContent = 'Logout';
                loginButton.href = '/logout';
            }
        }
