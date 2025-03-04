/**
 * Chasse au Trésor - Solution Page Pattern Generator
 * This file creates a decorative background pattern for the solution page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Generate the background pattern for the solution page
    generateSolutionPattern();
});

/**
 * Generates a decorative background pattern for the solution page
 */
function generateSolutionPattern() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 400;
    
    // Draw the pattern
    drawPattern(ctx, canvas.width, canvas.height);
    
    // Convert the canvas to a data URL
    const patternUrl = canvas.toDataURL('image/png');
    
    // Create a style element
    const style = document.createElement('style');
    style.textContent = `
        .solution {
            position: relative;
            background-color: white;
            border-radius: 10px;
            padding: 3rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            margin: 2rem 0;
            overflow: hidden;
        }
        
        .solution::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${patternUrl}');
            opacity: 0.05;
            z-index: 0;
        }
        
        .solution > * {
            position: relative;
            z-index: 1;
        }
        
        .quote-submission {
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .final-challenge {
            position: relative;
            background-color: white;
            border-radius: 10px;
            padding: 3rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            margin: 2rem 0;
            overflow: hidden;
            transition: all 0.5s ease-in-out;
        }
        
        .final-challenge::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(46, 204, 113, 0.1) 100%);
            z-index: 0;
        }
        
        .final-challenge > * {
            position: relative;
            z-index: 1;
        }
        
        .challenge-intro {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .challenge-intro p {
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }
        
        /* Add a decorative element to the quote result */
        .quote-result {
            position: relative;
            padding: 2rem;
            margin-top: 2rem;
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        
        .quote-result.success {
            background-color: rgba(46, 204, 113, 0.1);
            border: 1px solid #2ecc71;
        }
        
        .quote-result.error {
            background-color: rgba(231, 76, 60, 0.1);
            border: 1px solid #e74c3c;
        }
        
        .quote-result::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
        }
        
        .quote-result.success::before {
            border-bottom: 10px solid #2ecc71;
        }
        
        .quote-result.error::before {
            border-bottom: 10px solid #e74c3c;
        }
    `;
    
    // Add the style to the document
    document.head.appendChild(style);
    
    // Add animated particles to the solution page
    addAnimatedParticles();
}

/**
 * Draws a decorative pattern on the canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {number} width - The canvas width
 * @param {number} height - The canvas height
 */
function drawPattern(ctx, width, height) {
    // Set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Draw a grid of dots
    const dotSize = 2;
    const spacing = 20;
    
    for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = '#3498db';
            ctx.fill();
        }
    }
    
    // Draw some larger circles
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 20 + 10;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Draw some lines
    for (let i = 0; i < 5; i++) {
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = Math.random() * width;
        const y2 = Math.random() * height;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(46, 204, 113, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Draw some quote-related symbols
    const symbols = ['"', '"', '?', '!', '.', ',', ';', ':'];
    
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        ctx.font = `${Math.random() * 20 + 10}px serif`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillText(symbol, x, y);
    }
}

/**
 * Adds animated particles to the solution page
 */
function addAnimatedParticles() {
    // Create a container for the particles
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    // Add the container to the page
    const solutionSection = document.querySelector('.solution');
    if (solutionSection) {
        solutionSection.appendChild(particlesContainer);
        
        // Add particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 10 + 5;
            
            // Random color
            const colors = ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Random animation delay
            const delay = Math.random() * 10;
            
            // Set styles
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS for particles
        const style = document.createElement('style');
        style.textContent = `
            .particles-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: 0;
            }
            
            .particle {
                position: absolute;
                border-radius: 50%;
                opacity: 0.3;
                animation: float-particle 20s linear infinite;
            }
            
            @keyframes float-particle {
                0% {
                    transform: translateY(0) rotate(0deg);
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}
