/**
 * Chasse au Trésor - Solution JavaScript
 * This file contains functionality specific to the solution page
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Load quote fragments data
    const quoteFragmentsData = await dataLoader.getQuoteFragments();
    if (!quoteFragmentsData) {
        console.error('Failed to load quote fragments data');
        return;
    }
    
    // Initialize the solution page
    initSolutionPage(quoteFragmentsData);
});

/**
 * Initializes the solution page
 * @param {Object} quoteData - The quote data object
 */
function initSolutionPage(quoteData) {
    // Get DOM elements
    const quoteInput = document.getElementById('quote-input');
    const submitQuoteBtn = document.getElementById('submit-quote');
    const showFragmentsBtn = document.getElementById('show-fragments');
    const hideFragmentsBtn = document.getElementById('hide-fragments');
    const quoteResult = document.getElementById('quote-result');
    const collectedFragments = document.getElementById('collected-fragments');
    const fragmentsList = document.getElementById('fragments-list');
    const finalChallenge = document.getElementById('final-challenge');
    
    // Set up event listeners
    if (submitQuoteBtn) {
        submitQuoteBtn.addEventListener('click', () => {
            verifyQuote(quoteInput.value, quoteData.completeQuote);
        });
    }
    
    if (showFragmentsBtn) {
        showFragmentsBtn.addEventListener('click', () => {
            showFragments();
        });
    }
    
    if (hideFragmentsBtn) {
        hideFragmentsBtn.addEventListener('click', () => {
            hideFragments();
        });
    }
    
    // Display collected fragments
    displayCollectedFragments(quoteData.fragments);
    
    // Add background pattern
    addBackgroundPattern();
    
    /**
     * Verifies the submitted quote
     * @param {string} submittedQuote - The quote submitted by the user
     * @param {string} completeQuote - The complete quote to compare against
     */
    function verifyQuote(submittedQuote, completeQuote) {
        if (!submittedQuote.trim()) {
            showResult(false, 'Veuillez entrer une citation.');
            return;
        }
        
        // Normalize both quotes for comparison (remove punctuation, extra spaces, case)
        const normalize = (text) => {
            return text.toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                .replace(/\s+/g, " ")
                .trim();
        };
        
        const normalizedSubmitted = normalize(submittedQuote);
        const normalizedComplete = normalize(completeQuote);
        
        const isCorrect = normalizedSubmitted === normalizedComplete;
        
        if (isCorrect) {
            showResult(true, 'Félicitations ! Vous avez correctement reconstitué la citation.');
            showFinalChallenge();
        } else {
            showResult(false, 'La citation n\'est pas correcte. Vérifiez les fragments et réessayez.');
        }
    }
    
    /**
     * Shows the result of the quote verification
     * @param {boolean} isCorrect - Whether the quote is correct
     * @param {string} message - The message to display
     */
    function showResult(isCorrect, message) {
        if (!quoteResult) return;
        
        quoteResult.className = isCorrect ? 'quote-result success' : 'quote-result error';
        quoteResult.innerHTML = `
            <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            <p>${message}</p>
        `;
        
        quoteResult.classList.remove('hidden');
        utils.fadeIn(quoteResult);
    }
    
    /**
     * Shows the collected fragments
     */
    function showFragments() {
        if (!collectedFragments) return;
        
        collectedFragments.classList.remove('hidden');
        utils.fadeIn(collectedFragments);
    }
    
    /**
     * Hides the collected fragments
     */
    function hideFragments() {
        if (!collectedFragments) return;
        
        collectedFragments.classList.add('hidden');
    }
    
    /**
     * Shows the final challenge section
     */
    function showFinalChallenge() {
        if (!finalChallenge) return;
        
        finalChallenge.classList.remove('hidden');
        utils.fadeIn(finalChallenge);
        
        // Scroll to the final challenge section
        setTimeout(() => {
            finalChallenge.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
    
    /**
     * Displays the collected fragments
     * @param {Array} fragments - Array of fragment objects
     */
    function displayCollectedFragments(fragments) {
        if (!fragmentsList) return;
        
        // Clear the list
        fragmentsList.innerHTML = '';
        
        // Get collected fragments from game state
        const collectedFragments = gameState.getCollectedQuoteFragments();
        const collectedIds = gameState.completedGames;
        
        // If no fragments collected, show a message
        if (collectedFragments.length === 0) {
            fragmentsList.innerHTML = '<p class="empty-fragments">Vous n\'avez pas encore collecté de fragments de citation.</p>';
            return;
        }
        
        // Create a list of fragments
        const fragmentsUl = document.createElement('ul');
        fragmentsUl.className = 'fragments-list';
        
        // Add each collected fragment
        fragments.forEach((fragment, index) => {
            const gameId = getGameIdByFragmentIndex(index);
            const isCollected = collectedIds.includes(gameId);
            
            const fragmentLi = document.createElement('li');
            fragmentLi.className = isCollected ? 'collected' : 'missing';
            
            if (isCollected) {
                fragmentLi.innerHTML = `
                    <span class="fragment-icon"><i class="fas fa-check-circle"></i></span>
                    <span class="fragment-text">${fragment.text}</span>
                `;
            } else {
                fragmentLi.innerHTML = `
                    <span class="fragment-icon"><i class="fas fa-lock"></i></span>
                    <span class="fragment-text">Fragment non découvert</span>
                `;
            }
            
            fragmentsUl.appendChild(fragmentLi);
        });
        
        fragmentsList.appendChild(fragmentsUl);
    }
    
    /**
     * Gets the game ID by fragment index
     * @param {number} index - The index of the fragment
     * @returns {string} The game ID
     */
    function getGameIdByFragmentIndex(index) {
        const gameIds = ['puzzle', 'quiz', 'memory', 'wordsearch', 'hangman', 'riddle'];
        return gameIds[index] || '';
    }
}

/**
 * Adds a decorative background pattern to the solution page
 */
function addBackgroundPattern() {
    // This function is implemented in solution-pattern.js
    if (typeof createSolutionPattern === 'function') {
        createSolutionPattern();
    }
}

// Add additional CSS for the solution page
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .quote-submission {
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }
        
        .quote-result {
            margin-top: 1.5rem;
            padding: 1rem;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .quote-result.success {
            background-color: #d4edda;
            color: #155724;
        }
        
        .quote-result.error {
            background-color: #f8d7da;
            color: #721c24;
        }
        
        .quote-result i {
            font-size: 1.5rem;
        }
        
        .collected-fragments {
            background-color: var(--light-color);
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
        }
        
        .fragments-list {
            list-style: none;
            padding: 0;
            margin: 1.5rem 0;
        }
        
        .fragments-list li {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            margin-bottom: 0.5rem;
            border-radius: 5px;
            transition: transform 0.3s;
        }
        
        .fragments-list li.collected {
            background-color: #d4edda;
            color: #155724;
        }
        
        .fragments-list li.missing {
            background-color: #f8f9fa;
            color: #6c757d;
        }
        
        .fragments-list li:hover {
            transform: translateX(5px);
        }
        
        .fragment-icon {
            font-size: 1.2rem;
        }
        
        .fragment-text {
            font-weight: 500;
        }
        
        .empty-fragments {
            text-align: center;
            color: #6c757d;
            padding: 1rem;
        }
        
        .final-challenge {
            background-color: var(--light-color);
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .challenge-intro {
            margin-bottom: 1.5rem;
        }
        
        .form-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        .hidden {
            display: none;
        }
    `;
    
    document.head.appendChild(style);
});
