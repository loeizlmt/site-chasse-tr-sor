/**
 * Profile Accessibility Module
 * Handles accessibility options in the user profile
 */

import { getUserProfile, saveUserProfile, updateUserProfile } from './profile-data.js';

/**
 * Creates accessibility options UI in the profile modal
 * @param {HTMLElement} container - The container element to append the UI to
 */
function createAccessibilityOptionsUI(container) {
    // Create accessibility section
    const accessibilitySection = document.createElement('div');
    accessibilitySection.className = 'profile-section';
    
    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = 'Options d\'accessibilité';
    accessibilitySection.appendChild(sectionTitle);
    
    // Get current user profile
    const userProfile = getUserProfile();
    
    // Create options container
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'accessibility-options';
    
    // High Contrast Mode
    const highContrastOption = createToggleOption(
        'high-contrast',
        'Mode Contraste Élevé',
        'Améliore la lisibilité en augmentant le contraste des couleurs',
        userProfile.preferences.highContrast || false,
        toggleHighContrast
    );
    optionsContainer.appendChild(highContrastOption);
    
    // Large Text Mode
    const largeTextOption = createToggleOption(
        'large-text',
        'Texte Agrandi',
        'Augmente la taille du texte pour une meilleure lisibilité',
        userProfile.preferences.largeText || false,
        toggleLargeText
    );
    optionsContainer.appendChild(largeTextOption);
    
    // Dyslexia Font
    const dyslexiaFontOption = createToggleOption(
        'dyslexia-font',
        'Police pour Dyslexie',
        'Utilise une police spéciale pour faciliter la lecture pour les personnes dyslexiques',
        userProfile.preferences.dyslexiaFont || false,
        toggleDyslexiaFont
    );
    optionsContainer.appendChild(dyslexiaFontOption);
    
    // Reduced Motion
    const reducedMotionOption = createToggleOption(
        'reduced-motion',
        'Réduire les Animations',
        'Limite les animations et effets de mouvement',
        userProfile.preferences.reducedMotion || false,
        toggleReducedMotion
    );
    optionsContainer.appendChild(reducedMotionOption);
    
    // Add options to section
    accessibilitySection.appendChild(optionsContainer);
    
    // Add section to container
    container.appendChild(accessibilitySection);
}

/**
 * Creates a toggle option UI element
 * @param {string} id - The option ID
 * @param {string} label - The option label
 * @param {string} description - The option description
 * @param {boolean} isEnabled - Whether the option is enabled
 * @param {Function} toggleFunction - The function to call when toggling
 * @returns {HTMLElement} The toggle option element
 */
function createToggleOption(id, label, description, isEnabled, toggleFunction) {
    const optionContainer = document.createElement('div');
    optionContainer.className = 'option-item';
    
    // Create switch container
    const switchContainer = document.createElement('div');
    switchContainer.className = 'switch-container';
    
    // Create label
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', id);
    labelElement.className = 'option-label';
    
    // Create title and description
    const titleElement = document.createElement('div');
    titleElement.className = 'option-title';
    titleElement.textContent = label;
    
    const descElement = document.createElement('div');
    descElement.className = 'option-description';
    descElement.textContent = description;
    
    labelElement.appendChild(titleElement);
    labelElement.appendChild(descElement);
    
    // Create toggle switch
    const toggleSwitch = document.createElement('div');
    toggleSwitch.className = 'toggle-switch';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = isEnabled;
    checkbox.addEventListener('change', function() {
        toggleFunction(this.checked);
    });
    
    const slider = document.createElement('span');
    slider.className = 'slider';
    
    toggleSwitch.appendChild(checkbox);
    toggleSwitch.appendChild(slider);
    
    // Assemble the option
    switchContainer.appendChild(labelElement);
    switchContainer.appendChild(toggleSwitch);
    optionContainer.appendChild(switchContainer);
    
    return optionContainer;
}

/**
 * Toggles high contrast mode
 * @param {boolean} enabled - Whether to enable high contrast mode
 */
