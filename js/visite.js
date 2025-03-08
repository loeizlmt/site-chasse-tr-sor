/**
 * Chasse au Trésor - Virtual Tours JavaScript
 * This file contains functionality specific to the virtual tours page
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Load virtual visits data
    const visitsData = await dataLoader.getVirtualVisits();
    if (!visitsData) {
        console.error('Failed to load virtual visits data');
        return;
    }

    // Get DOM elements
    const visitSelect = document.getElementById('visit-select');
    const visitDescription = document.getElementById('visit-description');
    const iframeContainer = document.getElementById('iframe-container');
    
    // Populate the dropdown with visit options
    populateVisitOptions(visitsData.visits);
    
    // Set up event listener for dropdown change
    visitSelect.addEventListener('change', (event) => handleVisitChange(event, visitsData.visits));
    
    // Load the previously selected visit if available
    loadSavedVisit(visitsData.visits);
});

/**
 * Populates the dropdown with available virtual tours
 * @param {Array} visits - Array of visit objects
 */
function populateVisitOptions(visits) {
    const visitSelect = document.getElementById('visit-select');
    
    // Clear existing options except the default one
    while (visitSelect.options.length > 1) {
        visitSelect.remove(1);
    }
    
    // Add options for each visit
    visits.forEach(visit => {
        const option = document.createElement('option');
        option.value = visit.id;
        option.textContent = visit.name;
        visitSelect.appendChild(option);
    });
}

/**
 * Handles the change event when a new visit is selected
 * @param {Event} event - The change event
 * @param {Array} visits - Array of visit objects
 */
function handleVisitChange(event, visits) {
    const visitId = event.target.value;
    if (!visitId) return;
    
    // Get the selected visit data
    const visit = getVisitById(visits, visitId);
    if (!visit) return;
    
    // Update the description
    updateVisitDescription(visit);
    
    // Load the iframe
    loadVisitIframe(visit);
    
    // Save the selected visit to localStorage
    gameState.setCurrentVisit(visitId);
}

/**
 * Get a visit by its ID
 * @param {Array} visits - Array of visit objects
 * @param {string} id - The ID of the visit to find
 * @returns {Object|null} The visit object or null if not found
 */
function getVisitById(visits, id) {
    return visits.find(visit => visit.id === id) || null;
}

/**
 * Updates the visit description based on the selected visit
 * @param {Object} visit - The selected visit object
 */
function updateVisitDescription(visit) {
    const visitDescription = document.getElementById('visit-description');
    visitDescription.innerHTML = `
        <h3>${visit.name}</h3>
        <p>${visit.description}</p>
    `;
    utils.fadeIn(visitDescription);
}

/**
 * Loads the iframe with the selected visit URL
 * @param {Object} visit - The selected visit object
 */
function loadVisitIframe(visit) {
    const iframeContainer = document.getElementById('iframe-container');
    
    // Clear the container
    iframeContainer.innerHTML = '';
    
    // Create and append the iframe
    const iframe = document.createElement('iframe');
    iframe.src = visit.url;
    iframe.title = visit.name;
    iframe.allowFullscreen = true;
    
    iframeContainer.appendChild(iframe);
    
    // Add loading indicator
    const loadingIndicator = utils.createElement('div', {
        className: 'loading-indicator'
    }, '<i class="fas fa-spinner fa-spin"></i><p>Chargement de la visite...</p>');
    
    iframeContainer.appendChild(loadingIndicator);
    
    // Remove loading indicator when iframe is loaded
    iframe.addEventListener('load', () => {
        loadingIndicator.remove();
    });
    
    // Handle iframe load error
    iframe.addEventListener('error', () => {
        handleIframeError(visit);
    });
}

/**
 * Handles iframe loading errors
 * @param {Object} visit - The visit that failed to load
 */
function handleIframeError(visit) {
    const iframeContainer = document.getElementById('iframe-container');
    
    // Clear the container
    iframeContainer.innerHTML = '';
    
    // Show error message
    const errorMessage = utils.createElement('div', {
        className: 'error-message'
    }, `
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Erreur de chargement</h3>
        <p>Impossible de charger la visite virtuelle "${visit.name}".</p>
        <p>Veuillez vérifier votre connexion internet ou réessayer plus tard.</p>
    `);
    
    iframeContainer.appendChild(errorMessage);
}

/**
 * Loads the previously selected visit from localStorage
 * @param {Array} visits - Array of visit objects
 */
async function loadSavedVisit(visits) {
    const currentVisitId = gameState.currentVisit;
    
    if (currentVisitId) {
        // Set the dropdown value
        const visitSelect = document.getElementById('visit-select');
        visitSelect.value = currentVisitId;
        
        // Trigger the change event to load the visit
        const changeEvent = new Event('change');
        visitSelect.dispatchEvent(changeEvent);
    }
}

/**
 * Creates QR codes for the mini-games
 * Note: In a real implementation, these QR codes would be embedded in the virtual tour
 * This function is for demonstration purposes only
 */
async function generateQRCodes() {
    // Load mini-games data
    const miniGamesData = await dataLoader.getMiniGames();
    if (!miniGamesData) {
        console.error('Failed to load mini-games data');
        return document.createElement('div');
    }
    
    // This would typically be done with a QR code generation library
    // For this example, we'll just use placeholder images
    
    const qrCodesContainer = document.createElement('div');
    qrCodesContainer.className = 'qr-codes-container';
    
    miniGamesData.games.forEach(game => {
        const qrCode = document.createElement('div');
        qrCode.className = 'qr-code';
        
        // In a real implementation, this would be a generated QR code
        // that links to the mini-game page with the game ID as a parameter
        qrCode.innerHTML = `
            <img src="images/qr-codes/${game.id}.png" alt="QR Code pour ${game.name}">
            <p>${game.name}</p>
        `;
        
        qrCodesContainer.appendChild(qrCode);
    });
    
    return qrCodesContainer;
}

// Add additional CSS for the virtual tours page
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for the placeholder message
    const style = document.createElement('style');
    style.textContent = `
        .placeholder-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 400px;
            background-color: #f8f9fa;
            border-radius: 10px;
            text-align: center;
            padding: 2rem;
        }
        
        .placeholder-message i {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .loading-indicator {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            text-align: center;
        }
        
        .loading-indicator i {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .error-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 400px;
            background-color: #fff3f3;
            border: 1px solid #e74c3c;
            border-radius: 10px;
            text-align: center;
            padding: 2rem;
            color: #e74c3c;
        }
        
        .error-message i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .visit-description {
            background-color: white;
            border-radius: 10px;
            padding: 1.5rem;
            margin: 1rem 0 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .visit-instructions {
            background-color: var(--light-color);
            border-radius: 10px;
            padding: 1.5rem;
            margin: 2rem 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .visit-instructions ul {
            list-style: none;
            padding: 0;
        }
        
        .visit-instructions li {
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
        }
        
        .visit-instructions i {
            color: var(--primary-color);
            margin-right: 0.5rem;
            width: 20px;
            text-align: center;
        }
        
        .qr-code-hint {
            background-color: var(--light-color);
            border-radius: 10px;
            padding: 1.5rem;
            margin: 2rem 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .qr-examples {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            margin-top: 1.5rem;
        }
        
        .qr-example {
            flex: 1;
            min-width: 250px;
            text-align: center;
        }
        
        .qr-example img {
            max-width: 150px;
            margin-bottom: 1rem;
        }
        
        .qr-scan-steps {
            text-align: left;
        }
        
        .qr-scan-steps p {
            margin-bottom: 0.8rem;
        }
    `;
    
    document.head.appendChild(style);
});
