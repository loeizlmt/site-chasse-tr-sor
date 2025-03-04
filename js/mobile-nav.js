/**
 * Chasse au Trésor - Mobile Navigation
 * This file adds a mobile-friendly navigation menu for small screens
 */

// Execute immediately without waiting for DOMContentLoaded
console.log('Mobile navigation script loaded');

// Try to set up immediately
try {
    setupMobileNavigation();
} catch (error) {
    console.error('Error setting up mobile navigation immediately:', error);
}

// Also set up when DOM is fully loaded to be safe
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    try {
        setupMobileNavigation();
    } catch (error) {
        console.error('Error setting up mobile navigation on DOMContentLoaded:', error);
    }
});

// Add a fallback for window load event
window.addEventListener('load', () => {
    console.log('Window load event fired');
    try {
        setupMobileNavigation();
    } catch (error) {
        console.error('Error setting up mobile navigation on window load:', error);
    }
});

// Function to set up mobile navigation
function setupMobileNavigation() {
    console.log('Setting up mobile navigation...');
    
    // Get the menu toggle button
    const menuToggle = document.getElementById('menu-toggle');
    if (!menuToggle) {
        console.error('Menu toggle button not found in the DOM');
        return;
    }
    console.log('Menu toggle button found:', menuToggle);
    
    // Get the navigation element
    const nav = document.querySelector('nav');
    if (!nav) {
        console.error('Navigation element not found in the DOM');
        return;
    }
    console.log('Navigation element found:', nav);
    
    // Define click handler function
    function handleMenuToggleClick(event) {
        console.log('Menu toggle clicked!');
        
        // Toggle the is-open class on the navigation
        nav.classList.toggle('is-open');
        
        // Update the toggle button icon
        if (nav.classList.contains('is-open')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            console.log('Menu opened');
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            console.log('Menu closed');
        }
    }
    
    // Remove any existing click event listeners
    menuToggle.removeEventListener('click', handleMenuToggleClick);
    
    // Add click event to the toggle button
    menuToggle.addEventListener('click', handleMenuToggleClick);
    console.log('Click event listener added to menu toggle button');
    
    // Add a direct onclick attribute as a fallback
    menuToggle.setAttribute('onclick', "document.querySelector('nav').classList.toggle('is-open'); this.innerHTML = document.querySelector('nav').classList.contains('is-open') ? '<i class=\"fas fa-times\"></i>' : '<i class=\"fas fa-bars\"></i>'; console.log('Menu toggle clicked via onclick attribute');");
    
    // Close the menu when a link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Add swipe gesture support
    addSwipeSupport(nav);
    
    // Log to console for debugging
    console.log('Mobile navigation setup complete. Menu toggle button created:', menuToggle);
}

/**
 * Adds swipe gesture support for mobile navigation
 * @param {HTMLElement} nav - The navigation element
 */
function addSwipeSupport(nav) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Add touch event listeners to the document
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    // Handle swipe gestures
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        
        // Left to right swipe (close menu)
        if (touchEndX - touchStartX > swipeThreshold && nav.classList.contains('is-open')) {
            nav.classList.remove('is-open');
            document.getElementById('menu-toggle').innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        // Right to left swipe (open menu)
        if (touchStartX - touchEndX > swipeThreshold && !nav.classList.contains('is-open')) {
            nav.classList.add('is-open');
            document.getElementById('menu-toggle').innerHTML = '<i class="fas fa-times"></i>';
        }
    }
}
