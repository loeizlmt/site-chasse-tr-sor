/**
 * Chasse au Trésor - QR Code Placeholder Generator
 * This file creates placeholder QR code images when the actual images are not available
 */

document.addEventListener('DOMContentLoaded', () => {
    // Find all QR code images
    const qrImages = document.querySelectorAll('img[src*="qr-"]');
    
    // Set up error handler for each QR code image
    qrImages.forEach(img => {
        img.onerror = function() {
            // Prevent infinite error loop
            this.onerror = null;
            
            // Replace with canvas-generated QR code
            this.src = generateQRCodePlaceholder();
            
            // Add some styling
            this.style.backgroundColor = '#f1f1f1';
            this.style.padding = '5px';
            this.style.borderRadius = '5px';
        };
    });
});

/**
 * Generates a placeholder QR code using HTML5 Canvas
 * @returns {string} Data URL of the generated QR code
 */
function generateQRCodePlaceholder() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 150;
    canvas.height = 150;
    
    // Draw background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw QR code pattern (simplified)
    ctx.fillStyle = 'black';
    
    // Draw position detection patterns (corners)
    // Top-left corner
    ctx.fillRect(10, 10, 30, 30);
    ctx.fillStyle = 'white';
    ctx.fillRect(15, 15, 20, 20);
    ctx.fillStyle = 'black';
    ctx.fillRect(20, 20, 10, 10);
    
    // Top-right corner
    ctx.fillStyle = 'black';
    ctx.fillRect(110, 10, 30, 30);
    ctx.fillStyle = 'white';
    ctx.fillRect(115, 15, 20, 20);
    ctx.fillStyle = 'black';
    ctx.fillRect(120, 20, 10, 10);
    
    // Bottom-left corner
    ctx.fillStyle = 'black';
    ctx.fillRect(10, 110, 30, 30);
    ctx.fillStyle = 'white';
    ctx.fillRect(15, 115, 20, 20);
    ctx.fillStyle = 'black';
    ctx.fillRect(20, 120, 10, 10);
    
    // Draw random QR code-like pattern
    ctx.fillStyle = 'black';
    for (let i = 0; i < 100; i++) {
        const x = Math.floor(Math.random() * 130) + 10;
        const y = Math.floor(Math.random() * 130) + 10;
        const size = Math.floor(Math.random() * 5) + 2;
        
        // Skip if in corner detection patterns
        if ((x < 45 && y < 45) || (x > 105 && y < 45) || (x < 45 && y > 105)) {
            continue;
        }
        
        ctx.fillRect(x, y, size, size);
    }
    
    // Return data URL
    return canvas.toDataURL('image/png');
}
