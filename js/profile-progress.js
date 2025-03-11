/**
 * Profile Progress Module
 * Handles user progress tracking (visited pages, completed games, collected fragments)
 */

import { getUserProfile, saveUserProfile } from './profile-data.js';

/**
 * Records a completed game in the user profile
 * @param {string} gameId - The ID of the completed game
 * @param {string} fragmentId - The ID of the collected fragment
 */
function recordCompletedGame(gameId, fragmentId) {
    const userProfile = getUserProfile();
    
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
 * Updates progress display based on user profile
 */
function updateProgressDisplay() {
    const userProfile = getUserProfile();
    
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
 * Synchronizes user profile with existing game state
 */
function syncWithGameState() {
    // Check if gameState exists
    if (typeof window.gameState !== 'undefined') {
        const userProfile = getUserProfile();
        const gameState = window.gameState;
        
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

/**
 * Gets the user's progress
 * @returns {Object} The user's progress
 */
function getUserProgress() {
    const userProfile = getUserProfile();
    return userProfile.progress;
}

/**
 * Resets the user's progress
 */
function resetUserProgress() {
    const userProfile = getUserProfile();
    userProfile.progress = {
        visitedPages: [],
        completedGames: [],
        collectedFragments: []
    };
    saveUserProfile();
    updateProgressDisplay();
}

/**
 * Creates progress display UI elements
 * @param {HTMLElement} container - The container to add the UI elements to
 */
function createProgressDisplayUI(container) {
    const userProfile = getUserProfile();
    
    // Create progress section
    const progressSection = document.createElement('div');
    progressSection.className = 'profile-section';
    
    const progressTitle = document.createElement('h3');
    progressTitle.textContent = 'Progression';
    
    // Create progress stats
    const progressStats = document.createElement('div');
    progressStats.className = 'progress-stats';
    
    // Completed games
    const gamesStats = document.createElement('div');
    gamesStats.className = 'stat-item';
    
    const gamesLabel = document.createElement('span');
    gamesLabel.className = 'stat-label';
    gamesLabel.textContent = 'Mini-jeux complétés:';
    
    const gamesValue = document.createElement('span');
    gamesValue.className = 'stat-value';
    gamesValue.id = 'completed-games';
    gamesValue.textContent = userProfile.progress.completedGames.length;
    
    gamesStats.appendChild(gamesLabel);
    gamesStats.appendChild(gamesValue);
    
    // Quote progress
    const quoteStats = document.createElement('div');
    quoteStats.className = 'stat-item';
    
    const quoteLabel = document.createElement('span');
    quoteLabel.className = 'stat-label';
    quoteLabel.textContent = 'Progression de la citation:';
    
    const quoteValue = document.createElement('span');
    quoteValue.className = 'stat-value';
    quoteValue.id = 'quote-progress';
    const quotePercentage = userProfile.progress.collectedFragments.length > 0 
        ? Math.round((userProfile.progress.collectedFragments.length / 6) * 100) 
        : 0;
    quoteValue.textContent = `${quotePercentage}%`;
    
    quoteStats.appendChild(quoteLabel);
    quoteStats.appendChild(quoteValue);
    
    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressFill.id = 'progress-fill';
    const progressPercentage = userProfile.progress.completedGames.length > 0 
        ? Math.round((userProfile.progress.completedGames.length / 6) * 100) 
        : 0;
    progressFill.style.width = `${progressPercentage}%`;
    
    progressBar.appendChild(progressFill);
    
    // Add all elements to progress stats
    progressStats.appendChild(gamesStats);
    progressStats.appendChild(quoteStats);
    progressStats.appendChild(progressBar);
    
    // Add to progress section
    progressSection.appendChild(progressTitle);
    progressSection.appendChild(progressStats);
    
    // Add to container
    container.appendChild(progressSection);
}


// Export functions
export {
    recordCompletedGame,
    updateProgressDisplay,
    syncWithGameState,
    getUserProgress,
    resetUserProgress,
    createProgressDisplayUI
};
