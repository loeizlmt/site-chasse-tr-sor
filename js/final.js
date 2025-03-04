/**
 * Chasse au Trésor - Final Challenge JavaScript
 * This file contains functionality specific to the final challenge page
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Load music clips data
    const musicClipsData = await dataLoader.getMusicClips();
    if (!musicClipsData) {
        console.error('Failed to load music clips data');
        return;
    }
    
    // Load music clues data
    const musicCluesData = await dataLoader.getMusicClues();
    if (!musicCluesData) {
        console.error('Failed to load music clues data');
        return;
    }
    
    // Load final instructions data
    const finalInstructionsData = await dataLoader.getFinalInstructions();
    if (!finalInstructionsData) {
        console.error('Failed to load final instructions data');
        return;
    }
    
    // Initialize the final challenge page
    initFinalChallenge(musicClipsData.clips, musicCluesData.clues, finalInstructionsData.instructions);
});

/**
 * Initializes the final challenge page
 * @param {Array} clips - Array of music clip objects
 * @param {Array} musicClues - Array of music clue objects
 * @param {Object} emailInfo - Email information object
 */
function initFinalChallenge(clips, musicClues, emailInfo) {
    // Get DOM elements
    const videoContainer = document.getElementById('video-container');
    const changeClipBtn = document.getElementById('change-clip');
    const clue1Input = document.getElementById('clue1');
    const clue2Input = document.getElementById('clue2');
    const clue3Input = document.getElementById('clue3');
    const validateCluesBtn = document.getElementById('validate-clues');
    const writingChallenge = document.getElementById('writing-challenge');
    const selectedClue1 = document.getElementById('selected-clue1');
    const selectedClue2 = document.getElementById('selected-clue2');
    const selectedClue3 = document.getElementById('selected-clue3');
    const storyTitle = document.getElementById('story-title');
    const storyContent = document.getElementById('story-content');
    const wordCount = document.getElementById('word-count');
    const authorName = document.getElementById('author-name');
    const authorEmail = document.getElementById('author-email');
    const submitStoryBtn = document.getElementById('submit-story');
    const saveDraftBtn = document.getElementById('save-draft');
    const completionMessage = document.getElementById('completion-message');
    
    // Current clip
    let currentClip = getRandomClip(clips);
    
    // Load initial clip
    loadClip(currentClip);
    
    // Set up event listeners
    if (changeClipBtn) {
        changeClipBtn.addEventListener('click', () => {
            currentClip = getRandomClip(clips, currentClip.id);
            loadClip(currentClip);
        });
    }
    
    // Ensure the validate clues button works
    if (validateCluesBtn) {
        // Remove any existing event listeners
        validateCluesBtn.replaceWith(validateCluesBtn.cloneNode(true));
        // Get the fresh button reference
        const freshBtn = document.getElementById('validate-clues');
        if (freshBtn) {
            freshBtn.addEventListener('click', function() {
                console.log('Validate clues button clicked');
                validateClues();
            });
        } else {
            console.error('Validate clues button not found after refresh');
        }
    } else {
        console.error('Validate clues button not found initially');
    }
    
    if (storyContent) {
        storyContent.addEventListener('input', () => {
            updateWordCount();
        });
    }
    
    if (submitStoryBtn) {
        submitStoryBtn.addEventListener('click', () => {
            submitStory(emailInfo);
        });
    }
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            saveDraft();
        });
    }
    
    // Add music visualizer
    addMusicVisualizer();
    
    /**
     * Gets a random clip from the clips array
     * @param {Array} clips - Array of clip objects
     * @param {string} [currentId] - ID of the current clip to exclude
     * @returns {Object} A random clip object
     */
    function getRandomClip(clips, currentId = null) {
        // Filter out the current clip if provided
        const availableClips = currentId ? clips.filter(clip => clip.id !== currentId) : clips;
        
        // Get a random clip
        const randomIndex = Math.floor(Math.random() * availableClips.length);
        return availableClips[randomIndex];
    }
    
    /**
     * Loads a clip into the video container
     * @param {Object} clip - The clip object to load
     */
    function loadClip(clip) {
        if (!videoContainer) return;
        
        // Clear the container
        videoContainer.innerHTML = '';
        
        // Create video element
        const video = document.createElement('video');
        video.src = clip.url;
        video.controls = true;
        video.autoplay = false;
        video.className = 'music-video';
        
        // Add clip info
        const clipInfo = document.createElement('div');
        clipInfo.className = 'clip-info';
        clipInfo.innerHTML = `
            <h4>${clip.title}</h4>
            <p>Artiste: ${clip.artist} (${clip.year})</p>
        `;
        
        // Add to container
        videoContainer.appendChild(video);
        videoContainer.appendChild(clipInfo);
        
        // Initialize music visualizer
        if (typeof initMusicVisualizer === 'function') {
            initMusicVisualizer(video);
        }
    }
    
    /**
     * Validates the clues entered by the user
     */
    function validateClues() {
        // Check if all clues are filled
        if (!clue1Input.value.trim() || !clue2Input.value.trim() || !clue3Input.value.trim()) {
            alert('Veuillez remplir tous les champs d\'indices.');
            return;
        }
        
        // Get user inputs
        const userClue1 = clue1Input.value.trim().toLowerCase();
        const userClue2 = clue2Input.value.trim().toLowerCase();
        const userClue3 = clue3Input.value.trim().toLowerCase();
        
        // Check if the clues are valid
        const isClue1Valid = isClueValid(userClue1, musicClues.validClues[0]);
        const isClue2Valid = isClueValid(userClue2, musicClues.validClues[1]);
        const isClue3Valid = isClueValid(userClue3, musicClues.validClues[2]);
        
        // If any clue is invalid, show an error message
        if (!isClue1Valid || !isClue2Valid || !isClue3Valid) {
            let errorMessage = 'Certains indices ne sont pas corrects :\n';
            
            if (!isClue1Valid) errorMessage += '- Le thème principal n\'est pas correct (réponse attendue: A).\n';
            if (!isClue2Valid) errorMessage += '- L\'époque ou période n\'est pas correcte (réponse attendue: B).\n';
            if (!isClue3Valid) errorMessage += '- L\'émotion principale n\'est pas correcte (réponse attendue: C).\n';
            
            errorMessage += '\nVeuillez entrer les réponses correctes pour continuer.';
            
            alert(errorMessage);
            return;
        }
        
        // All clues are valid, show the writing challenge
        if (writingChallenge) {
            writingChallenge.classList.remove('hidden');
            utils.fadeIn(writingChallenge);
            
            // Set the selected clues
            if (selectedClue1) selectedClue1.textContent = clue1Input.value.trim();
            if (selectedClue2) selectedClue2.textContent = clue2Input.value.trim();
            if (selectedClue3) selectedClue3.textContent = clue3Input.value.trim();
            
            // Scroll to the writing challenge
            setTimeout(() => {
                writingChallenge.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
    
    /**
     * Checks if a clue is valid
     * @param {string} userClue - The clue entered by the user
     * @param {Array} validClues - Array of valid clues
     * @returns {boolean} Whether the clue is valid
     */
    function isClueValid(userClue, validClues) {
        // Normalize the user clue (remove accents, special characters, etc.)
        const normalizeText = (text) => {
            return text.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
                .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
                .trim();
        };
        
        const normalizedUserClue = normalizeText(userClue);
        
        // Check if the normalized user clue matches any of the valid clues
        return validClues.some(validClue => {
            const normalizedValidClue = normalizeText(validClue);
            return normalizedUserClue === normalizedValidClue;
        });
    }
    
    /**
     * Updates the word count for the story
     */
    function updateWordCount() {
        if (!storyContent || !wordCount) return;
        
        const text = storyContent.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        
        wordCount.textContent = words;
        
        // Change color based on word count
        if (words < 200) {
            wordCount.style.color = '#e74c3c';
        } else if (words <= 300) {
            wordCount.style.color = '#2ecc71';
        } else {
            wordCount.style.color = '#e67e22';
        }
    }
    
    /**
     * Submits the story
     * @param {Object} emailInfo - Email information object
     */
    function submitStory(emailInfo) {
        // Check if all fields are filled
        if (!storyTitle.value.trim() || !storyContent.value.trim() || !authorName.value.trim()) {
            alert('Veuillez remplir tous les champs obligatoires (titre, contenu et nom).');
            return;
        }
        
        // Check word count
        const words = storyContent.value.trim().split(/\s+/).length;
        if (words < 200) {
            alert('Votre nouvelle est trop courte. Elle doit contenir au moins 200 mots.');
            return;
        }
        
        // Prepare email content
        const subject = encodeURIComponent(emailInfo.subject);
        const body = encodeURIComponent(`
Nom: ${authorName.value.trim()}
Titre: ${storyTitle.value.trim()}

Indices identifiés:
1. ${selectedClue1.textContent}
2. ${selectedClue2.textContent}
3. ${selectedClue3.textContent}

Nouvelle:
${storyContent.value.trim()}
        `);
        
        // Show instructions for sending email
        const emailInstructions = document.createElement('div');
        emailInstructions.className = 'email-instructions';
        emailInstructions.innerHTML = `
            <h3>Instructions pour l'envoi de votre nouvelle</h3>
            <p>${emailInfo.instructions}</p>
            <p><strong>Adresse email:</strong> ${emailInfo.recipient}</p>
            <p><strong>Sujet:</strong> ${emailInfo.subject}</p>
            <a href="mailto:${emailInfo.recipient}?subject=${subject}&body=${body}" class="btn-primary" target="_blank">Ouvrir dans votre client email</a>
        `;
        
        // Show completion message
        if (completionMessage) {
            // Clear previous content
            completionMessage.querySelector('.completion-content').innerHTML = '';
            
            // Add email instructions
            completionMessage.querySelector('.completion-content').appendChild(emailInstructions);
            
            // Show completion message
            completionMessage.classList.remove('hidden');
            utils.fadeIn(completionMessage);
            
            // Scroll to completion message
            setTimeout(() => {
                completionMessage.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
    
    /**
     * Saves the story as a draft in localStorage
     */
    function saveDraft() {
        const draft = {
            title: storyTitle.value.trim(),
            content: storyContent.value.trim(),
            authorName: authorName.value.trim(),
            authorEmail: authorEmail.value.trim(),
            clue1: selectedClue1 ? selectedClue1.textContent : '',
            clue2: selectedClue2 ? selectedClue2.textContent : '',
            clue3: selectedClue3 ? selectedClue3.textContent : '',
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('storyDraft', JSON.stringify(draft));
        alert('Brouillon enregistré avec succès. Vous pourrez le récupérer lors de votre prochaine visite.');
    }
    
    /**
     * Loads a saved draft from localStorage
     */
    function loadDraft() {
        const savedDraft = localStorage.getItem('storyDraft');
        if (!savedDraft) return;
        
        try {
            const draft = JSON.parse(savedDraft);
            
            // Fill in the form fields
            if (storyTitle) storyTitle.value = draft.title || '';
            if (storyContent) storyContent.value = draft.content || '';
            if (authorName) authorName.value = draft.authorName || '';
            if (authorEmail) authorEmail.value = draft.authorEmail || '';
            
            // Update word count
            updateWordCount();
            
            // Show a notification
            const draftDate = new Date(draft.timestamp).toLocaleString();
            alert(`Un brouillon sauvegardé le ${draftDate} a été chargé.`);
        } catch (error) {
            console.error('Error loading draft:', error);
        }
    }
    
    // Check for saved draft
    if (writingChallenge && !writingChallenge.classList.contains('hidden')) {
        loadDraft();
    }
}

/**
 * Adds a music visualizer to the page
 */
function addMusicVisualizer() {
    // This function is implemented in music-visualizer.js
    if (typeof createMusicVisualizer === 'function') {
        createMusicVisualizer();
    }
}

// Function to validate clues directly from HTML onclick
async function validateCluesDirectly() {
    console.log('validateCluesDirectly called from HTML onclick');
    
    // Get input elements
    const clue1Input = document.getElementById('clue1');
    const clue2Input = document.getElementById('clue2');
    const clue3Input = document.getElementById('clue3');
    const writingChallenge = document.getElementById('writing-challenge');
    const selectedClue1 = document.getElementById('selected-clue1');
    const selectedClue2 = document.getElementById('selected-clue2');
    const selectedClue3 = document.getElementById('selected-clue3');
    const instructionsContent = document.getElementById('instructions-content');
    const emailLink = document.getElementById('email-link');
    
    // Check if all clues are filled
    if (!clue1Input.value.trim() || !clue2Input.value.trim() || !clue3Input.value.trim()) {
        alert('Veuillez remplir tous les champs d\'indices.');
        return;
    }
    
    // Get user inputs
    const userClue1 = clue1Input.value.trim().toLowerCase();
    const userClue2 = clue2Input.value.trim().toLowerCase();
    const userClue3 = clue3Input.value.trim().toLowerCase();
    
    // For now, just accept A, B, C as valid answers
    const isClue1Valid = userClue1 === 'a';
    const isClue2Valid = userClue2 === 'b';
    const isClue3Valid = userClue3 === 'c';
    
    // If any clue is invalid, show an error message
    if (!isClue1Valid || !isClue2Valid || !isClue3Valid) {
        let errorMessage = 'Certains indices ne sont pas corrects :\n';
        
        if (!isClue1Valid) errorMessage += '- Le thème principal n\'est pas correct (réponse attendue: A).\n';
        if (!isClue2Valid) errorMessage += '- L\'époque ou période n\'est pas correcte (réponse attendue: B).\n';
        if (!isClue3Valid) errorMessage += '- L\'émotion principale n\'est pas correcte (réponse attendue: C).\n';
        
        errorMessage += '\nVeuillez entrer les réponses correctes pour continuer.';
        
        alert(errorMessage);
        return;
    }
    
    // All clues are valid, show the instructions
    if (writingChallenge) {
        // Load final instructions
        const finalInstructionsData = await dataLoader.getFinalInstructions();
        if (!finalInstructionsData) {
            console.error('Failed to load final instructions data');
            return;
        }
        
        const instructions = finalInstructionsData.instructions;
        
        // Show the writing challenge section
        writingChallenge.classList.remove('hidden');
        
        // Set the selected clues
        if (selectedClue1) selectedClue1.textContent = clue1Input.value.trim();
        if (selectedClue2) selectedClue2.textContent = clue2Input.value.trim();
        if (selectedClue3) selectedClue3.textContent = clue3Input.value.trim();
        
        // Display instructions
        if (instructionsContent) {
            instructionsContent.innerHTML = `
                <h3>${instructions.title}</h3>
                <div class="instructions-text">
                    ${instructions.text.replace(/\n/g, '<br>')}
                </div>
                <div class="email-info">
                    <p><strong>Adresse email:</strong> ${instructions.email}</p>
                    <p><strong>Sujet:</strong> ${instructions.subject}</p>
                </div>
            `;
        }
        
        // Set up email link
        if (emailLink) {
            const subject = encodeURIComponent(instructions.subject);
            const body = encodeURIComponent(`
Indices identifiés:
1. ${clue1Input.value.trim()}
2. ${clue2Input.value.trim()}
3. ${clue3Input.value.trim()}

[Insérez votre nouvelle ici]
            `);
            
            emailLink.href = `mailto:${instructions.email}?subject=${subject}&body=${body}`;
        }
        
        // Scroll to the writing challenge
        setTimeout(() => {
            writingChallenge.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
}

// Add additional CSS for the final challenge page
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .final-instructions {
            background-color: white;
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .instructions-content {
            margin: 2rem 0;
        }
        
        .instructions-content h3 {
            color: var(--primary-color);
            margin-top: 0;
        }
        
        .instructions-text {
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        
        .email-info {
            background-color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1.5rem 0;
        }
        
        .email-link-container {
            text-align: center;
            margin-top: 2rem;
        }
        
        .email-link-container a {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
        }
        
        .loading {
            text-align: center;
            padding: 2rem;
            color: #6c757d;
        }
        .music-player {
            position: relative;
        }
        
        .music-video {
            width: 100%;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }
        
        .clip-info {
            margin-top: 1rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        
        .clip-info h4 {
            margin: 0 0 0.5rem;
            color: var(--primary-color);
        }
        
        .clip-info p {
            margin: 0;
            font-style: italic;
        }
        
        .clues-form {
            margin-top: 2rem;
            padding: 1.5rem;
            background-color: #f8f9fa;
            border-radius: 10px;
        }
        
        .selected-clues {
            margin-bottom: 1.5rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        
        .selected-clues ul {
            margin: 0.5rem 0 0;
            padding-left: 1.5rem;
        }
        
        .selected-clues li {
            margin-bottom: 0.5rem;
        }
        
        .word-count {
            text-align: right;
            margin-top: 0.5rem;
            font-size: 0.9rem;
            color: #6c757d;
        }
        
        .email-instructions {
            background-color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1.5rem 0;
        }
        
        .email-instructions h3 {
            color: var(--primary-color);
            margin-top: 0;
        }
        
        .email-instructions a {
            margin-top: 1rem;
            display: inline-block;
        }
        
        .completion-content {
            text-align: center;
            padding: 2rem;
        }
        
        .completion-content i {
            font-size: 4rem;
            color: var(--success-color);
            margin-bottom: 1.5rem;
        }
        
        .hidden {
            display: none;
        }
    `;
    
    document.head.appendChild(style);
});
