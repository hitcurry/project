document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const clickerBtn = document.getElementById('clicker-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    let score = parseInt(localStorage.getItem('cosmicClickerScore')) || 0;
    
    // Initialize score display
    updateScoreDisplay();

    clickerBtn.addEventListener('click', (e) => {
        // Increment score
        score++;
        updateScoreDisplay();
        saveScore();
        
        // Create particle effect
        createParticle(e.clientX, e.clientY);
        
        // Add a little haptic feedback pattern if available (mobile)
        if (navigator.vibrate) {
            navigator.vibrate(5);
        }
    });

    resetBtn.addEventListener('click', () => {
        if(confirm('Are you sure you want to reset your universe?')) {
            score = 0;
            updateScoreDisplay();
            saveScore();
        }
    });

    function updateScoreDisplay() {
        scoreElement.textContent = score.toLocaleString();
        
        // Add a pop animation class to score
        scoreElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
        }, 100);
    }

    function saveScore() {
        localStorage.setItem('cosmicClickerScore', score);
    }

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.textContent = '+1';
        
        // Randomize position slightly around the click
        const randomX = (Math.random() - 0.5) * 40;
        
        particle.style.left = `${x + randomX}px`;
        particle.style.top = `${y - 20}px`;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
    
    // Add CSS transition for score programmatically to avoid initial load pop
    scoreElement.style.transition = 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});
