/**
 * ROYAL SPORTS ACADEMY — Interactive Ambient Embers & Cyan Energy Canvas
 * High performance, zero dependency particle animation
 */

(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 70;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.5 + 0.8;
      this.speedY = Math.random() * 0.8 + 0.3; // rising embers
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.fadeSpeed = Math.random() * 0.004 + 0.002;
      // 65% fiery orange/amber, 35% electric cyan
      this.type = Math.random() > 0.35 ? 'ember' : 'cyan';
      this.flickerSpeed = Math.random() * 0.05 + 0.02;
      this.flicker = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
      this.flicker += this.flickerSpeed;

      // Glow oscillation
      const dynamicOpacity = Math.max(0.1, this.opacity + Math.sin(this.flicker) * 0.2);

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }

      this.currentOpacity = dynamicOpacity;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      if (this.type === 'ember') {
        ctx.fillStyle = `rgba(255, 122, 0, ${this.currentOpacity})`;
        ctx.shadowColor = 'rgba(255, 109, 0, 0.8)';
        ctx.shadowBlur = this.size * 5;
      } else {
        ctx.fillStyle = `rgba(0, 229, 255, ${this.currentOpacity})`;
        ctx.shadowColor = 'rgba(0, 229, 255, 0.9)';
        ctx.shadowBlur = this.size * 6;
      }

      ctx.fill();
      ctx.restore();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Only animate if not reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animate();
  }
})();
