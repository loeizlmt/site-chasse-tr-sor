/**
 * Accessibility and Image Optimization Script
 * This script enhances the site's accessibility and optimizes image loading
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add skip to content link
    addSkipToContentLink();
    
    // Add ARIA attributes to interactive elements
    enhanceAriaAttributes();
    
    // Implement lazy loading for images
    setupLazyLoading();
    
    // Setup mobile navigation
    setupMobileNavigation();
    
    // Enhance keyboard navigation
    enhanceKeyboardNavigation();
    
    // Add role attributes to main sections
    addRoleAttributes();
});

/**
 * Adds a "Skip to content" link for keyboard users
 */
function addSkipToContentLink() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Passer au contenu principal';
    skipLink.setAttribute('aria-label', 'Passer au contenu principal');
    
    // Insert the skip link as the first element in the body
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add id to main content
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main-content';
        main.setAttribute('tabindex', '-1'); // Make it focusable
    }
}

/**
 * Enhances elements with appropriate ARIA attributes
 */
function enhanceAriaAttributes() {
    // Add ARIA labels to navigation
    const nav = document.querySelector('nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Menu principal');
    }
    
    // Add ARIA labels to buttons without text
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
            // Try to find an icon inside
            const icon = button.querySelector('i, svg');
            if (icon && icon.className) {
                // Extract a label from icon classes (e.g., fa-search -> "Rechercher")
                let iconClass = '';
                if (icon.className.includes('fa-search')) iconClass = 'Rechercher';
                else if (icon.className.includes('fa-bars')) iconClass = 'Menu';
                else if (icon.className.includes('fa-times')) iconClass = 'Fermer';
                else if (icon.className.includes('fa-play')) iconClass = 'Jouer';
                else if (icon.className.includes('fa-pause')) iconClass = 'Pause';
                
                if (iconClass) {
                    button.setAttribute('aria-label', iconClass);
                }
            }
        }
    });
    
    // Add ARIA labels to form elements
    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
        // Find associated label
        const id = element.id;
        if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            if (!label) {
                // No explicit label, add an aria-label based on placeholder or name
                if (element.placeholder) {
                    element.setAttribute('aria-label', element.placeholder);
                } else if (element.name) {
                    element.setAttribute('aria-label', element.name.replace(/[-_]/g, ' '));
                }
            }
        } else if (element.placeholder) {
            // No id but has placeholder, use it for aria-label
            element.setAttribute('aria-label', element.placeholder);
        }
        
        // Mark required fields
        if (element.required) {
            element.setAttribute('aria-required', 'true');
            
            // Find and add 'required' class to label
            if (element.id) {
                const label = document.querySelector(`label[for="${element.id}"]`);
                if (label) {
                    label.classList.add('required');
                }
            }
        }
    });
    
    // Add ARIA attributes to progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            // Get width percentage from style
            const width = progressFill.style.width || '0%';
            const valueNow = parseInt(width);
            progressBar.setAttribute('aria-valuenow', valueNow.toString());
            progressBar.setAttribute('aria-valuetext', `${valueNow}% complété`);
        }
    }
    
    // Add ARIA attributes to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.setAttribute('role', 'article');
        
        // If it's a clickable card
        if (card.onclick || card.querySelector('a')) {
            card.setAttribute('role', 'button');
            
            // If it doesn't have a tabindex, add one
            if (!card.getAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }
            
            // Add keyboard event listener if it has onclick
            if (card.onclick && !card.onkeydown) {
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            }
        }
    });
}

/**
 * Sets up lazy loading for images
 */
function setupLazyLoading() {
    // Check if the browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Also handle background images
                    const dataBg = img.getAttribute('data-bg');
                    if (dataBg) {
                        img.style.backgroundImage = `url(${dataBg})`;
                        img.removeAttribute('data-bg');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Target all images that have a data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src], [data-bg]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
            
            // Add a placeholder background color
            if (!img.style.backgroundColor) {
                img.style.backgroundColor = '#f0f0f0';
            }
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
        
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        lazyBackgrounds.forEach(el => {
            el.style.backgroundImage = `url(${el.getAttribute('data-bg')})`;
            el.removeAttribute('data-bg');
        });
    }
}

/**
 * Enhances mobile navigation accessibility
 */
function setupMobileNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const navUl = nav.querySelector('ul');
    if (!navUl) return;
    
    // Find existing hamburger button
    const existingMenuToggle = document.querySelector('.menu-toggle');
    
    if (existingMenuToggle) {
        // Enhance existing menu toggle with ARIA attributes
        existingMenuToggle.setAttribute('aria-label', 'Menu de navigation');
        existingMenuToggle.setAttribute('aria-controls', 'nav-menu');
        
        // Add ID to the nav menu for ARIA controls
        navUl.id = 'nav-menu';
        
        // Update ARIA expanded state when menu is toggled
        nav.addEventListener('transitionend', function() {
            const isOpen = nav.classList.contains('is-open');
            existingMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        
        // Set initial state
        existingMenuToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Add mobile bottom navigation for frequently used actions
    addMobileBottomNav();
}

/**
 * Adds a fixed bottom navigation for mobile devices
 */
function addMobileBottomNav() {
    // Only add on mobile devices
    if (window.innerWidth > 767) return;
    
    const bottomNav = document.createElement('div');
    bottomNav.className = 'mobile-bottom-nav';
    
    // Determine which links to include based on current page
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    // Default navigation items
    const navItems = [
        { icon: 'fa-home', text: 'Accueil', href: 'index.html' },
        { icon: 'fa-map-marked-alt', text: 'Visites', href: 'visite.html' },
        { icon: 'fa-gamepad', text: 'Jeux', href: 'mini-jeux.html' },
        { icon: 'fa-quote-right', text: 'Solution', href: 'solution.html' }
    ];
    
    // Build navigation HTML
    navItems.forEach(item => {
        const isActive = filename === item.href;
        const link = document.createElement('a');
        link.href = item.href;
        link.innerHTML = `<i class="fas ${item.icon}"></i><span>${item.text}</span>`;
        
        if (isActive) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
        
        bottomNav.appendChild(link);
    });
    
    // Add to the page
    document.body.appendChild(bottomNav);
}

/**
 * Enhances keyboard navigation
 */
function enhanceKeyboardNavigation() {
    // Add tabindex to interactive elements that might not be focusable by default
    const interactiveElements = document.querySelectorAll('.game-card, .rule-card, [onclick]');
    interactiveElements.forEach(el => {
        if (!el.getAttribute('tabindex') && el.tagName !== 'A' && el.tagName !== 'BUTTON' && 
            el.tagName !== 'INPUT' && el.tagName !== 'SELECT' && el.tagName !== 'TEXTAREA') {
            el.setAttribute('tabindex', '0');
        }
    });
    
    // Add keyboard support for custom interactive elements
    document.querySelectorAll('[tabindex="0"][onclick]').forEach(el => {
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus trap for modals
    const modals = document.querySelectorAll('.modal, [role="dialog"]');
    modals.forEach(modal => {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Find and click close button
                const closeBtn = modal.querySelector('.close-btn, .btn-close, [aria-label="Fermer"]');
                if (closeBtn) {
                    closeBtn.click();
                }
            }
            
            if (e.key === 'Tab') {
                // Get all focusable elements
                const focusableElements = modal.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                // If shift+tab on first element, move to last
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
                // If tab on last element, move to first
                else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    });
}

/**
 * Adds role attributes to main sections for better screen reader navigation
 */
function addRoleAttributes() {
    // Add roles to main structural elements
    const header = document.querySelector('header');
    if (header) header.setAttribute('role', 'banner');
    
    const main = document.querySelector('main');
    if (main) main.setAttribute('role', 'main');
    
    const footer = document.querySelector('footer');
    if (footer) footer.setAttribute('role', 'contentinfo');
    
    // Add roles to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Check if it has a heading
        const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
            section.setAttribute('aria-labelledby', heading.id || `section-${Math.random().toString(36).substr(2, 9)}`);
            
            // If heading doesn't have an ID, add one
            if (!heading.id) {
                heading.id = section.getAttribute('aria-labelledby');
            }
        }
        
        // Add appropriate roles based on content
        if (section.classList.contains('hero')) {
            section.setAttribute('role', 'region');
            section.setAttribute('aria-label', 'Introduction');
        } else if (section.classList.contains('rules')) {
            section.setAttribute('role', 'region');
            section.setAttribute('aria-label', 'Règles du jeu');
        } else if (section.classList.contains('progress')) {
            section.setAttribute('role', 'region');
            section.setAttribute('aria-label', 'Progression');
        }
    });
    
    // Add roles to navigation elements
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        // Check if it's the current page
        const href = link.getAttribute('href');
        const currentPath = window.location.pathname;
        const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        
        if (href === filename || (filename === '' && href === 'index.html')) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Adds native lazy loading attribute to images
 * This is a simpler approach that uses the browser's built-in lazy loading
 */
function optimizeImages() {
    // Add native lazy loading to images
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        // Skip very small images or logos
        if (img.width < 50 || img.height < 50) return;
        if (img.id === 'logo-img') return;
        
        // Add loading="lazy" attribute for native lazy loading
        img.setAttribute('loading', 'lazy');
    });
}

// Call optimizeImages after the DOM is loaded
document.addEventListener('DOMContentLoaded', optimizeImages);
