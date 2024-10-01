class Particle {
    constructor(canvas, color) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.color = color || `rgba(255, 255, 255, ${Math.random()})`;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 2 + 1; // Ensure particles move downwards
        this.size = Math.random() * 3 + 1;
    }

    update(isSnow) {
        if (isSnow) {
            this.y += this.vy;
            if (this.y > this.canvas.height) {
                this.y = 0;
                this.x = Math.random() * this.canvas.width;
            }
        } else {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

class ParticleSystem {
    constructor(canvas, numParticles, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.options = {
            connectLines: options.connectLines !== undefined ? options.connectLines : true,
            particleColor: options.particleColor || `rgba(255, 255, 255, ${Math.random()})`,
            backgroundColor: options.backgroundColor || 'darkblue',
            snow: options.snow || false
        };

        for (let i = 0; i < numParticles; i++) {
            this.particles.push(new Particle(canvas, this.options.particleColor));
        }

        this.animate = this.animate.bind(this);
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        this.resizeCanvas();
        this.animate();
        document.body.style.backgroundColor = this.options.backgroundColor;
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles.forEach(p => p.reset());
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            p.update(this.options.snow);
            p.draw();
        });
        if (this.options.connectLines) {
            this.drawLines();
        }
        requestAnimationFrame(this.animate);
    }

    drawLines() {
        const maxDistance = 100;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                if (distance < maxDistance) {
                    const opacity = 1 - distance / maxDistance;
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }
}