/**
 * User Profile and Customization
 * This script handles user profile, themes, and avatar customization
 */

// User profile object structure
const defaultUserProfile = {
    username: '',
    theme: 'default',
    avatar: {
        shape: 'circle',
        color: '#3498db',
        icon: 'fa-user'
    },
    progress: {
        visitedPages: [],
        completedGames: [],
        collectedFragments: []
    },
    preferences: {
        soundEnabled: true,
        animationsEnabled: true,
        highContrast: false
    },
    lastVisit: new Date().toISOString()
};

// Available themes
const availableThemes = [
    { id: 'default', name: 'Défaut', icon: 'fa-palette' },
    { id: 'steampunk', name: 'Steampunk', icon: 'fa-cogs' },
    { id: 'medieval', name: 'Médiéval', icon: 'fa-chess-rook' },
    { id: 'futuristic', name: 'Futuriste', icon: 'fa-rocket' }
];

// Available avatar shapes
const avatarShapes = ['circle', 'square', 'hexagon', 'triangle'];

// Available avatar colors
const avatarColors = [
    '#3498db', // Blue
    '#e74c3c', // Red
    '#2ecc71', // Green
    '#f1c40f', // Yellow
    '#9b59b6', // Purple
    '#e67e22', // Orange
    '#1abc9c', // Turquoise
    '#34495e'  // Dark Blue
];

// Available avatar icons
const avatarIcons = [
    'fa-user',
    'fa-user-ninja',
    'fa-user-astronaut',
    'fa-user-secret',
    'fa-user-graduate',
    'fa-user-tie',
    'fa-cat',
    'fa-dog',
    'fa-dragon',
    'fa-robot'
];

// Initialize user profile
let userProfile = defaultUserProfile;

// DOM elements
let profileModal;
let usernameInput;
let themeSelector;
let avatarShapeSelector;
let avatarColorSelector;
let avatarIconSelector;
let avatarPreview;
let profileButton;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load user profile from localStorage
    loadUserProfile();
    
    // Apply current theme
    applyTheme(userProfile.theme);
    
    // Create profile button in header
    createProfileButton();
    
    // Create profile modal
    createProfileModal();
    
    // Synchronize with existing game state
    syncWithGameState();
});

/**
 * Loads user profile from localStorage
 */
function loadUserProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        try {
            userProfile = JSON.parse(savedProfile);
            console.log('User profile loaded:', userProfile);
        } catch (e) {
            console.error('Error parsing user profile:', e);
            userProfile = defaultUserProfile;
        }
    } else {
        console.log('No user profile found, using default');
        userProfile = defaultUserProfile;
    }
}

/**
 * Saves user profile to localStorage
 */
function saveUserProfile() {
    userProfile.lastVisit = new Date().toISOString();
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    console.log('User profile saved:', userProfile);
}

/**
 * Creates profile button in header
 */
function createProfileButton() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Check if button already exists
    if (document.getElementById('profile-button')) return;
    
    // Create button
    profileButton = document.createElement('button');
    profileButton.id = 'profile-button';
    profileButton.className = 'profile-button';
    profileButton.setAttribute('aria-label', 'Profil utilisateur');
    
    // Create avatar display
    const avatarDisplay = document.createElement('div');
    avatarDisplay.className = 'avatar-display';
    avatarDisplay.style.backgroundColor = userProfile.avatar.color;
    avatarDisplay.innerHTML = `<i class="fas ${userProfile.avatar.icon}"></i>`;
    
    // Add shape class
    avatarDisplay.classList.add(`avatar-${userProfile.avatar.shape}`);
    
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
 * Adds CSS styles for profile elements
 */
