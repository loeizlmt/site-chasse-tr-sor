/**
 * Chasse au Trésor - Mini-Games JavaScript
 * This file contains functionality specific to the mini-games page
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Load mini-games data
    const miniGamesData = await dataLoader.getMiniGames();
    if (!miniGamesData) {
        console.error('Failed to load mini-games data');
        return;
    }
    
    // Load quote fragments data
    const quoteFragmentsData = await dataLoader.getQuoteFragments();
    if (!quoteFragmentsData) {
        console.error('Failed to load quote fragments data');
        return;
    }
    
    // Initialize the mini-games page
    initMiniGames(miniGamesData.games, quoteFragmentsData.fragments);
    
    // Display collected quote fragments
    displayCollectedFragments(quoteFragmentsData.fragments);
});

/**
 * Initializes the mini-games page
 * @param {Array} games - Array of game objects
 * @param {Array} quoteFragments - Array of quote fragment objects
 */
function initMiniGames(games, quoteFragments) {
    const gamesGrid = document.getElementById('games-grid');
    if (!gamesGrid) return;
    
    // Clear the grid
    gamesGrid.innerHTML = '';
    
    // Add game cards to the grid
    games.forEach(game => {
        const gameCard = createGameCard(game, quoteFragments[game.quoteFragmentIndex]);
        gamesGrid.appendChild(gameCard);
        utils.fadeIn(gameCard);
    });
    
    // Add floating icons for decoration
    addGameIllustrations();
}

/**
 * Creates a game card element
 * @param {Object} game - The game object
 * @param {Object} quoteFragment - The quote fragment object
 * @returns {HTMLElement} The game card element
 */
function createGameCard(game, quoteFragment) {
    const isCompleted = gameState.isGameCompleted(game.id);
    
    const gameCard = utils.createElement('div', {
        className: `game-card ${isCompleted ? 'completed' : ''}`,
        'data-game-id': game.id
    });
    
    // Create game image
    const gameImg = utils.createElement('div', {
        className: 'game-img',
        style: `background-image: url(${game.image})`
    });
    
    // Create game content
    const gameContent = utils.createElement('div', {
        className: 'game-content'
    });
    
    // Add game title
    const gameTitle = utils.createElement('h3', {}, game.name);
    gameContent.appendChild(gameTitle);
    
    // Add game description
    const gameDesc = utils.createElement('p', {}, game.description);
    gameContent.appendChild(gameDesc);
    
    // Add game status
    const gameStatus = utils.createElement('div', {
        className: 'game-status'
    });
    
    if (isCompleted) {
        gameStatus.innerHTML = `
            <span class="status-icon completed"><i class="fas fa-check-circle"></i></span>
            <span>Complété - Fragment obtenu</span>
        `;
    } else {
        gameStatus.innerHTML = `
            <span class="status-icon locked"><i class="fas fa-lock"></i></span>
            <span>Non complété</span>
        `;
    }
    
    gameContent.appendChild(gameStatus);
    
    // Add play button
    const playButton = utils.createElement('button', {
        className: 'btn-primary',
        style: 'margin-top: 1rem;'
    }, `${isCompleted ? 'Rejouer' : 'Jouer'}`);
    
    playButton.addEventListener('click', () => {
        // In a real implementation, this would navigate to the game page
        // For this example, we'll simulate completing the game
        simulateGameCompletion(game, quoteFragment);
    });
    
    gameContent.appendChild(playButton);
    
    // Assemble the card
    gameCard.appendChild(gameImg);
    gameCard.appendChild(gameContent);
    
    return gameCard;
}

/**
 * Simulates completing a mini-game (for demonstration purposes)
 * @param {Object} game - The game object
 * @param {Object} quoteFragment - The quote fragment object
 */
