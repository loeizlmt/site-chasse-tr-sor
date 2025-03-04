/**
 * Chasse au Trésor - Main JavaScript
 * This file contains common functionality used across the site
 */

// Data loading functions
const dataLoader = {
    // Cache for loaded data
    cache: {},
    
    // Load data from a JSON file
    async loadData(filePath) {
        // Check if data is already cached
        if (this.cache[filePath]) {
            return this.cache[filePath];
        }
        
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load data from ${filePath}: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the data
            this.cache[filePath] = data;
            
            return data;
        } catch (error) {
            console.error(`Error loading data from ${filePath}:`, error);
            return null;
        }
    },
    
    // Get quote fragments data
    async getQuoteFragments() {
        return await this.loadData('data/quote-fragments.json');
    },
    
    // Get virtual visits data
    async getVirtualVisits() {
        return await this.loadData('data/virtual-visits.json');
    },
    
    // Get mini-games data
    async getMiniGames() {
        return await this.loadData('data/mini-games.json');
    },
    
    // Get music clips data
    async getMusicClips() {
        return await this.loadData('data/music-clips.json');
    },
    
    // Get email info data
    async getEmailInfo() {
        return await this.loadData('data/email-info.json');
    },
    
    // Get music clues data
    async getMusicClues() {
        return await this.loadData('data/music-clues.json');
    },
    
    // Get final instructions data
    async getFinalInstructions() {
        return await this.loadData('data/final-instructions.json');
    }
};

// Game state management
const gameState = {
    // Default state
    completedGames: [],
    quoteFragments: {},
    currentVisit: null,
    finalSubmission: null,
    
    // Initialize game state from localStorage or defaults
    init() {
        const savedState = localStorage.getItem('chasseTresor');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            this.completedGames = parsedState.completedGames || [];
            this.quoteFragments = parsedState.quoteFragments || {};
            this.currentVisit = parsedState.currentVisit;
            this.finalSubmission = parsedState.finalSubmission;
        }
        this.updateUI();
    },
    
    // Save current state to localStorage
    save() {
        const stateToSave = {
            completedGames: this.completedGames,
            quoteFragments: this.quoteFragments,
            currentVisit: this.currentVisit,
            finalSubmission: this.finalSubmission
        };
        localStorage.setItem('chasseTresor', JSON.stringify(stateToSave));
        this.updateUI();
    },
    
    // Reset all progress
    reset() {
        this.completedGames = [];
        this.quoteFragments = {};
        this.currentVisit = null;
        this.finalSubmission = null;
        localStorage.removeItem('chasseTresor');
        this.updateUI();
    },
    
    // Mark a game as completed and save the quote fragment
    completeGame(gameId, quoteFragment) {
        if (!this.completedGames.includes(gameId)) {
            this.completedGames.push(gameId);
            this.quoteFragments[gameId] = quoteFragment;
            this.save();
            return true;
        }
        return false;
    },
    
    // Check if a game is completed
    isGameCompleted(gameId) {
        return this.completedGames.includes(gameId);
    },
    
    // Get all collected quote fragments
    getCollectedQuoteFragments() {
        return Object.values(this.quoteFragments);
    },
    
    // Get the complete quote (all fragments joined)
    getCompleteQuote() {
        const fragments = this.getCollectedQuoteFragments();
        return fragments.join(' ');
    },
    
    // Set the current virtual visit
    setCurrentVisit(visitId) {
        this.currentVisit = visitId;
        this.save();
    },
    
    // Update UI elements based on current state
    updateUI() {
        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const progressPercentage = (this.completedGames.length / 6) * 100;
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        // Update completed games counter
        const completedGamesElement = document.getElementById('completed-games');
        if (completedGamesElement) {
            completedGamesElement.textContent = this.completedGames.length;
        }
        
        // Update quote progress
        const quoteProgressElement = document.getElementById('quote-progress');
        if (quoteProgressElement) {
            const quotePercentage = (this.completedGames.length / 6) * 100;
            quoteProgressElement.textContent = quotePercentage;
        }
    }
};

// Initialize game state when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize game state
    gameState.init();
    
    // Set up reset button functionality
    const resetButton = document.getElementById('reset-progress');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir réinitialiser toute votre progression ? Cette action est irréversible.')) {
                gameState.reset();
                alert('Progression réinitialisée avec succès.');
                
                // Redirect to home page if not already there
                if (window.location.pathname !== '/index.html' && 
                    window.location.pathname !== '/' && 
                    window.location.pathname !== '') {
                    window.location.href = 'index.html';
                }
            }
        });
    }
    
    // Sync with user profile if available
    if (typeof window.userProfileManager !== 'undefined' && 
        typeof window.userProfileManager.syncWithGameState === 'function') {
        window.userProfileManager.syncWithGameState();
    }
    
    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Utility functions
const utils = {
    // Shuffle array (Fisher-Yates algorithm)
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    
    // Generate random number between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Format time (seconds) to MM:SS
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    
    // Create element with attributes and content
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        // Set attributes
        for (const [key, value] of Object.entries(attributes)) {
            if (key === 'className') {
                element.className = value;
            } else {
                element.setAttribute(key, value);
            }
        }
        
        // Set content
        if (content) {
            element.innerHTML = content;
        }
        
        return element;
    },
    
    // Add fade-in animation to element
    fadeIn(element) {
        element.classList.add('fade-in');
    }
};

