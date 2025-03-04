/**
 * Chasse au Trésor - Logo Placeholder Generator
 * This file creates a placeholder logo when the actual logo image is not available
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get all logo image elements
    const logoImages = document.querySelectorAll('#logo-img');
    
    // Set up error handler for each logo image
    logoImages.forEach(img => {
        img.onerror = function() {
            // Prevent infinite error loop
            this.onerror = null;
            
            // Replace with canvas-generated logo
            this.src = generateLogoPlaceholder();
            
            // Add some styling
            this.style.backgroundColor = '#f1f1f1';
            this.style.padding = '5px';
            this.style.borderRadius = '5px';
        };
    });
});

/**
 * Generates a placeholder logo using HTML5 Canvas
 * @returns {string} Data URL of the generated logo
 */
function generateLogoPlaceholder() {
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
    
    // Add a decorative element
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, Math.PI * 2);
    ctx.stroke();
    
    // Return data URL
    return canvas.toDataURL('image/png');
}
