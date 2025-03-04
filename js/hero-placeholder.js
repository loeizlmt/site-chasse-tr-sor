/**
 * Chasse au Trésor - Hero Background Placeholder
 * This file creates a placeholder for the hero background image when the actual image is not available
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get all hero sections
    const heroSections = document.querySelectorAll('.hero');
    
    // Check if the background image is loaded
    heroSections.forEach(hero => {
        // Get the computed style
        const style = getComputedStyle(hero);
        const backgroundImage = style.backgroundImage;
        
        // If no background image or it's just the linear gradient, add a placeholder
        if (backgroundImage === 'none' || backgroundImage.includes('linear-gradient') && !backgroundImage.includes('url')) {
            // Create a canvas pattern
            const patternUrl = createHeroPattern();
            
            // Apply the pattern
            hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${patternUrl}')`;
        }
    });
});

/**
 * Creates a hero background pattern using HTML5 Canvas
 * @returns {string} Data URL of the generated pattern
 */
function createHeroPattern() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 300;
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, '#2c3e50');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    
    // Draw some random shapes
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 30 + 10;
        
        ctx.beginPath();
        if (i % 3 === 0) {
            // Circle
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        } else if (i % 3 === 1) {
            // Square
            ctx.rect(x, y, size, size);
        } else {
            // Triangle
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size / 2, y - size);
            ctx.closePath();
        }
        ctx.fill();
    }
    
    // Draw some lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 10; i++) {
        const x1 = Math.random() * canvas.width;
        const y1 = Math.random() * canvas.height;
        const x2 = Math.random() * canvas.width;
        const y2 = Math.random() * canvas.height;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    // Return data URL
    return canvas.toDataURL('image/png');
}