function addProfileStyles() {
    const style = document.createElement('style');
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
            color: var(--primary-color);
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
            background-color: var(--light-color);
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
 * Creates profile modal
 */
function createProfileModal() {
    // Check if modal already exists
    if (document.getElementById('profile-modal')) return;
    
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
    
    // Create avatar section
    const avatarSection = document.createElement('div');
    avatarSection.className = 'profile-section';
    
    const avatarTitle = document.createElement('h3');
    avatarTitle.textContent = 'Personnalisation de l\'avatar';
    
    // Avatar preview
    avatarPreview = document.createElement('div');
    avatarPreview.className = `avatar-preview avatar-${userProfile.avatar.shape}`;
    avatarPreview.style.backgroundColor = userProfile.avatar.color;
    avatarPreview.innerHTML = `<i class="fas ${userProfile.avatar.icon}"></i>`;
    
    // Avatar options
    const avatarOptions = document.createElement('div');
    avatarOptions.className = 'avatar-options';
    
    // Shape options
    const shapeGroup = document.createElement('div');
    shapeGroup.className = 'option-group';
    
    const shapeLabel = document.createElement('label');
    shapeLabel.textContent = 'Forme';
    
    avatarShapeSelector = document.createElement('select');
    avatarShapeSelector.id = 'avatar-shape';
    
    avatarShapes.forEach(shape => {
        const option = document.createElement('option');
        option.value = shape;
        option.textContent = shape.charAt(0).toUpperCase() + shape.slice(1);
        if (shape === userProfile.avatar.shape) {
            option.selected = true;
        }
        avatarShapeSelector.appendChild(option);
    });
    
    avatarShapeSelector.addEventListener('change', updateAvatarPreview);
    
    shapeGroup.appendChild(shapeLabel);
    shapeGroup.appendChild(avatarShapeSelector);
    
    // Color options
    const colorGroup = document.createElement('div');
    colorGroup.className = 'option-group';
    
    const colorLabel = document.createElement('label');
    colorLabel.textContent = 'Couleur';
    
    const colorOptions = document.createElement('div');
    colorOptions.className = 'color-options';
    
    avatarColors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = `color-option${color === userProfile.avatar.color ? ' selected' : ''}`;
        colorOption.style.backgroundColor = color;
        colorOption.setAttribute('data-color', color);
        colorOption.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            userProfile.avatar.color = color;
            updateAvatarPreview();
        });
        
        colorOptions.appendChild(colorOption);
    });
    
    colorGroup.appendChild(colorLabel);
    colorGroup.appendChild(colorOptions);
    
    // Icon options
    const iconGroup = document.createElement('div');
    iconGroup.className = 'option-group';
    
    const iconLabel = document.createElement('label');
    iconLabel.textContent = 'Icône';
    
    const iconOptions = document.createElement('div');
    iconOptions.className = 'icon-options';
    
    avatarIcons.forEach(icon => {
        const iconOption = document.createElement('div');
        iconOption.className = `icon-option${icon === userProfile.avatar.icon ? ' selected' : ''}`;
        iconOption.innerHTML = `<i class="fas ${icon}"></i>`;
        iconOption.setAttribute('data-icon', icon);
        iconOption.addEventListener('click', function() {
            document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            userProfile.avatar.icon = icon;
            updateAvatarPreview();
        });
        
        iconOptions.appendChild(iconOption);
    });
    
    iconGroup.appendChild(iconLabel);
    iconGroup.appendChild(iconOptions);
    
    // Add all avatar options
    avatarOptions.appendChild(shapeGroup);
    avatarOptions.appendChild(colorGroup);
    avatarOptions.appendChild(iconGroup);
    
    avatarSection.appendChild(avatarTitle);
    avatarSection.appendChild(avatarPreview);
    avatarSection.appendChild(avatarOptions);
    
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
            userProfile.theme = theme.id;
            applyTheme(theme.id);
        });
        
        themeOptions.appendChild(themeOption);
    });
    
    themeSection.appendChild(themeTitle);
    themeSection.appendChild(themeOptions);
    
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
    
    // Assemble modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(usernameSection);
    modalContent.appendChild(avatarSection);
    modalContent.appendChild(themeSection);
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
 * Updates avatar preview based on current selections
 */
function updateAvatarPreview() {
    if (!avatarPreview) return;
    
    // Update shape
    userProfile.avatar.shape = avatarShapeSelector.value;
    avatarPreview.className = `avatar-preview avatar-${userProfile.avatar.shape}`;
    
    // Update color and icon
    avatarPreview.style.backgroundColor = userProfile.avatar.color;
    avatarPreview.innerHTML = `<i class="fas ${userProfile.avatar.icon}"></i>`;
}

/**
 * Opens profile modal
 */
function openProfileModal() {
    if (!profileModal) return;
    profileModal.classList.add('active');
    
    // Update fields with current values
    usernameInput.value = userProfile.username;
    
    // Update avatar preview
    updateAvatarPreview();
    
    // Update theme selection
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.toggle('selected', opt.getAttribute('data-theme') === userProfile.theme);
    });
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
        userProfile = { ...defaultUserProfile };
        saveUserProfile();
        applyTheme('default');
        updateProfileDisplay();
        closeProfileModal();
    }
}

