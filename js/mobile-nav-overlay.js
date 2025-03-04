/**
 * Mobile Navigation Overlay
 * This script handles the mobile navigation overlay functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile navigation overlay script loaded');
    
    // Get the mobile menu button, overlay, and close button
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (!mobileMenuBtn || !mobileNavOverlay || !mobileMenuClose) {
        console.error('Mobile navigation elements not found');
        return;
    }
    
    console.log('Mobile navigation elements found');
    
    // Toggle mobile menu when the menu button is clicked
    mobileMenuBtn.addEventListener('click', function() {
        console.log('Mobile menu button clicked');
        mobileNavOverlay.classList.add('active');
    });
    
    // Close mobile menu when the close button is clicked
    mobileMenuClose.addEventListener('click', function() {
        console.log('Mobile menu close button clicked');
        mobileNavOverlay.classList.remove('active');
    });
    
    // Close mobile menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Don't close if it's a submenu toggle
            if (this.classList.contains('has-submenu')) {
                return;
            }
            console.log('Mobile menu link clicked');
            mobileNavOverlay.classList.remove('active');
        });
    });
    
    // Toggle submenu when a submenu toggle is clicked
    const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
    submenuToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Submenu toggle clicked');
            
            // Get the parent list item
            const parentItem = this.closest('.mobile-nav-item');
            
            // Get the submenu
            const submenu = parentItem.querySelector('.mobile-submenu');
            
            // Toggle the active class on the submenu
            submenu.classList.toggle('active');
            
            // Update the toggle icon
            if (submenu.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i>';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNavOverlay.classList.contains('active') && 
            !mobileNavOverlay.contains(e.target) && 
            e.target !== mobileMenuBtn && 
            !mobileMenuBtn.contains(e.target)) {
            console.log('Clicked outside mobile menu');
            mobileNavOverlay.classList.remove('active');
        }
    });
    
    // Close mobile menu when escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
            console.log('Escape key pressed');
            mobileNavOverlay.classList.remove('active');
        }
    });
});
