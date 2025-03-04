/**
 * Profile Avatar Module
 * Handles avatar customization options and preview
 */

import { getUserProfile, saveUserProfile } from './profile-data.js';

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

// DOM elements
let avatarPreview;
let avatarShapeSelector;

/**
 * Updates avatar preview based on current selections
 */
function updateAvatarPreview() {
    if (!avatarPreview) return;
    
    const userProfile = getUserProfile();
    
    // Update shape
    if (avatarShapeSelector) {
        userProfile.avatar.shape = avatarShapeSelector.value;
    }
    
    avatarPreview.className = `avatar-preview avatar-${userProfile.avatar.shape}`;
    
    // Update color and icon
    avatarPreview.style.backgroundColor = userProfile.avatar.color;
    avatarPreview.innerHTML = `<i class="fas ${userProfile.avatar.icon}"></i>`;
}

/**
 * Updates avatar display in UI
 */
function updateAvatarDisplay() {
    const userProfile = getUserProfile();
    
    // Update avatar display
    const avatarDisplay = document.querySelector('.avatar-display');
    if (avatarDisplay) {
        avatarDisplay.style.backgroundColor = userProfile.avatar.color;
        avatarDisplay.innerHTML = `<i class="fas ${userProfile.avatar.icon}"></i>`;
        avatarDisplay.className = `avatar-display avatar-${userProfile.avatar.shape}`;
    }
}

/**
 * Sets the avatar shape
 * @param {string} shape - The shape to set
 */
function setAvatarShape(shape) {
    if (!avatarShapes.includes(shape)) return;
    
    const userProfile = getUserProfile();
    userProfile.avatar.shape = shape;
    saveUserProfile();
    updateAvatarPreview();
    updateAvatarDisplay();
}

/**
 * Sets the avatar color
 * @param {string} color - The color to set (hex code)
 */
function setAvatarColor(color) {
    if (!avatarColors.includes(color)) return;
    
    const userProfile = getUserProfile();
    userProfile.avatar.color = color;
    saveUserProfile();
    updateAvatarPreview();
    updateAvatarDisplay();
}

/**
 * Sets the avatar icon
 * @param {string} icon - The icon to set (Font Awesome class)
 */
function setAvatarIcon(icon) {
    if (!avatarIcons.includes(icon)) return;
    
    const userProfile = getUserProfile();
    userProfile.avatar.icon = icon;
    saveUserProfile();
    updateAvatarPreview();
    updateAvatarDisplay();
}

/**
 * Creates avatar customization UI elements
 * @param {HTMLElement} container - The container to add the UI elements to
 * @param {Function} onUpdate - Callback function when avatar is updated
 */
function createAvatarCustomizationUI(container, onUpdate = null) {
    const userProfile = getUserProfile();
    
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
    
    avatarShapeSelector.addEventListener('change', () => {
        setAvatarShape(avatarShapeSelector.value);
        if (onUpdate) onUpdate();
    });
    
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
            setAvatarColor(color);
            if (onUpdate) onUpdate();
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
            setAvatarIcon(icon);
            if (onUpdate) onUpdate();
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
    
    // Add to container
    container.appendChild(avatarSection);
    
    return {
        updatePreview: updateAvatarPreview,
        updateDisplay: updateAvatarDisplay
    };
}

// Export functions and constants
export {
    avatarShapes,
    avatarColors,
    avatarIcons,
    updateAvatarPreview,
    updateAvatarDisplay,
    setAvatarShape,
    setAvatarColor,
    setAvatarIcon,
    createAvatarCustomizationUI
};
