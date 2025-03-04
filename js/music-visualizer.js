/**
 * Chasse au Trésor - Music Visualizer
 * This file creates a music visualization for the final page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the music visualizer when a video is loaded
    initMusicVisualizer();
});

/**
 * Initializes the music visualizer
 */
function initMusicVisualizer() {
    // Create a style element for the visualizer
    const style = document.createElement('style');
    style.textContent = `
        .music-player {
            position: relative;
            overflow: hidden;
        }
        
        .visualizer-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100px;
            z-index: 0;
            pointer-events: none;
            opacity: 0.7;
        }
        
        .visualizer-canvas {
            width: 100%;
            height: 100%;
        }
        
        .video-container {
            position: relative;
            z-index: 1;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .music-player h3 {
            position: relative;
            z-index: 1;
        }
        
        .music-player p {
            position: relative;
            z-index: 1;
        }
        
        .clues-form {
            position: relative;
            z-index: 1;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            padding: 2rem;
            margin-top: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .music-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0.1;
            pointer-events: none;
        }
        
        .music-note {
            position: absolute;
            font-size: 30px;
            color: var(--primary-color);
            animation: float-note 10s linear infinite;
            opacity: 0.5;
        }
        
        @keyframes float-note {
            0% {
                transform: translateY(100%) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Wait for the video to be loaded
    const videoObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if a video element was added
                const videoElement = document.querySelector('video');
                if (videoElement) {
                    // Create the visualizer
                    createVisualizer(videoElement);
                    
                    // Add floating music notes
                    addMusicNotes();
                    
                    // Disconnect the observer
                    videoObserver.disconnect();
                }
                
                // Check if an iframe was added (YouTube or other embed)
                const iframeElement = document.querySelector('iframe');
                if (iframeElement) {
                    // We can't access the audio from an iframe, so just add visual elements
                    addMusicNotes();
                    
                    // Disconnect the observer
                    videoObserver.disconnect();
                }
            }
        });
    });
    
    // Start observing the video container
    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
        videoObserver.observe(videoContainer, { childList: true, subtree: true });
    }
}

/**
 * Creates an audio visualizer for the video element
 * @param {HTMLVideoElement} videoElement - The video element to visualize
 */
function createVisualizer(videoElement) {
    // Create a container for the visualizer
    const visualizerContainer = document.createElement('div');
    visualizerContainer.className = 'visualizer-container';
    
    // Create a canvas for the visualizer
    const canvas = document.createElement('canvas');
    canvas.className = 'visualizer-canvas';
    visualizerContainer.appendChild(canvas);
    
    // Add the visualizer to the music player
    const musicPlayer = document.querySelector('.music-player');
    if (musicPlayer) {
        musicPlayer.appendChild(visualizerContainer);
    }
    
    // Set up the canvas
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function setCanvasSize() {
        canvas.width = visualizerContainer.offsetWidth;
        canvas.height = visualizerContainer.offsetHeight;
    }
    
    // Initial size
    setCanvasSize();
    
    // Update on resize
    window.addEventListener('resize', setCanvasSize);
    
    // Create an audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create an analyzer
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    
    // Get the audio source from the video element
    const source = audioContext.createMediaElementSource(videoElement);
    
    // Connect the source to the analyzer and the analyzer to the destination
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    
    // Create a buffer for the analyzer data
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    // Draw the visualizer
    function draw() {
        requestAnimationFrame(draw);
        
        // Get the analyzer data
        analyzer.getByteFrequencyData(dataArray);
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set the bar width and spacing
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        // Draw the bars
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;
            
            // Create a gradient for the bar
            const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
            gradient.addColorStop(0, '#3498db');
            gradient.addColorStop(1, '#2ecc71');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }
    
    // Start the visualization
    draw();
}

/**
 * Adds floating music notes to the music player
 */
function addMusicNotes() {
    // Create a container for the music background
    const musicBackground = document.createElement('div');
    musicBackground.className = 'music-background';
    
    // Add the music background to the music player
    const musicPlayer = document.querySelector('.music-player');
    if (musicPlayer) {
        musicPlayer.appendChild(musicBackground);
    }
    
    // Add music notes
    const musicNotes = ['♪', '♫', '♩', '♬', '♭', '♮', '♯'];
    
    for (let i = 0; i < 20; i++) {
        const note = document.createElement('div');
        note.className = 'music-note';
        note.textContent = musicNotes[Math.floor(Math.random() * musicNotes.length)];
        
        // Random position
        const left = Math.random() * 100;
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        
        // Random animation delay
        const delay = Math.random() * 10;
        
        // Set styles
        note.style.left = `${left}%`;
        note.style.animationDuration = `${duration}s`;
        note.style.animationDelay = `${delay}s`;
        
        musicBackground.appendChild(note);
    }
}
