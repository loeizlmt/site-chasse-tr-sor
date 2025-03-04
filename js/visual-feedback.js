/**
 * Chasse au Trésor - Visual Feedback
 * This file adds visual feedback and animations to enhance the user experience
 */

document.addEventListener('DOMContentLoaded', () => {
    // Add visual feedback elements
    addVisualFeedback();
});

/**
 * Adds visual feedback elements to the page
 */
function addVisualFeedback() {
    // Add button hover effects
    addButtonEffects();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add interactive elements
    addInteractiveElements();
    
    // Add page transition effects
    addPageTransitions();
    
    // Add visual styles
    addVisualStyles();
}

/**
 * Adds enhanced button effects
 */
function addButtonEffects() {
    // Get all buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            // Position the ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Set ripple position and size
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Adds scroll animations to elements
 */
function addScrollAnimations() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each section
    sections.forEach(section => {
        section.classList.add('scroll-animate');
        observer.observe(section);
    });
}

/**
 * Adds interactive elements to the page
 */
function addInteractiveElements() {
    // Add tooltip functionality
    addTooltips();
    
    // Add hover effects to cards
    addCardEffects();
    
    // Add focus effects to form elements
    addFormEffects();
}

/**
 * Adds tooltips to elements with data-tooltip attribute
 */
function addTooltips() {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'global-tooltip';
    document.body.appendChild(tooltip);
    
    // Get all elements with data-tooltip attribute
    const elements = document.querySelectorAll('[data-tooltip]');
    
    // Add event listeners to show/hide tooltip
    elements.forEach(element => {
        element.addEventListener('mouseenter', e => {
            const text = element.getAttribute('data-tooltip');
            tooltip.textContent = text;
            tooltip.classList.add('visible');
            
            // Position the tooltip
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - 10}px`;
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
}

/**
 * Adds hover effects to cards
 */
function addCardEffects() {
    // Get all cards
    const cards = document.querySelectorAll('.rule-card, .game-card, .credit-card, .tech-card');
    
    // Add 3D tilt effect to cards
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
            const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
            
            card.style.transform = `perspective(1000px) rotateX(${yPercent * -3}deg) rotateY(${xPercent * 3}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/**
 * Adds effects to form elements
 */
function addFormEffects() {
    // Get all form inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    
    // Add focus effects
    inputs.forEach(input => {
        // Create a wrapper for the input
        const parent = input.parentElement;
        if (parent.classList.contains('form-group')) {
            parent.classList.add('input-effect');
            
            // Add focus event
            input.addEventListener('focus', () => {
                parent.classList.add('focused');
            });
            
            // Add blur event
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    parent.classList.remove('focused');
                }
            });
            
            // Set initial state
            if (input.value.trim() !== '') {
                parent.classList.add('focused');
            }
        }
    });
}

/**
 * Adds page transition effects
 */
function addPageTransitions() {
    // Add a page transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    // Add event listeners to links
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"])');
    
    links.forEach(link => {
        link.addEventListener('click', e => {
            // Only apply to links to other pages in the site
            const href = link.getAttribute('href');
            if (href && href.indexOf('://') === -1) {
                e.preventDefault();
                
                // Show overlay
                overlay.classList.add('active');
                
                // Navigate to the new page after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    // Hide overlay when page loads
    window.addEventListener('pageshow', () => {
        overlay.classList.remove('active');
    });
}

/**
 * Adds visual styles to the page
 */
function addVisualStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Button ripple effect */
        .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Scroll animations */
        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .scroll-animate.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Tooltip */
        .global-tooltip {
            position: fixed;
            background-color: var(--dark-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.9rem;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px) translateX(-50%);
            transition: opacity 0.3s, transform 0.3s;
            z-index: 1000;
            text-align: center;
            max-width: 200px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        }
        
        .global-tooltip.visible {
            opacity: 1;
            transform: translateY(-10px) translateX(-50%);
        }
        
        .global-tooltip::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid var(--dark-color);
        }
        
        /* Form effects */
        .input-effect {
            position: relative;
        }
        
        .input-effect label {
            position: absolute;
            top: 0.8rem;
            left: 0.8rem;
            transition: all 0.3s;
            pointer-events: none;
            padding: 0 0.5rem;
            background-color: white;
            color: #6c757d;
        }
        
        .input-effect.focused label {
            top: -0.5rem;
            font-size: 0.8rem;
            color: var(--primary-color);
        }
        
        .input-effect input:focus,
        .input-effect textarea:focus,
        .input-effect select:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        
        /* Page transitions */
        .page-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--primary-color);
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }
        
        .page-transition-overlay.active {
            opacity: 1;
            pointer-events: all;
        }
        
        /* Mobile enhancements */
        @media (max-width: 767px) {
            .scroll-animate {
                transform: translateY(20px);
            }
            
            .input-effect.focused label {
                top: -0.4rem;
                font-size: 0.75rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Add data-tooltip attributes to elements that need tooltips
    addTooltipAttributes();
}

/**
 * Adds data-tooltip attributes to elements that need tooltips
 */
function addTooltipAttributes() {
    // Add tooltips to progress bar
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.parentElement.setAttribute('data-tooltip', 'Votre progression dans la chasse au trésor');
    }
    
    // Add tooltips to reset button
    const resetButton = document.getElementById('reset-progress');
    if (resetButton) {
        resetButton.setAttribute('data-tooltip', 'Réinitialiser toute votre progression');
    }
    
    // Add tooltips to form elements
    const formElements = {
        'quote-input': 'Entrez la citation complète que vous avez reconstituée',
        'clue1': 'Identifiez le thème principal de la chanson',
        'clue2': 'Identifiez l\'époque ou la période évoquée',
        'clue3': 'Identifiez l\'émotion principale ressentie',
        'story-title': 'Donnez un titre à votre nouvelle',
        'story-content': 'Rédigez votre nouvelle en intégrant les 3 indices',
        'visit-select': 'Sélectionnez un lieu à visiter'
    };
    
    for (const [id, tooltip] of Object.entries(formElements)) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute('data-tooltip', tooltip);
        }
    }
}
