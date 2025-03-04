/**
 * Profile Themes Module
 * Handles theme selection and application
 */

import { getUserProfile, saveUserProfile } from './profile-data.js';

// Available themes
const availableThemes = [
    { id: 'default', name: 'Défaut', icon: 'fa-palette' },
    { id: 'steampunk', name: 'Steampunk', icon: 'fa-cogs' },
    { id: 'medieval', name: 'Médiéval', icon: 'fa-chess-rook' },
    { id: 'futuristic', name: 'Futuriste', icon: 'fa-rocket' }
];

/**
 * Applies selected theme
 * @param {string} themeId - The ID of the theme to apply
 */
function applyTheme(themeId) {
    // Remove any existing theme classes
    document.body.classList.remove('theme-steampunk', 'theme-medieval', 'theme-futuristic');
    
    // Apply new theme if not default
    if (themeId !== 'default') {
        document.body.classList.add(`theme-${themeId}`);
    }
    
    // Update user profile
    const userProfile = getUserProfile();
    if (userProfile.theme !== themeId) {
        userProfile.theme = themeId;
        saveUserProfile();
    }
}

/**
 * Gets theme by ID
 * @param {string} themeId - The ID of the theme to get
 * @returns {Object|null} The theme object or null if not found
 */
function getThemeById(themeId) {
    return availableThemes.find(theme => theme.id === themeId) || null;
}

/**
 * Creates theme selection UI elements
 * @param {HTMLElement} container - The container to add the UI elements to
 * @param {Function} onUpdate - Callback function when theme is updated
 */
function createThemeSelectionUI(container, onUpdate = null) {
    const userProfile = getUserProfile();
    
    // Create theme section
    const themeSection = document.createElement('div');
    themeSection.className = 'profile-section';
    
    const themeTitle = document.createElement('h3');
    themeTitle.textContent = 'Thème visuel';
    
    const themeOptions = document.createElement('div');
    themeOptions.className = 'theme-options';
    
    availableThemes.forEach(theme => {
        const themeOption = document.createElement('div');
        themeOption.className = `theme-option${theme.id === userProfile.theme ? ' selected' : ''}`;
        themeOption.setAttribute('data-theme', theme.id);
        
        const themeIcon = document.createElement('div');
        themeIcon.className = 'theme-icon';
        themeIcon.innerHTML = `<i class="fas ${theme.icon}"></i>`;
        
        const themeName = document.createElement('span');
        themeName.textContent = theme.name;
        
        themeOption.appendChild(themeIcon);
        themeOption.appendChild(themeName);
        
        themeOption.addEventListener('click', function() {
            document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            applyTheme(theme.id);
            if (onUpdate) onUpdate();
        });
        
        themeOptions.appendChild(themeOption);
    });
    
    themeSection.appendChild(themeTitle);
    themeSection.appendChild(themeOptions);
    
    // Add to container
    container.appendChild(themeSection);
}

/**
 * Updates theme selection in UI
 */
function updateThemeSelection() {
    const userProfile = getUserProfile();
    
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.toggle('selected', opt.getAttribute('data-theme') === userProfile.theme);
    });
    
    // Apply current theme
    applyTheme(userProfile.theme);
}

// Export functions and constants
export {
    availableThemes,
    applyTheme,
    getThemeById,
    createThemeSelectionUI,
    updateThemeSelection
};
