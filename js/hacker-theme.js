/**
 * Hacker Theme JavaScript - Easter Egg
 * This file contains functionality for the hacker theme
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if theme is already enabled
    checkThemeState();
});

/**
 * Creates the theme toggle button
 */
function createThemeToggle() {
    // Check if button already exists
    if (document.getElementById('theme-toggle')) {
        return;
    }
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.id = 'theme-toggle';
    themeToggle.textContent = 'DÉSACTIVER MODE HACKEUR';
    themeToggle.addEventListener('click', toggleHackerTheme);
    document.body.appendChild(themeToggle);
}

/**
 * Toggles the hacker theme
 */
function toggleHackerTheme() {
    const root = document.documentElement;
    const isHackerTheme = root.classList.contains('hacker-theme');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (isHackerTheme) {
        // Disable hacker theme
        root.classList.remove('hacker-theme');
        localStorage.setItem('hackerTheme', 'disabled');
        
        // Remove theme toggle button
        if (themeToggle) {
            themeToggle.remove();
        }
        
        // Remove bug elements
        const bugsContainer = document.querySelector('.hacker-theme-bugs');
        if (bugsContainer) {
            bugsContainer.remove();
        }
        
        // Remove glitch effect from headings
        document.querySelectorAll('h1, h2, h3').forEach(heading => {
            heading.classList.remove('glitch');
        });
        
        // Remove terminal text effect
        document.querySelectorAll('p').forEach(p => {
            p.classList.remove('terminal-text');
        });
        
        // Remove random character animation
        document.querySelectorAll('.random-chars').forEach(element => {
            element.classList.remove('random-chars');
            element.removeAttribute('data-text');
        });
    } else {
        // Enable hacker theme
        root.classList.add('hacker-theme');
        localStorage.setItem('hackerTheme', 'enabled');
        
        // Create theme toggle button if it doesn't exist
        if (!themeToggle) {
            createThemeToggle();
        } else {
            themeToggle.textContent = 'DÉSACTIVER MODE HACKEUR';
        }
        
        // Create bug elements
        createBugElements();
        
        // Add glitch effect to headings
        document.querySelectorAll('h1, h2, h3').forEach(heading => {
            heading.classList.add('glitch');
        });
        
        // Add terminal text effect to some paragraphs
        const paragraphs = document.querySelectorAll('p');
        for (let i = 0; i < paragraphs.length; i += 3) { // Only add to every third paragraph
            if (paragraphs[i]) {
                paragraphs[i].classList.add('terminal-text');
            }
        }
        
        // Play glitch sound
        playGlitchSound();
        
        // Add random character animation to some text
        addRandomCharAnimation();
    }
}

/**
 * Checks if the hacker theme is enabled in localStorage
 */
function checkThemeState() {
    const hackerTheme = localStorage.getItem('hackerTheme');
    
    if (hackerTheme === 'enabled') {
        document.documentElement.classList.add('hacker-theme');
        
        // Create theme toggle button
        createThemeToggle();
        
        // Create bug elements
        createBugElements();
        
        // Add glitch effect to headings
        document.querySelectorAll('h1, h2, h3').forEach(heading => {
            heading.classList.add('glitch');
        });
        
        // Add terminal text effect to some paragraphs
        const paragraphs = document.querySelectorAll('p');
        for (let i = 0; i < paragraphs.length; i += 3) { // Only add to every third paragraph
            if (paragraphs[i]) {
                paragraphs[i].classList.add('terminal-text');
            }
        }
        
        // Add random character animation to some text
        addRandomCharAnimation();
    }
}

/**
 * Creates the bug elements for the hacker theme
 */
function createBugElements() {
    // Remove existing bugs container if it exists
    const existingBugsContainer = document.querySelector('.hacker-theme-bugs');
    if (existingBugsContainer) {
        existingBugsContainer.remove();
    }
    
    // Create bugs container
    const bugsContainer = document.createElement('div');
    bugsContainer.className = 'hacker-theme-bugs';
    
    // Create bug elements
    for (let i = 1; i <= 3; i++) {
        const bug = document.createElement('div');
        bug.className = `bug bug-${i}`;
        bugsContainer.appendChild(bug);
    }
    
    // Add random bugs that appear and disappear
    for (let i = 0; i < 10; i++) {
        const randomBug = document.createElement('div');
        randomBug.className = 'bug';
        randomBug.style.top = `${Math.random() * 100}%`;
        randomBug.style.left = `${Math.random() * 100}%`;
        randomBug.style.width = `${Math.random() * 100 + 10}px`;
        randomBug.style.height = '2px';
        randomBug.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Add random animation
        const duration = Math.random() * 20 + 5;
        const delay = Math.random() * 30;
        randomBug.style.animation = `bug${Math.floor(Math.random() * 3) + 1} ${duration}s ${delay}s infinite`;
        
        bugsContainer.appendChild(randomBug);
    }
    
    document.body.appendChild(bugsContainer);
}

/**
 * Plays a glitch sound effect
 */
function playGlitchSound() {
    // Create audio element
    const audio = document.createElement('audio');
    
    // In a real implementation, you would use an actual sound file
    // For this example, we'll just log a message
    console.log('Playing glitch sound effect');
    
    // If you want to add a real sound effect, uncomment the following lines
    // audio.src = 'sounds/glitch.mp3';
    // audio.volume = 0.3;
    // audio.play();
}

/**
 * Adds random character animation to some text elements
 */
function addRandomCharAnimation() {
    // Get random text elements
    const textElements = document.querySelectorAll('p, li, h3, h4');
    const randomElements = Array.from(textElements).sort(() => 0.5 - Math.random()).slice(0, 5);
    
    randomElements.forEach(element => {
        element.classList.add('random-chars');
        element.setAttribute('data-text', element.textContent);
    });
}

/**
 * Checks for secret phrases in input fields
 * This will be implemented in a future update
 */
function checkSecretPhrases() {
    // This function will be implemented later
    console.log('Secret phrase detection will be implemented in a future update');
}
