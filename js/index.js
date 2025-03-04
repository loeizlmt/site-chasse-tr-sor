/**
 * Chasse au Trésor - Homepage JavaScript
 * This file contains functionality specific to the homepage
 */

document.addEventListener('DOMContentLoaded', () => {
    // Add animation to rule cards
    const ruleCards = document.querySelectorAll('.rule-card');
    ruleCards.forEach((card, index) => {
        // Add staggered animation delay
        setTimeout(() => {
            utils.fadeIn(card);
        }, index * 100);
    });
    
    // Update progress display
    updateProgressDisplay();
    
    // Create placeholder logo if image is missing
    const logoImg = document.getElementById('logo-img');
    logoImg.onerror = function() {
        this.onerror = null;
        this.src = createPlaceholderLogo();
        this.style.backgroundColor = '#f1f1f1';
        this.style.padding = '5px';
    };
});

/**
 * Updates the progress display on the homepage
 */
function updateProgressDisplay() {
    const completedGames = gameState.completedGames.length;
    const totalGames = 6;
    const progressPercentage = (completedGames / totalGames) * 100;
    
    // Update progress bar
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
        
        // Change color based on progress
        if (progressPercentage < 30) {
            progressFill.style.backgroundColor = '#e74c3c'; // Red
        } else if (progressPercentage < 70) {
            progressFill.style.backgroundColor = '#f1c40f'; // Yellow
        } else {
            progressFill.style.backgroundColor = '#2ecc71'; // Green
        }
    }
    
    // Update text counters
    const completedGamesElement = document.getElementById('completed-games');
    if (completedGamesElement) {
        completedGamesElement.textContent = completedGames;
    }
    
    const quoteProgressElement = document.getElementById('quote-progress');
    if (quoteProgressElement) {
        quoteProgressElement.textContent = Math.round(progressPercentage);
    }
    
    // If all games are completed, show a congratulations message
    if (completedGames === totalGames) {
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer && !document.querySelector('.congrats-message')) {
            const congratsMessage = utils.createElement('div', {
                className: 'congrats-message'
            }, `
                <h3>Félicitations !</h3>
                <p>Vous avez complété tous les mini-jeux et collecté tous les fragments de la citation.</p>
                <p>Rendez-vous sur la page <a href="solution.html">Solution</a> pour soumettre la citation complète.</p>
            `);
            
            progressContainer.appendChild(congratsMessage);
            utils.fadeIn(congratsMessage);
        }
    }
}

/**
 * Creates a data URL for a placeholder logo
 * @returns {string} Data URL for the placeholder image
 */
function createPlaceholderLogo() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 100;
    canvas.height = 100;
    
    // Draw background
    ctx.fillStyle = '#3498db';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('JP', canvas.width / 2, canvas.height / 2);
    
    // Return data URL
    return canvas.toDataURL('image/png');
}
