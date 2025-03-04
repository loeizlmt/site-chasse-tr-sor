/**
 * Profile UI Module
 * Handles user profile UI elements (modal, button, styles)
 */

import { getUserProfile, saveUserProfile } from './profile-data.js';
import { updateAvatarDisplay, createAvatarCustomizationUI } from './profile-avatar.js';
import { createThemeSelectionUI, updateThemeSelection } from './profile-themes.js';
import { createProgressDisplayUI } from './profile-progress.js';
import { createAccessibilityOptionsUI } from './profile-accessibility.js';

// DOM elements
let profileModal;
let usernameInput;
let profileButton;

/**
 * Adds CSS styles for profile elements
 */
function addProfileStyles() {
    // Check if styles already exist
    if (document.getElementById('profile-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'profile-styles';
    style.textContent = `
        .profile-button {
            background: none;
            border: none;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 5px 10px;
            margin-left: 15px;
            border-radius: 20px;
            transition: background-color 0.3s;
        }
        
        .profile-button:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
        
        .avatar-display {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
        }
        
        .avatar-circle {
            border-radius: 50%;
        }
        
        .avatar-square {
            border-radius: 5px;
        }
        
        .avatar-hexagon {
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .avatar-triangle {
            clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }
        
        .username-display {
            margin-right: 10px;
            font-weight: bold;
            color: var(--dark-color);
        }
        
        .profile-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        
        .profile-modal.active {
            display: flex;
        }
        
        .profile-content {
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .profile-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
        
        .profile-header h2 {
            margin: 0;
        }
        
        .close-profile {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--dark-color);
        }
        
        .profile-section {
            margin-bottom: 20px;
        }
        
        .profile-section h3 {
            margin-top: 0;
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        
        .avatar-preview {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 40px;
        }
        
        .avatar-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .option-group {
            margin-bottom: 15px;
        }
        
        .option-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .color-options, .icon-options {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .color-option, .icon-option {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid transparent;
        }
        
        .color-option.selected, .icon-option.selected {
            border-color: var(--dark-color);
        }
        
        .icon-option {
            background-color: #eee;
            color: var(--dark-color);
        }
        
        .theme-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        
        .theme-option {
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            border: 2px solid transparent;
        }
        
        .theme-option.selected {
            border-color: var(--primary-color);
            background-color: rgba(52, 152, 219, 0.1);
        }
        
        .theme-icon {
            margin-right: 10px;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
        }
        
        .profile-actions {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        
        .progress-stats {
            margin-bottom: 15px;
        }
        
        .stat-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .stat-label {
            font-weight: bold;
        }
        
        .progress-bar {
            height: 10px;
            background-color: #eee;
            border-radius: 5px;
            overflow: hidden;
            margin-top: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background-color: var(--primary-color);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        @media (max-width: 767px) {
            .profile-content {
                width: 95%;
                padding: 15px;
            }
            
            .avatar-options {
                grid-template-columns: 1fr;
            }
            
            .theme-options {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Creates profile button in header
 */
function createProfileButton() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Check if button already exists
    if (document.getElementById('profile-button')) return;
    
    const userProfile = getUserProfile();
    
    // Create button
    profileButton = document.createElement('button');
    profileButton.id = 'profile-button';
    profileButton.className = 'profile-button';
    profileButton.setAttribute('aria-label', 'Profil utilisateur');
    
    // Create avatar display
    const avatarDisplay = document.createElement('div');
    avatarDisplay.className = `avatar-display avatar-${userProfile.avatar.shape}`;
    avatarDisplay.style.backgroundColor = userProfile.avatar.color;
    avatarDisplay.innerHTML = `<i class="fas ${userProfile.avatar.icon}"></i>`;
    
    // Add username if available
    if (userProfile.username) {
        const usernameDisplay = document.createElement('span');
        usernameDisplay.className = 'username-display';
        usernameDisplay.textContent = userProfile.username;
        profileButton.appendChild(usernameDisplay);
    }
    
    // Add avatar to button
    profileButton.appendChild(avatarDisplay);
    
    // Add click event
    profileButton.addEventListener('click', openProfileModal);
    
    // Add button to header
    header.appendChild(profileButton);
    
    // Add styles
    addProfileStyles();
}

/**
 * Creates profile modal
 */
function createProfileModal() {
    // Check if modal already exists
    if (document.getElementById('profile-modal')) return;
    
    const userProfile = getUserProfile();
    
    // Create modal container
    profileModal = document.createElement('div');
    profileModal.id = 'profile-modal';
    profileModal.className = 'profile-modal';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'profile-content';
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'profile-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Profil Utilisateur';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-profile';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Fermer');
    closeButton.addEventListener('click', closeProfileModal);
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    // Create username section
    const usernameSection = document.createElement('div');
    usernameSection.className = 'profile-section';
    
    const usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username-input');
    usernameLabel.textContent = 'Nom d\'utilisateur';
    
    usernameInput = document.createElement('input');
    usernameInput.id = 'username-input';
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Entrez votre nom d\'utilisateur';
    usernameInput.value = userProfile.username;
    
    usernameSection.appendChild(usernameLabel);
    usernameSection.appendChild(usernameInput);
    
    // Add username section to modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(usernameSection);
    
    // Create avatar customization UI
    createAvatarCustomizationUI(modalContent);
    
    // Create theme selection UI
    createThemeSelectionUI(modalContent);
    
    // Create progress display UI
    createProgressDisplayUI(modalContent);
    
    // Create accessibility options UI
    createAccessibilityOptionsUI(modalContent);
    
    // Create action buttons
    const actionSection = document.createElement('div');
    actionSection.className = 'profile-actions';
    
    const saveButton = document.createElement('button');
    saveButton.className = 'btn-primary';
    saveButton.textContent = 'Enregistrer';
    saveButton.addEventListener('click', saveProfileChanges);
    
    const resetButton = document.createElement('button');
    resetButton.className = 'btn-secondary';
    resetButton.textContent = 'Réinitialiser';
    resetButton.addEventListener('click', resetProfile);
    
    actionSection.appendChild(resetButton);
    actionSection.appendChild(saveButton);
    
    // Add action section to modal content
    modalContent.appendChild(actionSection);
    
    // Add content to modal
    profileModal.appendChild(modalContent);
    
    // Add modal to body
    document.body.appendChild(profileModal);
    
    // Close modal when clicking outside
    profileModal.addEventListener('click', function(e) {
        if (e.target === profileModal) {
            closeProfileModal();
        }
    });
}

/**
 * Opens profile modal
 */
function openProfileModal() {
    if (!profileModal) {
        createProfileModal();
    }
    
    profileModal.classList.add('active');
    
    // Update fields with current values
    const userProfile = getUserProfile();
    usernameInput.value = userProfile.username;
    
    // Update theme selection
    updateThemeSelection();
}

/**
 * Closes profile modal
 */
function closeProfileModal() {
    if (!profileModal) return;
    profileModal.classList.remove('active');
}

/**
 * Saves profile changes
 */
function saveProfileChanges() {
    const userProfile = getUserProfile();
    
    // Update username
    userProfile.username = usernameInput.value.trim();
    
    // Save to localStorage
    saveUserProfile();
    
    // Update UI
    updateProfileDisplay();
    
    // Close modal
    closeProfileModal();
}

/**
 * Resets profile to default
 */
function resetProfile() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre profil ? Toutes vos préférences seront perdues.')) {
        // Reset profile in profile-data.js
        import('./profile-data.js').then(module => {
            module.resetUserProfile();
            
            // Apply default theme
            import('./profile-themes.js').then(themesModule => {
                themesModule.applyTheme('default');
                
                // Update UI
                updateProfileDisplay();
                
                // Close modal
                closeProfileModal();
            });
        });
    }
}

/**
 * Updates profile display in UI
 */
function updateProfileDisplay() {
    const userProfile = getUserProfile();
    
    // Update avatar display
    updateAvatarDisplay();
    
    // Update username display
    let usernameDisplay = document.querySelector('.username-display');
    if (userProfile.username) {
        if (!usernameDisplay && profileButton) {
            usernameDisplay = document.createElement('span');
            usernameDisplay.className = 'username-display';
            profileButton.insertBefore(usernameDisplay, profileButton.firstChild);
        }
        
        if (usernameDisplay) {
            usernameDisplay.textContent = userProfile.username;
        }
    } else if (usernameDisplay) {
        usernameDisplay.remove();
    }
}

/**
 * Initializes profile UI
 */
function initProfileUI() {
    // Add profile styles
    addProfileStyles();
    
    // Create profile button
    createProfileButton();
}

// Export functions
export {
    addProfileStyles,
    createProfileButton,
    createProfileModal,
    openProfileModal,
    closeProfileModal,
    saveProfileChanges,
    resetProfile,
    updateProfileDisplay,
    initProfileUI
};
