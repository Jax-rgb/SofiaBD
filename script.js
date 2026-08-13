document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heartContainer');
    const heartCount = 60; // How many hearts float at once

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤'; // Heart character

        // Randomize size, position, and duration
        const size = Math.random() * 15 + 8; // 8px to 23px
        const startX = Math.random() * 100; // Left to Right %
        const duration = Math.random() * 5 + 3; // 3s to 8s
        const opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8

        heart.style.fontSize = `${size}px`;
        heart.style.left = `${startX}%`;
        heart.style.opacity = opacity;
        
        // Define animation directly for easy customization
        heart.animate([
            { transform: 'translateY(0vh)', opacity: opacity },
            { transform: 'translateY(-110vh)', opacity: 0 }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            delay: Math.random() * -duration * 1000 // Random start time
        });

        heartContainer.appendChild(heart);
    }

    // Initialize all hearts at staggered times
    for (let i = 0; i < heartCount; i++) {
        setTimeout(createHeart, Math.random() * 5000); // Spread out creation
    }
});
```http://googleusercontent.com/image_generation_content/467
