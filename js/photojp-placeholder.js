/**
 * Chasse au Trésor - Exterior View Placeholder
 * This file creates a placeholder for the exterior view of the high school when the actual image is not available
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if the image exists
    const exteriorImages = document.querySelectorAll('img[src="images/photojp.jpg"]');
    
    exteriorImages.forEach(img => {
        // Only replace the image if it fails to load
        img.addEventListener('error', () => {
            console.log('Exterior image failed to load, creating placeholder');
            
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            canvas.width = 800;
            canvas.height = 500;
            
            // Draw background (sky)
            const skyGradient = ctx.createLinearGradient(0, 0, 0, 200);
            skyGradient.addColorStop(0, '#87CEEB');
            skyGradient.addColorStop(1, '#E0F7FF');
            ctx.fillStyle = skyGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw ground
            const groundGradient = ctx.createLinearGradient(0, 350, 0, canvas.height);
            groundGradient.addColorStop(0, '#7CCD7C');
            groundGradient.addColorStop(1, '#2E8B57');
            ctx.fillStyle = groundGradient;
            ctx.fillRect(0, 350, canvas.width, 150);
            
            // Draw main building
            ctx.fillStyle = '#F5DEB3';
            ctx.fillRect(150, 150, 500, 200);
            
            // Draw roof
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.moveTo(100, 150);
            ctx.lineTo(400, 50);
            ctx.lineTo(700, 150);
            ctx.closePath();
            ctx.fill();
            
            // Draw windows
            ctx.fillStyle = '#87CEFA';
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 2; j++) {
                    ctx.fillRect(200 + i * 100, 180 + j * 80, 60, 60);
                }
            }
            
            // Draw door
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(375, 270, 50, 80);
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(390, 310, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw path
            ctx.fillStyle = '#D3D3D3';
            ctx.beginPath();
            ctx.moveTo(375, 350);
            ctx.lineTo(425, 350);
            ctx.lineTo(500, 500);
            ctx.lineTo(300, 500);
            ctx.closePath();
            ctx.fill();
            
            // Draw trees
            function drawTree(x, y, size) {
                // Trunk
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(x - size/10, y - size, size/5, size);
                
                // Leaves
                ctx.fillStyle = '#006400';
                ctx.beginPath();
                ctx.moveTo(x, y - size - size/2);
                ctx.lineTo(x + size/2, y - size);
                ctx.lineTo(x - size/2, y - size);
                ctx.closePath();
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(x, y - size - size/3);
                ctx.lineTo(x + size/1.5, y - size + size/3);
                ctx.lineTo(x - size/1.5, y - size + size/3);
                ctx.closePath();
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(x, y - size - size/6);
                ctx.lineTo(x + size/1.2, y - size + size/1.5);
                ctx.lineTo(x - size/1.2, y - size + size/1.5);
                ctx.closePath();
                ctx.fill();
            }
            
            drawTree(100, 350, 80);
            drawTree(700, 350, 100);
            drawTree(250, 400, 60);
            drawTree(550, 400, 70);
            
            // Draw clouds
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            function drawCloud(x, y, size) {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.arc(x + size, y - size/2, size * 0.8, 0, Math.PI * 2);
                ctx.arc(x + size * 1.5, y, size, 0, Math.PI * 2);
                ctx.arc(x + size * 0.5, y + size/2, size * 0.8, 0, Math.PI * 2);
                ctx.fill();
            }
            
            drawCloud(100, 80, 30);
            drawCloud(400, 60, 25);
            drawCloud(700, 100, 35);
            
            // Draw "Lycée Jean Prévost" text
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Lycée Jean Prévost', 400, 130);
            
            // Draw flag
            ctx.fillStyle = '#0055A4'; // Blue
            ctx.fillRect(650, 100, 20, 50);
            ctx.fillStyle = '#0055A4'; // Blue
            ctx.fillRect(670, 100, 20, 15);
            ctx.fillStyle = '#FFFFFF'; // White
            ctx.fillRect(670, 115, 20, 15);
            ctx.fillStyle = '#EF4135'; // Red
            ctx.fillRect(670, 130, 20, 15);
            
            // Replace the image with the canvas
            img.src = canvas.toDataURL('image/jpeg');
        });
    });
});
