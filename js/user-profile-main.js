/**
 * User Profile Main Module
 * Main entry point for user profile functionality
 * Coordinates all profile-related modules
 */

import { loadUserProfile, saveUserProfile } from './profile-data.js';
import { updateAvatarDisplay } from './profile-avatar.js';
import { applyTheme } from './profile-themes.js';
import { syncWithGameState, recordCompletedGame } from './profile-progress.js';
import { initProfileUI, updateProfileDisplay } from './profile-ui.js';
import { initAccessibilityOptions, applyAccessibilitySettings } from './profile-accessibility.js';

/**
 * Initialize user profile system
 */
function initUserProfile() {
    // Load user profile from localStorage
    const userProfile = loadUserProfile();
    
    // Apply current theme
    applyTheme(userProfile.theme);
    
    // Initialize profile UI
    initProfileUI();
    
    // Initialize accessibility options
    initAccessibilityOptions();
    
    // Synchronize with existing game state
    syncWithGameState();
    
    
    console.log('User profile system initialized');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initUserProfile);

// Export functions for use in other scripts
window.userProfileManager = {
    getUserProfile: () => import('./profile-data.js').then(module => module.getUserProfile()),
    recordCompletedGame,
    applyTheme,
    syncWithGameState,
    updateProfileDisplay,
    toggleAccessibility: {
        highContrast: (enabled) => import('./profile-accessibility.js').then(module => module.toggleHighContrast(enabled)),
        largeText: (enabled) => import('./profile-accessibility.js').then(module => module.toggleLargeText(enabled)),
        dyslexiaFont: (enabled) => import('./profile-accessibility.js').then(module => module.toggleDyslexiaFont(enabled)),
        reducedMotion: (enabled) => import('./profile-accessibility.js').then(module => module.toggleReducedMotion(enabled))
    }
};

// Export functions for module use
export {
    initUserProfile
};
