/**
 * Chasse au Trésor - Jean Prévost Portrait Placeholder
 * This file creates a placeholder for the portrait of Jean Prévost when the actual image is not available
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if the image exists
    const portraitImages = document.querySelectorAll('img[src="images/jp.png"]');
    
    portraitImages.forEach(img => {
        // Only replace the image if it fails to load
        img.addEventListener('error', () => {
            console.log('Portrait image failed to load, creating placeholder');
            
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            canvas.width = 400;
            canvas.height = 500;
            
            // Draw background
            const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            bgGradient.addColorStop(0, '#F5F5DC');
            bgGradient.addColorStop(1, '#E8E8D0');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add a vintage paper texture effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
            for (let i = 0; i < 300; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 3 + 1;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw a decorative border
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 10;
            ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
            
            // Draw inner decorative border
            ctx.strokeStyle = '#D2B48C';
            ctx.lineWidth = 2;
            ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
            
            // Draw head shape
            ctx.fillStyle = '#D2B48C';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, 180, 80, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw neck
            ctx.fillStyle = '#D2B48C';
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 30, 250);
            ctx.lineTo(canvas.width / 2 + 30, 250);
            ctx.lineTo(canvas.width / 2 + 40, 300);
            ctx.lineTo(canvas.width / 2 - 40, 300);
            ctx.closePath();
            ctx.fill();
            
            // Draw suit
            ctx.fillStyle = '#333333';
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 80, 300);
            ctx.lineTo(canvas.width / 2 + 80, 300);
            ctx.lineTo(canvas.width / 2 + 100, 500);
            ctx.lineTo(canvas.width / 2 - 100, 500);
            ctx.closePath();
            ctx.fill();
            
            // Draw collar
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 30, 300);
            ctx.lineTo(canvas.width / 2, 350);
            ctx.lineTo(canvas.width / 2 + 30, 300);
            ctx.closePath();
            ctx.fill();
            
            // Draw facial features
            // Eyes
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.ellipse(canvas.width / 2 - 25, 170, 8, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(canvas.width / 2 + 25, 170, 8, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Eyebrows
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 40, 155);
            ctx.lineTo(canvas.width / 2 - 10, 150);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 + 40, 155);
            ctx.lineTo(canvas.width / 2 + 10, 150);
            ctx.stroke();
            
            // Nose
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 170);
            ctx.lineTo(canvas.width / 2 + 5, 195);
            ctx.lineTo(canvas.width / 2 - 5, 195);
            ctx.closePath();
            ctx.stroke();
            
            // Mouth
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 20, 210);
            ctx.quadraticCurveTo(canvas.width / 2, 220, canvas.width / 2 + 20, 210);
            ctx.stroke();
            
            // Hair
            ctx.fillStyle = '#4A4A4A';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, 140, 60, Math.PI, 0);
            ctx.fill();
            
            // Add some hair details
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2 - 60 + i * 12, 140);
                ctx.lineTo(canvas.width / 2 - 50 + i * 12, 120);
                ctx.stroke();
            }
            
            // Draw glasses
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            // Left lens
            ctx.beginPath();
            ctx.ellipse(canvas.width / 2 - 25, 170, 15, 12, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Right lens
            ctx.beginPath();
            ctx.ellipse(canvas.width / 2 + 25, 170, 15, 12, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Bridge
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 10, 170);
            ctx.lineTo(canvas.width / 2 + 10, 170);
            ctx.stroke();
            // Temple arms
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 40, 170);
            ctx.lineTo(canvas.width / 2 - 60, 165);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 + 40, 170);
            ctx.lineTo(canvas.width / 2 + 60, 165);
            ctx.stroke();
            
            // Add name
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 24px serif';
            ctx.textAlign = 'center';
            ctx.fillText('Jean Prévost', canvas.width / 2, 400);
            
            // Add years
            ctx.font = 'italic 18px serif';
            ctx.fillText('1901 - 1944', canvas.width / 2, 430);
            
            // Add a subtle shadow to the portrait
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 1;
            ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            // Replace the image with the canvas
            img.src = canvas.toDataURL('image/png');
        });
    });
});