// Quote data - The complete citation that students need to reconstruct
const quoteData = {
    // Each game provides a fragment of this quote
    fragments: [
        "L'éducation est",
        "l'arme la plus puissante",
        "que vous puissiez utiliser",
        "pour changer",
        "le monde.",
        "- Nelson Mandela"
    ],
    
    // The complete quote for verification
    completeQuote: "L'éducation est l'arme la plus puissante que vous puissiez utiliser pour changer le monde. - Nelson Mandela",
    
    // Verify if a submitted quote matches the complete quote (ignoring case, spaces, punctuation)
    verifyQuote(submittedQuote) {
        // Normalize both quotes for comparison (remove punctuation, extra spaces, case)
        const normalize = (text) => {
            return text.toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                .replace(/\s+/g, " ")
                .trim();
        };
        
        const normalizedSubmitted = normalize(submittedQuote);
        const normalizedComplete = normalize(this.completeQuote);
        
        return normalizedSubmitted === normalizedComplete;
    }
};

// Virtual visits data
const visitsData = {
    visits: [
        {
            id: 'entrance',
            name: 'Entrée du Lycée',
            url: 'https://www.example.com/visite-virtuelle/entree',
            description: 'Découvrez l\'entrée principale du lycée Jean Prévost.'
        },
        {
            id: 'library',
            name: 'CDI',
            url: 'https://www.example.com/visite-virtuelle/cdi',
            description: 'Explorez le Centre de Documentation et d\'Information.'
        },
        {
            id: 'science',
            name: 'Laboratoires de Sciences',
            url: 'https://www.example.com/visite-virtuelle/sciences',
            description: 'Visitez les laboratoires de physique, chimie et SVT.'
        },
        {
            id: 'sports',
            name: 'Installations Sportives',
            url: 'https://www.example.com/visite-virtuelle/sport',
            description: 'Découvrez le gymnase et les terrains de sport.'
        },
        {
            id: 'cafeteria',
            name: 'Cantine et Foyer',
            url: 'https://www.example.com/visite-virtuelle/foyer',
            description: 'Explorez les espaces de restauration et de détente.'
        },
        {
            id: 'arts',
            name: 'Salles d\'Arts',
            url: 'https://www.example.com/visite-virtuelle/arts',
            description: 'Visitez les salles dédiées aux arts plastiques et à la musique.'
        }
    ],
    
    // Get visit by ID
    getVisitById(id) {
        return this.visits.find(visit => visit.id === id);
    }
};

// Mini-games data
const gamesData = {
    games: [
        {
            id: 'puzzle',
            name: 'Puzzle Historique',
            description: 'Reconstituez une image historique du lycée Jean Prévost.',
            image: 'images/games/puzzle.jpg',
            quoteFragmentIndex: 0
        },
        {
            id: 'quiz',
            name: 'Quiz de Connaissances',
            description: 'Testez vos connaissances sur l\'histoire et la géographie de Montivilliers.',
            image: 'images/games/quiz.jpg',
            quoteFragmentIndex: 1
        },
        {
            id: 'memory',
            name: 'Memory des Symboles',
            description: 'Retrouvez les paires de symboles liés à l\'éducation et au lycée.',
            image: 'images/games/memory.jpg',
            quoteFragmentIndex: 2
        },
        {
            id: 'wordsearch',
            name: 'Mots Mêlés',
            description: 'Trouvez les mots cachés en rapport avec le lycée et l\'éducation.',
            image: 'images/games/wordsearch.jpg',
            quoteFragmentIndex: 3
        },
        {
            id: 'hangman',
            name: 'Le Pendu',
            description: 'Devinez le mot mystère lié à l\'histoire du lycée.',
            image: 'images/games/hangman.jpg',
            quoteFragmentIndex: 4
        },
        {
            id: 'riddle',
            name: 'Énigmes Logiques',
            description: 'Résolvez des énigmes logiques pour obtenir le dernier fragment de la citation.',
            image: 'images/games/riddle.jpg',
            quoteFragmentIndex: 5
        }
    ],
    
    // Get game by ID
    getGameById(id) {
        return this.games.find(game => game.id === id);
    },
    
    // Get quote fragment for a game
    getQuoteFragment(gameId) {
        const game = this.getGameById(gameId);
        if (game) {
            return quoteData.fragments[game.quoteFragmentIndex];
        }
        return null;
    }
};

// Musical clips data for the final challenge
const musicData = {
    clips: [
        {
            id: 'clip1',
            title: 'La Vie En Rose',
            artist: 'Édith Piaf',
            year: '1945',
            url: 'https://www.example.com/clips/la-vie-en-rose.mp4',
            clues: ['chanteuse française', 'années 40', 'amour']
        },
        {
            id: 'clip2',
            title: 'Ne Me Quitte Pas',
            artist: 'Jacques Brel',
            year: '1959',
            url: 'https://www.example.com/clips/ne-me-quitte-pas.mp4',
            clues: ['chanteur belge', 'chanson d\'amour', 'désespoir']
        },
        {
            id: 'clip3',
            title: 'L\'Été Indien',
            artist: 'Joe Dassin',
            year: '1975',
            url: 'https://www.example.com/clips/ete-indien.mp4',
            clues: ['nostalgie', 'saison', 'souvenirs']
        },
        {
            id: 'clip4',
            title: 'La Bohème',
            artist: 'Charles Aznavour',
            year: '1965',
            url: 'https://www.example.com/clips/la-boheme.mp4',
            clues: ['artistes', 'Paris', 'jeunesse']
        },
        {
            id: 'clip5',
            title: 'Mistral Gagnant',
            artist: 'Renaud',
            year: '1985',
            url: 'https://www.example.com/clips/mistral-gagnant.mp4',
            clues: ['enfance', 'bonbons', 'nostalgie']
        }
    ],
    
    // Get random clip
    getRandomClip() {
        const randomIndex = Math.floor(Math.random() * this.clips.length);
        return this.clips[randomIndex];
    },
    
    // Get clip by ID
    getClipById(id) {
        return this.clips.find(clip => clip.id === id);
    }
};
