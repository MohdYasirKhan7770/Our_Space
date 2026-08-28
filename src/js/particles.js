export function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  
  // We want to reuse the secret star tooltip from secrets.js, so we store a reference
  // to the secret particle if one exists.
  let secretParticle = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor(isSecret = false) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedY = Math.random() * 0.1 - 0.05;
      this.speedX = Math.random() * 0.1 - 0.05;
      this.opacity = Math.random();
      this.fadeSpeed = Math.random() * 0.01 + 0.005;
      this.fadeDir = Math.random() > 0.5 ? 1 : -1;
      this.isSecret = isSecret;
      
      if (isSecret) {
        this.size = 2.5;
        this.color = 'hsl(345, 80%, 70%)'; // Distinctive rose color
      } else {
        this.color = `hsla(${200 + Math.random() * 40}, 80%, 88%, `;
      }
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;

      this.opacity += this.fadeSpeed * this.fadeDir;
      if (this.opacity >= 1 || this.opacity <= 0.1) {
        this.fadeDir *= -1;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      if (this.isSecret) {
        ctx.fillStyle = `hsla(345, 80%, 70%, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'hsl(345, 80%, 70%)';
      } else {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    // Adjust number of particles based on screen width for performance
    const numParticles = width < 768 ? 80 : 150;
    
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
    
    // Add one secret particle
    secretParticle = new Particle(true);
    particles.push(secretParticle);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    // Expose secret particle for secrets.js to track
    window.SECRET_STAR = secretParticle;

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init(); // Reinitialize to distribute evenly
  });

  init();
  animate();
}