/**
 * Updates profile display in UI
 */
function updateProfileDisplay() {
    // Update avatar display
    const avatarDisplay = document.querySelector('.avatar-display');
    if (avatarDisplay) {
        avatarDisplay.style.backgroundColor = userProfile.avatar.color;
        avatarDisplay.innerHTML = `<i class="fas ${userProfile.avatar.icon}"></i>`;
        avatarDisplay.className = `avatar-display avatar-${userProfile.avatar.shape}`;
    }
    
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
}

/**
 * Updates progress display based on user profile
 */
function updateProgressDisplay() {
    // Update completed games count
    const completedGamesElement = document.getElementById('completed-games');
    if (completedGamesElement) {
        completedGamesElement.textContent = userProfile.progress.completedGames.length;
    }
    
    // Update quote progress
    const quoteProgressElement = document.getElementById('quote-progress');
    if (quoteProgressElement) {
        const progressPercentage = userProfile.progress.collectedFragments.length > 0 
            ? Math.round((userProfile.progress.collectedFragments.length / 6) * 100) 
            : 0;
        quoteProgressElement.textContent = progressPercentage;
    }
    
    // Update progress bar
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const progressPercentage = userProfile.progress.completedGames.length > 0 
            ? Math.round((userProfile.progress.completedGames.length / 6) * 100) 
            : 0;
        progressFill.style.width = `${progressPercentage}%`;
    }
}

/**
 * Records a completed game in the user profile
 * @param {string} gameId - The ID of the completed game
 * @param {string} fragmentId - The ID of the collected fragment
 */
function recordCompletedGame(gameId, fragmentId) {
    // Add game to completed games if not already there
    if (!userProfile.progress.completedGames.includes(gameId)) {
        userProfile.progress.completedGames.push(gameId);
    }
    
    // Add fragment to collected fragments if not already there
    if (fragmentId && !userProfile.progress.collectedFragments.includes(fragmentId)) {
        userProfile.progress.collectedFragments.push(fragmentId);
    }
    
    // Save profile
    saveUserProfile();
    
    // Update progress display
    updateProgressDisplay();
}

/**
 * Records a visited page in the user profile
 * @param {string} pageUrl - The URL of the visited page
 */
function recordVisitedPage(pageUrl) {
    // Add page to visited pages if not already there
    if (!userProfile.progress.visitedPages.includes(pageUrl)) {
        userProfile.progress.visitedPages.push(pageUrl);
    }
    
    // Save profile
    saveUserProfile();
}

// Record current page visit
recordVisitedPage(window.location.pathname);

/**
 * Synchronizes user profile with existing game state
 */
function syncWithGameState() {
    // Check if gameState exists
    if (typeof gameState !== 'undefined') {
        // Import existing progress from gameState
        if (gameState.completedGames && gameState.completedGames.length > 0) {
            // Update user profile with completed games from gameState
            gameState.completedGames.forEach(gameId => {
                if (!userProfile.progress.completedGames.includes(gameId)) {
                    userProfile.progress.completedGames.push(gameId);
                }
            });
            
            // Update user profile with quote fragments from gameState
            if (gameState.quoteFragments) {
                Object.keys(gameState.quoteFragments).forEach(gameId => {
                    const fragment = gameState.quoteFragments[gameId];
                    if (fragment && !userProfile.progress.collectedFragments.includes(fragment)) {
                        userProfile.progress.collectedFragments.push(fragment);
                    }
                });
            }
            
            // Save updated profile
            saveUserProfile();
        }
        
        // Set up listeners for gameState changes
        const originalCompleteGame = gameState.completeGame;
        gameState.completeGame = function(gameId, quoteFragment) {
            // Call original method
            const result = originalCompleteGame.call(gameState, gameId, quoteFragment);
            
            // Update user profile
            recordCompletedGame(gameId, quoteFragment);
            
            return result;
        };
        
        const originalReset = gameState.reset;
        gameState.reset = function() {
            // Call original method
            originalReset.call(gameState);
            
            // Reset progress in user profile
            userProfile.progress.completedGames = [];
            userProfile.progress.collectedFragments = [];
            saveUserProfile();
            
            // Update UI
            updateProgressDisplay();
        };
        
        // Update progress display
        updateProgressDisplay();
    }
}

// Export functions for use in other scripts
window.userProfileManager = {
    getUserProfile: () => userProfile,
    recordCompletedGame,
    recordVisitedPage,
    applyTheme,
    syncWithGameState
};
