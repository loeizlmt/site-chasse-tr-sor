/**
 * Profile Data Module
 * Handles user profile data structure, loading and saving
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
        highContrast: false,
        largeText: false,
        dyslexiaFont: false,
        reducedMotion: false
    },
    lastVisit: new Date().toISOString()
};

// Current user profile
let userProfile = defaultUserProfile;

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
    return userProfile;
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
 * Resets profile to default
 * @returns {Object} The reset user profile
 */
function resetUserProfile() {
    userProfile = { ...defaultUserProfile };
    saveUserProfile();
    return userProfile;
}

/**
 * Gets the current user profile
 * @returns {Object} The current user profile
 */
function getUserProfile() {
    return userProfile;
}

/**
 * Updates the user profile with new data
 * @param {Object} newData - New data to merge into the profile
 */
function updateUserProfile(newData) {
    userProfile = { ...userProfile, ...newData };
    saveUserProfile();
    return userProfile;
}

// Export functions
export {
    defaultUserProfile,
    loadUserProfile,
    saveUserProfile,
    resetUserProfile,
    getUserProfile,
    updateUserProfile
};
