const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.radius *= 0.98; 
        this.opacity -= 0.02; 

        
        if (this.radius < 0.5 || this.opacity <= 0) {
            const index = particles.indexOf(this);
            if (index !== -1) particles.splice(index, 1);
        }

        this.draw();
    }
}

function createParticles(x, y) {
    const particleCount = 20; 
    for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 5 + 2; 
        const dx = (Math.random() - 0.5) * 5; 
        const dy = (Math.random() - 0.5) * 5; 
        const color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        };
        particles.push(new Particle(x, y, dx, dy, radius, color));
    }
}


canvas.addEventListener('click', (e) => {
    createParticles(e.clientX, e.clientY);
});

canvas.addEventListener('mousemove', (e) => {
    if (e.buttons === 1) { 
        createParticles(e.clientX, e.clientY);
    }
});

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => particle.update());
    requestAnimationFrame(animate);
}

animate();
