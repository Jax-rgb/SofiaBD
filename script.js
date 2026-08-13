const envelope = document.getElementById('envelope');

// Toggle open state when clicked
envelope.addEventListener('click', () => {
    envelope.classList.toggle('flap');
});

// Generate floating background hearts automatically
function createFloatingHeart() {
    const heartsBg = document.getElementById('heartsBg');
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's'; // Between 3s and 6s
    
    heartsBg.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createFloatingHeart, 400);
