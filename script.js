document.addEventListener('DOMContentLoaded', () => {
    // Handle progress bar logic if necessary (no bars defined in the HTML, placeholder here)
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const progress = bar.querySelector('.progress');
        const progressValue = progress.dataset.value;
        progress.style.width = `${progressValue}%`;
    });
});

// Mock user data for authentication (replace with API call for real-world apps)
const mockUsers = [
    {
        email: "test@example.com",
        password: "password123",
    },
    {
        email: "user@example.com",
        password: "userpass",
    },
    {
        email: "safvanmelethil2@gmail.com",
        password: "Safvan@123",
    },
    {
        email: "abdulsamadc087@gmail.com",
        password: "Abdul@123"
    }
];

// Login form submit event listener
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get email and password input values
    const emailInput = document.querySelector('input[type="email"]').value.trim();
    const passwordInput = document.querySelector('input[type="password"]').value.trim();

    // Check credentials
    const isAuthenticated = mockUsers.some(
        user => user.email === emailInput && user.password === passwordInput
    );

    if (isAuthenticated) {
        // Successful login
        alert("Login successful!");
        // Save login status in localStorage
        localStorage.setItem("isLoggedIn", "true");
        // Redirect to the dashboard
        window.location.href = "dashboard.html";
    } else {
        // Failed login
        alert("Invalid email or password. Please try again.");
        // Clear the password field for security
        document.querySelector('input[type="password"]').value = "";
    }
});




// password view

document.addEventListener('DOMContentLoaded', () => {
    const togglePasswordButton = document.querySelector('.toggle-password');
    const passwordField = document.getElementById('password');

    togglePasswordButton.addEventListener('click', () => {
        // Toggle the type attribute between "password" and "text"
        const currentType = passwordField.getAttribute('type');
        passwordField.setAttribute('type', currentType === 'password' ? 'text' : 'password');

        // Update the button text/icon
        togglePasswordButton.textContent = currentType === 'password' ? '👁' : '👁';
    });
});
