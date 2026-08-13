document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('birthdayCard');
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');

  // Flip Card on Tap / Click
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });

  // Responsive Canvas Setup
  let width, height;
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Helper to draw clean vector hearts
  function drawHeart(x, y, size, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    
    const topCurve = size * 0.3;
    ctx.moveTo(0, topCurve);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurve);
    ctx.bezierCurveTo(-size / 2, (size + topCurve) / 2, 0, size, 0, size);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurve) / 2, size / 2, topCurve);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurve);
    
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Particle Engine for Flying Hearts
  class FlyingHeart {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 30;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.7 + 0.3;
      this.swaySpeed = Math.random() * 0.02 + 0.008;
      this.swayOffset = Math.random() * Math.PI * 2;
      this.alpha = Math.random() * 0.6 + 0.3;
      
      // Heart color palette matching the light purple theme
      const colors = ['#a855f7', '#7e22ce', '#c084fc', '#e879f9', '#713f12'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y -= this.speedY;
      this.swayOffset += this.swaySpeed;
      this.x += Math.sin(this.swayOffset) * 0.6;

      if (this.y < -40) {
        this.reset(false);
      }
    }

    draw() {
      drawHeart(this.x, this.y, this.size, this.color, this.alpha);
    }
  }

  // Create Heart Pool
  const hearts = Array.from({ length: 40 }, () => new FlyingHeart());

  // Render Animation
  function animate() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(heart => {
      heart.update();
      heart.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