function toggleHighContrast(enabled) {
    const userProfile = getUserProfile();
    userProfile.preferences.highContrast = enabled;
    saveUserProfile();
    
    if (enabled) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
    
    // Add high contrast styles if not already added
    if (enabled && !document.getElementById('high-contrast-styles')) {
        const style = document.createElement('style');
        style.id = 'high-contrast-styles';
        style.textContent = `
            .high-contrast {
                --primary-color: #0066CC;
                --secondary-color: #000000;
                --dark-color: #000000;
                --light-color: #FFFFFF;
                --background-color: #FFFFFF;
                --text-color: #000000;
                --link-color: #0000EE;
                --visited-link-color: #551A8B;
                --border-color: #000000;
            }
            
            .high-contrast * {
                border-color: var(--border-color) !important;
            }
            
            .high-contrast a {
                color: var(--link-color) !important;
                text-decoration: underline !important;
            }
            
            .high-contrast a:visited {
                color: var(--visited-link-color) !important;
            }
            
            .high-contrast button, 
            .high-contrast .btn-primary, 
            .high-contrast .btn-secondary {
                border: 2px solid var(--border-color) !important;
                color: var(--text-color) !important;
                background-color: var(--light-color) !important;
            }
            
            .high-contrast input, 
            .high-contrast textarea, 
            .high-contrast select {
                border: 2px solid var(--border-color) !important;
                background-color: var(--light-color) !important;
                color: var(--text-color) !important;
            }
            
            .high-contrast .progress-bar {
                border: 1px solid var(--border-color) !important;
            }
            
            .high-contrast .progress-fill {
                background-color: var(--primary-color) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Toggles large text mode
 * @param {boolean} enabled - Whether to enable large text mode
 */
function toggleLargeText(enabled) {
    const userProfile = getUserProfile();
    userProfile.preferences.largeText = enabled;
    saveUserProfile();
    
    if (enabled) {
        document.body.classList.add('large-text');
    } else {
        document.body.classList.remove('large-text');
    }
    
    // Add large text styles if not already added
    if (enabled && !document.getElementById('large-text-styles')) {
        const style = document.createElement('style');
        style.id = 'large-text-styles';
        style.textContent = `
            .large-text {
                font-size: 120% !important;
            }
            
            .large-text h1 {
                font-size: 2.4em !important;
            }
            
            .large-text h2 {
                font-size: 2em !important;
            }
            
            .large-text h3 {
                font-size: 1.6em !important;
            }
            
            .large-text p, .large-text li, .large-text label, .large-text input, .large-text button {
                font-size: 1.2em !important;
            }
            
            .large-text button, .large-text .btn-primary, .large-text .btn-secondary {
                padding: 12px 24px !important;
            }
            
            .large-text input, .large-text textarea, .large-text select {
                padding: 12px !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Toggles dyslexia font
 * @param {boolean} enabled - Whether to enable dyslexia font
 */
function toggleDyslexiaFont(enabled) {
    const userProfile = getUserProfile();
    userProfile.preferences.dyslexiaFont = enabled;
    saveUserProfile();
    
    if (enabled) {
        document.body.classList.add('dyslexia-font');
        
        // Load OpenDyslexic font if not already loaded
        if (!document.getElementById('dyslexia-font-link')) {
            const fontLink = document.createElement('link');
            fontLink.id = 'dyslexia-font-link';
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
            document.head.appendChild(fontLink);
        }
    } else {
        document.body.classList.remove('dyslexia-font');
    }
    
    // Add dyslexia font styles if not already added
    if (enabled && !document.getElementById('dyslexia-font-styles')) {
        const style = document.createElement('style');
        style.id = 'dyslexia-font-styles';
        style.textContent = `
            .dyslexia-font * {
                font-family: 'OpenDyslexic', sans-serif !important;
                line-height: 1.5 !important;
                letter-spacing: 0.05em !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Toggles reduced motion
 * @param {boolean} enabled - Whether to enable reduced motion
 */
function toggleReducedMotion(enabled) {
    const userProfile = getUserProfile();
    userProfile.preferences.reducedMotion = enabled;
    saveUserProfile();
    
    if (enabled) {
        document.body.classList.add('reduced-motion');
    } else {
        document.body.classList.remove('reduced-motion');
    }
    
    // Add reduced motion styles if not already added
    if (enabled && !document.getElementById('reduced-motion-styles')) {
        const style = document.createElement('style');
        style.id = 'reduced-motion-styles';
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.001s !important;
                transition-duration: 0.001s !important;
            }
            
            @media (prefers-reduced-motion: reduce) {
                .reduced-motion * {
                    animation-duration: 0.001s !important;
                    transition-duration: 0.001s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Applies all accessibility settings from the user profile
 */
function applyAccessibilitySettings() {
    const userProfile = getUserProfile();
    
    // Apply high contrast if enabled
    if (userProfile.preferences.highContrast) {
        toggleHighContrast(true);
    }
    
    // Apply large text if enabled
    if (userProfile.preferences.largeText) {
        toggleLargeText(true);
    }
    
    // Apply dyslexia font if enabled
    if (userProfile.preferences.dyslexiaFont) {
        toggleDyslexiaFont(true);
    }
    
    // Apply reduced motion if enabled
    if (userProfile.preferences.reducedMotion) {
        toggleReducedMotion(true);
    }
}

/**
 * Initializes accessibility options
 */
function initAccessibilityOptions() {
    // Apply settings from user profile
    applyAccessibilitySettings();
    
    // Add CSS for accessibility options UI
    addAccessibilityStyles();
}

/**
 * Adds CSS styles for accessibility options
 */
function addAccessibilityStyles() {
    // Check if styles already exist
    if (document.getElementById('accessibility-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'accessibility-styles';
    style.textContent = `
        .accessibility-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .option-item {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
        }
        
        .switch-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .option-label {
            flex: 1;
            cursor: pointer;
        }
        
        .option-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .option-description {
            font-size: 0.9em;
            color: #666;
        }
        
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
            top: -10px;
            position: relative;
            z-index: 10;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .slider {
            background-color: var(--primary-color);
        }
        
        input:focus + .slider {
            box-shadow: 0 0 1px var(--primary-color);
        }
        
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        
        /* High contrast mode styles for the toggle itself */
        .high-contrast .slider {
            background-color: #000 !important;
            border: 2px solid #000 !important;
        }
        
        .high-contrast input:checked + .slider {
            background-color: #0066CC !important;
        }
        
        .high-contrast .slider:before {
            background-color: #fff !important;
        }
    `;
    
    document.head.appendChild(style);
}

// Export functions
export {
    createAccessibilityOptionsUI,
    toggleHighContrast,
    toggleLargeText,
    toggleDyslexiaFont,
    toggleReducedMotion,
    applyAccessibilitySettings,
    initAccessibilityOptions
};