function simulateGameCompletion(game, quoteFragment) {
    // Show a confirmation dialog
    const playConfirm = confirm(`Avez-vous joué à "${game.name}" ?`);
    
    if (!playConfirm) return;
    
    // In a real implementation, this would navigate to the game page
    // For this example, we'll simulate completing the game
    setTimeout(() => {
        const wasCompleted = gameState.isGameCompleted(game.id);
        
        if (wasCompleted) {
            // If already completed, just show the fragment
            alert(`Vous avez déjà complété "${game.name}" et obtenu le fragment : "${quoteFragment.text}"`);
            return;
        }
        
        // Ask for the fragment instead of just confirming completion
        const userFragment = prompt(`Félicitations pour avoir terminé "${game.name}" ! 
        
Pour valider votre réussite, veuillez entrer le fragment de citation que vous avez découvert :`);
        
        if (!userFragment || userFragment.trim() === '') {
            alert('Vous devez entrer le fragment de citation pour valider votre réussite.');
            return;
        }
        
        // Normalize both fragments for comparison (remove punctuation, extra spaces, case)
        const normalize = (text) => {
            return text.toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                .replace(/\s+/g, " ")
                .trim();
        };
        
        const normalizedUser = normalize(userFragment);
        const normalizedCorrect = normalize(quoteFragment.text);
        
        // Check if the entered fragment is correct
        if (normalizedUser === normalizedCorrect) {
            // Mark the game as completed and save the quote fragment
            gameState.completeGame(game.id, quoteFragment.text);
            alert(`Parfait ! Vous avez correctement identifié le fragment : "${quoteFragment.text}"`);
            
            // Refresh the page to update the UI
            location.reload();
        } else {
            // Give a hint if the fragment is incorrect
            alert(`Ce n'est pas le bon fragment. Indice : le fragment commence par "${quoteFragment.text.split(' ')[0]}..."`);
        }
    }, 1000);
}

/**
 * Displays the collected quote fragments
 * @param {Array} quoteFragments - Array of quote fragment objects
 */
function displayCollectedFragments(quoteFragments) {
    const quoteContainer = document.getElementById('quote-container');
    if (!quoteContainer) return;
    
    // Clear the container
    quoteContainer.innerHTML = '';
    
    // Get collected fragments
    const collectedFragments = gameState.getCollectedQuoteFragments();
    
    // If no fragments collected, show a message
    if (collectedFragments.length === 0) {
        const emptyMessage = utils.createElement('p', {
            className: 'empty-quote'
        }, 'Vous n\'avez pas encore collecté de fragments de citation. Complétez les mini-jeux pour les obtenir !');
        
        quoteContainer.appendChild(emptyMessage);
        return;
    }
    
    // Create a container for the fragments
    const fragmentsContainer = utils.createElement('div', {
        className: 'fragments-container'
    });
    
    // Add each collected fragment
    collectedFragments.forEach(fragment => {
        const fragmentElement = utils.createElement('div', {
            className: 'quote-fragment'
        }, fragment);
        
        fragmentsContainer.appendChild(fragmentElement);
    });
    
    // Add a hint about the complete quote
    const hintElement = utils.createElement('p', {
        className: 'quote-hint'
    }, `Vous avez collecté ${collectedFragments.length}/6 fragments. ${collectedFragments.length === 6 ? 'Vous pouvez maintenant reconstituer la citation complète !' : 'Continuez à compléter les mini-jeux pour obtenir tous les fragments !'}`);
    
    // Add a link to the solution page if all fragments are collected
    if (collectedFragments.length === 6) {
        const solutionLink = utils.createElement('a', {
            href: 'solution.html',
            className: 'btn-primary',
            style: 'margin-top: 1rem; display: inline-block;'
        }, 'Soumettre la citation complète');
        
        quoteContainer.appendChild(fragmentsContainer);
        quoteContainer.appendChild(hintElement);
        quoteContainer.appendChild(solutionLink);
    } else {
        quoteContainer.appendChild(fragmentsContainer);
        quoteContainer.appendChild(hintElement);
    }
}

/**
 * Adds decorative illustrations to the games page
 */
function addGameIllustrations() {
    // This function is implemented in game-illustrations.js
    if (typeof createGameIllustrations === 'function') {
        createGameIllustrations();
    }
}

// Add additional CSS for the mini-games page
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .fragments-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .quote-fragment {
            background-color: var(--accent-color);
            color: var(--dark-color);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: bold;
            text-align: center;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .quote-fragment:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .quote-hint {
            margin-top: 1.5rem;
            font-style: italic;
            text-align: center;
        }
        
        .empty-quote {
            background-color: var(--light-color);
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            color: #6c757d;
        }
        
        .game-card {
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .game-card.completed {
            border-left: 5px solid var(--success-color);
        }
        
        .game-card .game-img {
            height: 200px;
            background-size: cover;
            background-position: center;
            transition: transform 0.5s;
        }
        
        .game-card:hover .game-img {
            transform: scale(1.05);
        }
    `;
    
    document.head.appendChild(style);
});
