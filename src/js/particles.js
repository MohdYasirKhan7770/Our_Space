export function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let scrollY = 0;

  // Track scroll for parallax
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  // Secret star reference
  let secretParticle = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  // Draw a tiny heart shape
  function drawHeart(x, y, size) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // Left bump
    ctx.bezierCurveTo(
      x, y,
      x - size / 2, y,
      x - size / 2, y + topCurveHeight
    );
    // Left bottom
    ctx.bezierCurveTo(
      x - size / 2, y + (size + topCurveHeight) / 2,
      x, y + (size + topCurveHeight) / 1.2,
      x, y + size
    );
    // Right bottom
    ctx.bezierCurveTo(
      x, y + (size + topCurveHeight) / 1.2,
      x + size / 2, y + (size + topCurveHeight) / 2,
      x + size / 2, y + topCurveHeight
    );
    // Right bump
    ctx.bezierCurveTo(
      x + size / 2, y,
      x, y,
      x, y + topCurveHeight
    );
    ctx.closePath();
  }

  class Particle {
    constructor(type = 'bokeh') {
      this.type = type; // 'bokeh', 'heart', 'secret'
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.baseY = this.y;
      this.speedY = (Math.random() - 0.5) * 0.08;
      this.speedX = (Math.random() - 0.5) * 0.06;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.fadeSpeed = Math.random() * 0.008 + 0.003;
      this.fadeDir = Math.random() > 0.5 ? 1 : -1;
      this.parallaxFactor = 0.02 + Math.random() * 0.03;

      if (type === 'heart') {
        this.size = Math.random() * 5 + 3;
        this.hue = 350 + Math.random() * 15 - 7; // rose tones
        this.saturation = 35 + Math.random() * 20;
        this.lightness = 55 + Math.random() * 15;
        this.rotation = Math.random() * 0.4 - 0.2;
        this.rotSpeed = (Math.random() - 0.5) * 0.003;
      } else if (type === 'secret') {
        this.size = 2.5;
        this.isSecret = true;
      } else {
        // Bokeh: soft warm circles
        this.size = Math.random() * 2 + 0.5;
        this.hue = 30 + Math.random() * 25; // warm amber/cream
        this.saturation = 30 + Math.random() * 30;
        this.lightness = 80 + Math.random() * 10;
      }
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      // Wrap edges
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;

      // Twinkle
      this.opacity += this.fadeSpeed * this.fadeDir;
      if (this.opacity >= 0.7 || this.opacity <= 0.05) {
        this.fadeDir *= -1;
      }
      this.opacity = Math.max(0.02, Math.min(0.7, this.opacity));

      // Rotate hearts gently
      if (this.type === 'heart') {
        this.rotation += this.rotSpeed;
      }
    }

    draw() {
      // Apply parallax offset
      const parallaxY = scrollY * this.parallaxFactor;
      const drawY = ((this.y - parallaxY) % (height + 20) + height + 20) % (height + 20) - 10;

      ctx.save();
      ctx.globalAlpha = this.opacity;

      if (this.type === 'heart') {
        ctx.translate(this.x, drawY);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
        drawHeart(0, -this.size / 2, this.size);
        ctx.fill();
      } else if (this.type === 'secret') {
        ctx.beginPath();
        ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(350, 60%, 70%)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'hsl(350, 60%, 70%)';
        ctx.fill();
      } else {
        // Bokeh circle with soft glow
        ctx.beginPath();
        ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity})`;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0.3)`;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function init() {
    resize();
    particles = [];

    const isMobile = width < 768;
    const numBokeh = isMobile ? 50 : 100;
    const numHearts = isMobile ? 8 : 18;

    for (let i = 0; i < numBokeh; i++) {
      particles.push(new Particle('bokeh'));
    }
    for (let i = 0; i < numHearts; i++) {
      particles.push(new Particle('heart'));
    }

    // One secret particle
    secretParticle = new Particle('secret');
    particles.push(secretParticle);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Expose for secrets.js
    window.SECRET_STAR = secretParticle;

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  init();
  animate();
}
