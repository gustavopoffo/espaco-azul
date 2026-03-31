document.getElementById('increase-font').addEventListener('click', function() {
    changeFontSize(1);
});

document.getElementById('decrease-font').addEventListener('click', function() {
    changeFontSize(-1);
});

function changeFontSize(amount) {
    var elements = document.querySelectorAll('*');

    elements.forEach(function(element) {
        var computedStyle = window.getComputedStyle(element);

        var currentFontSize = parseFloat(computedStyle.fontSize);

        if (!isNaN(currentFontSize)) { 
            var newFontSize = currentFontSize + amount; 
            element.style.fontSize = newFontSize + 'px';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Function to check login status
    function checkLoginStatus() {
        fetch('/loggedin')
            .then(response => response.json())
            .then(data => {
                const loginButton = document.querySelector('.login-botao a');
                if (data.message == "Sim") {
                    loginButton.innerHTML = '<strong>LOGOUT</strong>';
                    loginButton.href = '/logout';
                }
            })
            .catch(error => {
                console.error('Error checking login status:', error);
            });
    }

    // Check login status on page load
    checkLoginStatus();
});
