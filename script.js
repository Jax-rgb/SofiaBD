document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('birthdayCard');
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');

  // Interactive Card Flip
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });

  // Handle Resize
  let width, height;
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Draw Heart Helper Function
  function drawHeart(x, y, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Floating Heart Particle Engine
  class FlyingHeart {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 12 + 8; // Heart size
      this.speedY = Math.random() * 0.8 + 0.4;
      this.swaySpeed = Math.random() * 0.02 + 0.005;
      this.swayOffset = Math.random() * Math.PI * 2;
      this.rotation = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.6 + 0.2;
      
      // Color palette: mix of soft purple, vivid magenta, and champagne gold
      const colors = ['#c084fc', '#a855f7', '#e879f9', '#f3e5ab'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y -= this.speedY;
      this.swayOffset += this.swaySpeed;
      this.x += Math.sin(this.swayOffset) * 0.5;

      // Reset when reaching top
      if (this.y < -30) {
        this.reset(false);
      }
    }

    draw() {
      drawHeart(this.x, this.y, this.size, this.color, this.alpha, this.rotation);
    }
  }

  // Create particle pool proportional to screen size
  const particleCount = Math.min(Math.floor(window.innerWidth / 10), 45);
  const hearts = Array.from({ length: particleCount }, () => new FlyingHeart());

  // Animation Loop
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
