/**
 * Binary Game JavaScript
 * Ce fichier contient le jeu de calcul binaire pour le mode hackeur
 */

/**
 * Lance le jeu de calcul binaire
 */
function launchBinaryGame() {
    // Créer le jeu
    const game = document.createElement('div');
    game.className = 'binary-game';
    game.innerHTML = `
        <div class="binary-game-header">
            <h2>Calcul Binaire</h2>
            <span class="binary-game-close">×</span>
        </div>
        <div class="binary-game-content">
            <div class="binary-game-instructions">
                <p>Convertissez les nombres décimaux en binaire ou les nombres binaires en décimal.</p>
                <p>Vous avez 60 secondes pour répondre à autant de questions que possible.</p>
            </div>
            <div class="binary-game-score">
                <span>Score: <span id="binary-score">0</span></span>
                <span>Temps: <span id="binary-timer">60</span>s</span>
            </div>
            <div class="binary-game-question" id="binary-question">
                <p>Prêt à commencer ?</p>
            </div>
            <div class="binary-game-answer">
                <input type="text" id="binary-answer" placeholder="Votre réponse">
                <button id="binary-submit">Valider</button>
            </div>
            <div class="binary-game-result" id="binary-result"></div>
        </div>
    `;
    
    // Ajouter les styles CSS pour le jeu
    const style = document.createElement('style');
    style.textContent = `
        .binary-game {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 600px;
            background-color: rgba(0, 0, 0, 0.9);
            border: 1px solid #00ff00;
            border-radius: 5px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
            font-family: 'Courier New', monospace;
            color: #00ff00;
        }
        
        .binary-game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background-color: #111;
            border-bottom: 1px solid #00ff00;
        }
        
        .binary-game-header h2 {
            margin: 0;
            font-size: 20px;
        }
        
        .binary-game-close {
            cursor: pointer;
            font-size: 24px;
            color: #00ff00;
        }
        
        .binary-game-close:hover {
            color: #ff0000;
        }
        
        .binary-game-content {
            padding: 20px;
        }
        
        .binary-game-instructions {
            margin-bottom: 20px;
        }
        
        .binary-game-score {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            font-weight: bold;
        }
        
        .binary-game-question {
            background-color: #111;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
            font-size: 18px;
        }
        
        .binary-game-answer {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .binary-game-answer input {
            flex: 1;
            padding: 10px;
            background-color: #111;
            border: 1px solid #00ff00;
            border-radius: 5px;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 16px;
        }
        
        .binary-game-answer button {
            padding: 10px 20px;
            background-color: #111;
            border: 1px solid #00ff00;
            border-radius: 5px;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            cursor: pointer;
        }
        
        .binary-game-answer button:hover {
            background-color: rgba(0, 255, 0, 0.2);
        }
        
        .binary-game-result {
            text-align: center;
            font-size: 18px;
            min-height: 30px;
        }
        
        .binary-game-result.success {
            color: #00ff00;
        }
        
        .binary-game-result.error {
            color: #ff0000;
        }
        
        .binary-game-over {
            text-align: center;
            margin-top: 20px;
        }
        
        .binary-game-over h3 {
            margin-top: 0;
        }
        
        .binary-game-over button {
            padding: 10px 20px;
            background-color: #111;
            border: 1px solid #00ff00;
            border-radius: 5px;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
        }
        
        .binary-game-over button:hover {
            background-color: rgba(0, 255, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // Ajouter le jeu au document
    document.body.appendChild(game);
    
    // Variables du jeu
    let score = 0;
    let timer = 60;
    let currentQuestion = null;
    let gameInterval = null;
    let isGameOver = false;
    
    // Éléments du jeu
    const closeButton = game.querySelector('.binary-game-close');
    const questionElement = game.querySelector('#binary-question');
    const answerInput = game.querySelector('#binary-answer');
    const submitButton = game.querySelector('#binary-submit');
    const resultElement = game.querySelector('#binary-result');
    const scoreElement = game.querySelector('#binary-score');
    const timerElement = game.querySelector('#binary-timer');
    
    // Gérer la fermeture du jeu
    closeButton.addEventListener('click', () => {
        clearInterval(gameInterval);
        game.remove();
        playSound('terminal');
    });
    
    // Fonction pour générer une question
    function generateQuestion() {
        // 50% de chance de convertir décimal vers binaire ou binaire vers décimal
        const isBinaryToDecimal = Math.random() < 0.5;
        
        if (isBinaryToDecimal) {
            // Générer un nombre binaire aléatoire (max 8 bits)
            const binaryLength = Math.floor(Math.random() * 7) + 2; // 2 à 8 bits
            let binary = '';
            
            // Assurer que le premier bit est 1
            binary += '1';
            
            // Générer les bits restants
            for (let i = 1; i < binaryLength; i++) {
                binary += Math.floor(Math.random() * 2);
            }
            
            // Calculer la valeur décimale
            const decimal = parseInt(binary, 2);
            
            currentQuestion = {
                type: 'binaryToDecimal',
                question: binary,
                answer: decimal.toString()
            };
            
            questionElement.innerHTML = `<p>Convertissez ce nombre binaire en décimal :</p><p class="question-value">${binary}</p>`;
        } else {
            // Générer un nombre décimal aléatoire (max 255)
            const decimal = Math.floor(Math.random() * 255) + 1;
            
            // Convertir en binaire
            const binary = decimal.toString(2);
            
            currentQuestion = {
                type: 'decimalToBinary',
                question: decimal,
                answer: binary
            };
            
            questionElement.innerHTML = `<p>Convertissez ce nombre décimal en binaire :</p><p class="question-value">${decimal}</p>`;
        }
        
        // Réinitialiser l'entrée et le résultat
        answerInput.value = '';
        resultElement.textContent = '';
        resultElement.className = 'binary-game-result';
        
        // Donner le focus à l'entrée
        answerInput.focus();
    }
    
    // Fonction pour vérifier la réponse
    function checkAnswer() {
        if (isGameOver) return;
        
        const userAnswer = answerInput.value.trim();
        
        if (userAnswer === '') {
            resultElement.textContent = 'Veuillez entrer une réponse.';
            resultElement.className = 'binary-game-result error';
            return;
        }
        
        if (userAnswer === currentQuestion.answer) {
            // Réponse correcte
            score++;
            scoreElement.textContent = score;
            resultElement.textContent = 'Correct !';
            resultElement.className = 'binary-game-result success';
            playSound('success');
            
            // Générer une nouvelle question
            setTimeout(generateQuestion, 1000);
        } else {
            // Réponse incorrecte
            resultElement.textContent = `Incorrect. La réponse était ${currentQuestion.answer}.`;
            resultElement.className = 'binary-game-result error';
            playSound('error');
            
            // Générer une nouvelle question
            setTimeout(generateQuestion, 2000);
        }
    }
    
    // Fonction pour terminer le jeu
    function endGame() {
        clearInterval(gameInterval);
        isGameOver = true;
        
        // Afficher le résultat final
        questionElement.innerHTML = `<div class="binary-game-over">
            <h3>Temps écoulé !</h3>
            <p>Votre score final est de ${score} points.</p>
            <button id="binary-restart">Rejouer</button>
        </div>`;
        
        // Masquer l'entrée et le résultat
        answerInput.style.display = 'none';
        submitButton.style.display = 'none';
        resultElement.style.display = 'none';
        
        // Gérer le bouton de redémarrage
        const restartButton = questionElement.querySelector('#binary-restart');
        restartButton.addEventListener('click', () => {
            // Réinitialiser le jeu
            score = 0;
            timer = 60;
            isGameOver = false;
            
            // Mettre à jour l'affichage
            scoreElement.textContent = score;
            timerElement.textContent = timer;
            answerInput.style.display = '';
            submitButton.style.display = '';
            resultElement.style.display = '';
            
            // Générer une nouvelle question
            generateQuestion();
            
            // Redémarrer le timer
            startTimer();
        });
    }
    
    // Fonction pour démarrer le timer
    function startTimer() {
        // Effacer l'intervalle précédent si existant
        if (gameInterval) {
            clearInterval(gameInterval);
        }
        
        // Démarrer un nouvel intervalle
        gameInterval = setInterval(() => {
            timer--;
            timerElement.textContent = timer;
            
            if (timer <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    // Gérer le bouton de soumission
    submitButton.addEventListener('click', checkAnswer);
    
    // Gérer la soumission par la touche Entrée
    answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Démarrer le jeu
    setTimeout(() => {
        generateQuestion();
        startTimer();
    }, 1000);
}

// Exposer la fonction globalement
window.launchBinaryGame = launchBinaryGame;
