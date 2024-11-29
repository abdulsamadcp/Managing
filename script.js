document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const progress = bar.querySelector('.progress');
        const progressValue = progress.dataset.value;
        progress.style.width = `${progressValue}%`;
    });
});


document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "dashboard.html";
});




