/**
 * Chasse au Trésor - Game Illustrations
 * This file adds decorative illustrations to the mini-games page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Add decorative elements to the mini-games page
    addGameIllustrations();
});

/**
 * Adds decorative illustrations to the mini-games page
 */
function addGameIllustrations() {
    // Create a container for the illustrations
    const illustrationsContainer = document.createElement('div');
    illustrationsContainer.className = 'game-illustrations';
    
    // Add the container to the page before the games section
    const gamesSection = document.querySelector('.games');
    if (gamesSection) {
        gamesSection.parentNode.insertBefore(illustrationsContainer, gamesSection);
        
        // Add floating elements
        addFloatingElements(illustrationsContainer);
    }
    
    // Add decorative elements to the quote collection section
    const quoteSection = document.querySelector('.quote-collection');
    if (quoteSection) {
        // Add quote decoration
        addQuoteDecoration(quoteSection);
    }
    
    // Add CSS styles
    addIllustrationStyles();
}

/**
 * Adds floating decorative elements
 * @param {HTMLElement} container - The container to add the elements to
 */
function addFloatingElements(container) {
    // Create game-related icons that will float around
    const icons = [
        { icon: 'puzzle-piece', color: '#3498db', size: 30, top: '10%', left: '5%' },
        { icon: 'question', color: '#e74c3c', size: 25, top: '20%', left: '15%' },
        { icon: 'gamepad', color: '#2ecc71', size: 35, top: '15%', left: '85%' },
        { icon: 'brain', color: '#f39c12', size: 28, top: '25%', left: '75%' },
        { icon: 'lightbulb', color: '#9b59b6', size: 32, top: '5%', left: '50%' },
        { icon: 'chess', color: '#1abc9c', size: 30, top: '30%', left: '90%' }
    ];
    
    // Create and add each icon
    icons.forEach(iconData => {
        const iconElement = document.createElement('div');
        iconElement.className = 'floating-icon';
        iconElement.innerHTML = `<i class="fas fa-${iconData.icon}"></i>`;
        iconElement.style.color = iconData.color;
        iconElement.style.fontSize = `${iconData.size}px`;
        iconElement.style.top = iconData.top;
        iconElement.style.left = iconData.left;
        
        // Add random animation delay and duration
        const delay = Math.random() * 5;
        const duration = 15 + Math.random() * 10;
        iconElement.style.animationDelay = `${delay}s`;
        iconElement.style.animationDuration = `${duration}s`;
        
        container.appendChild(iconElement);
    });
    
    // Add connecting lines
    const linesCanvas = document.createElement('canvas');
    linesCanvas.className = 'connecting-lines';
    container.appendChild(linesCanvas);
    
    // Set canvas size
    function setCanvasSize() {
        linesCanvas.width = container.offsetWidth;
        linesCanvas.height = 200; // Fixed height for the illustrations area
    }
    
    // Initial size
    setCanvasSize();
    
    // Update on resize
    window.addEventListener('resize', setCanvasSize);
    
    // Draw connecting lines
    const ctx = linesCanvas.getContext('2d');
    
    function drawLines() {
        ctx.clearRect(0, 0, linesCanvas.width, linesCanvas.height);
        
        // Draw a wavy line across the canvas
        ctx.beginPath();
        ctx.moveTo(0, linesCanvas.height / 2);
        
        const segments = 10;
        const segmentWidth = linesCanvas.width / segments;
        
        for (let i = 1; i <= segments; i++) {
            const x = i * segmentWidth;
            const y = linesCanvas.height / 2 + Math.sin(Date.now() * 0.001 + i) * 30;
            ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw dots along the line
        for (let i = 0; i <= segments; i++) {
            const x = i * segmentWidth;
            const y = linesCanvas.height / 2 + Math.sin(Date.now() * 0.001 + i) * 30;
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#3498db';
            ctx.fill();
        }
        
        requestAnimationFrame(drawLines);
    }
    
    drawLines();
}

/**
 * Adds decorative elements to the quote collection section
 * @param {HTMLElement} container - The quote collection section
 */
function addQuoteDecoration(container) {
    // Add quotation marks decoration
    const quoteDecoration = document.createElement('div');
    quoteDecoration.className = 'quote-decoration';
    quoteDecoration.innerHTML = `
        <div class="quote-mark left">"</div>
        <div class="quote-mark right">"</div>
    `;
    
    // Insert at the beginning of the container
    container.insertBefore(quoteDecoration, container.firstChild);
}

/**
 * Adds CSS styles for the illustrations
 */
function addIllustrationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .game-illustrations {
            position: relative;
            height: 200px;
            margin-bottom: 2rem;
            overflow: hidden;
        }
        
        .floating-icon {
            position: absolute;
            animation: float 15s ease-in-out infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            25% {
                transform: translateY(-20px) rotate(5deg);
            }
            50% {
                transform: translateY(0) rotate(0deg);
            }
            75% {
                transform: translateY(20px) rotate(-5deg);
            }
            100% {
                transform: translateY(0) rotate(0deg);
            }
        }
        
        .connecting-lines {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        
        .quote-decoration {
            position: relative;
            height: 0;
        }
        
        .quote-mark {
            position: absolute;
            font-size: 120px;
            color: rgba(241, 196, 15, 0.2);
            font-family: Georgia, serif;
            line-height: 1;
        }
        
        .quote-mark.left {
            top: 20px;
            left: 0;
        }
        
        .quote-mark.right {
            bottom: -60px;
            right: 0;
        }
    `;
    
    document.head.appendChild(style);
}
