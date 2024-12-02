const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Resize canvas to fit screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];
const colors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1'];

// Ball class
class Ball {
    constructor(x, y, radius, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Bounce off walls
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocityX = -this.velocityX;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocityY = -this.velocityY;
        }

        this.draw();
    }
}

// Create balls
for (let i = 0; i < 50; i++) {
    const radius = 10;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocityX = (Math.random() - 0.5) * 4;
    const velocityY = (Math.random() - 0.5) * 4;
    balls.push(new Ball(x, y, radius, color, velocityX, velocityY));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => ball.update());

    requestAnimationFrame(animate);
}

// Split balls on click
canvas.addEventListener('click', (e) => {
    const { clientX, clientY } = e;

    balls.forEach((ball) => {
        const dx = ball.x - clientX;
        const dy = ball.y - clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If ball is clicked, split it
        if (distance < ball.radius + 20) {
            ball.velocityX *= -1.5;
            ball.velocityY *= -1.5;
        }
    });
});

// Start animation
animate();
