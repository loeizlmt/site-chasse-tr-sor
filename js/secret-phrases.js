/**
 * Secret Phrases JavaScript - Easter Egg
 * This file contains functionality to detect secret phrases that trigger the hacker theme
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize secret phrase detection
    initSecretPhraseDetection();
});

/**
 * Initializes the secret phrase detection
 */
function initSecretPhraseDetection() {
    // List of secret phrases that trigger the hacker theme
    const secretPhrases = [
        // Phrases originales
        'je suis un hacker',
        'mode matrix',
        'hack the planet',
        'mr robot',
        'hello world',
        'sudo rm -rf',
        'neo',
        'morpheus',
        'trinity',
        'cypher',
        '42',
        'l33t',
        'h4ck3r',
        'anonymous',
        'terminal',
        'backdoor',
        'firewall',
        'exploit',
        'virus',
        'trojan',
        'worm',
        'malware',
        'rootkit',
        'botnet',
        'ddos',
        'sql injection',
        'xss',
        'csrf',
        'buffer overflow',
        'zero day',
        'brute force',
        'phishing',
        'social engineering',
        'keylogger',
        'ransomware',
        'spyware',
        'adware',
        'cryptography',
        'encryption',
        'decryption',
        'cipher',
        'hash',
        'md5',
        'sha1',
        'sha256',
        'aes',
        'rsa',
        'vpn',
        'proxy',
        'tor',
        'darknet',
        'deep web',
        'dark web',
        'bitcoin',
        'blockchain',
        'cryptocurrency',
        'mining',
        'wallet',
        'ledger',
        'smart contract',
        'token',
        'ico',
        'altcoin',
        'satoshi',
        'nakamoto',
        'ethereum',
        'litecoin',
        'ripple',
        'monero',
        'zcash',
        'dash',
        'dogecoin',
        'binance',
        'coinbase',
        'kraken',
        'bitfinex',
        'bitstamp',
        'gemini',
        'poloniex',
        'bittrex',
        'kucoin',
        'huobi',
        'okex',
        'bitmex',
        'bybit',
        'ftx',
        'deribit',
        'bitflyer',
        'bitbank',
        'bitso',
        'bithumb',
        'upbit',
        'coinone',
        'korbit',
        
        // Nouvelles phrases
        'Hello, World!',
        'There is no cloud, it\'s just someone else\'s computer',
        'It\'s not a bug, it\'s a feature',
        'Keep calm and code on',
        'Code fast, break things',
        'Segmentation fault (core dumped)',
        'rm -rf',
        'sudo solve all problems',
        '99 little bugs in the code',
        '0xDEADBEEF',
        'While not success, try again',
        'I\'m afraid I can\'t do that, Dave',
        'With great power comes great responsibility',
        'The cake is a lie',
        'Why so serious',
        'There is no spoon',
        'I am Groot',
        'Hasta la vista, baby',
        'Resistance is futile',
        'May the Force be with you',
        'Trust me, I\'m an engineer',
        'En NSI, on ne code pas, on debugue',
        'Python, c\'est la vie',
        'En NSI, la récursivité, c\'est la récursivité',
        'Les listes commencent à 0, pas à 1',
        'Si ça marche, c\'est que tu as oublié un cas particulier',
        'Les arbres binaires, c\'est comme les pizzas : il faut bien les équilibrer',
        'Il y a 10 types de personnes : ceux qui comprennent le binaire et les autres',
        'Turing avait raison',
        'password',
        '123456',
        'admin',
        'qwerty',
        'azerty',
        'letmein',
        '000000',
        '12345678',
        'iloveyou',
        'admin123',
        'monmotdepasse',
        'root',
        '1234',
        'superman',
        'secret',
        
        // Phrases spécifiques au Lycée Jean Prévost
        'jean prevost',
        'capitaine goderville',
        'montivilliers',
        'normandie',
        'resistance',
        'vercors',
        'lycee jean prevost',
    ];
    
    // Add event listeners to all input fields and textareas
    const inputElements = document.querySelectorAll('input[type="text"], input[type="search"], textarea');
    inputElements.forEach(input => {
        input.addEventListener('input', checkForSecretPhrase);
    });
    
    // Add event listener to the quote input field on the solution page
    const quoteInput = document.getElementById('quote-input');
    if (quoteInput) {
        quoteInput.addEventListener('input', checkForSecretPhrase);
    }
    
    /**
     * Checks if the input value contains a secret phrase
     * @param {Event} event - The input event
     */
    function checkForSecretPhrase(event) {
        const inputValue = event.target.value.toLowerCase().trim();
        
        // Check if the input value contains a secret phrase
        for (const phrase of secretPhrases) {
            if (inputValue.includes(phrase)) {
                console.log(`Secret phrase detected: ${phrase}`);
                
                // Toggle the hacker theme
                toggleHackerTheme();
                
                // Clear the input field
                event.target.value = '';
                
                // Break out of the loop
                break;
            }
        }
    }
    
    /**
     * Toggles the hacker theme
     */
    function toggleHackerTheme() {
        const root = document.documentElement;
        const isHackerTheme = root.classList.contains('hacker-theme');
        
        if (!isHackerTheme) {
            // Enable hacker theme
            root.classList.add('hacker-theme');
            localStorage.setItem('hackerTheme', 'enabled');
            
            // Create theme toggle button
            if (typeof createThemeToggle === 'function') {
                createThemeToggle();
            }
            
            // Create bug elements
            if (typeof createBugElements === 'function') {
                createBugElements();
            }
            
            // Add glitch effect to headings
            document.querySelectorAll('h1, h2, h3').forEach(heading => {
                heading.classList.add('glitch');
            });
            
            // Add terminal text effect to some paragraphs
            const paragraphs = document.querySelectorAll('p');
            for (let i = 0; i < paragraphs.length; i += 3) { // Only add to every third paragraph
                if (paragraphs[i]) {
                    paragraphs[i].classList.add('terminal-text');
                }
            }
            
            // Play glitch sound
            playGlitchSound();
            
            // Add random character animation to some text
            addRandomCharAnimation();
            
            // Show a message
            showHackerMessage();
        }
    }
    
    /**
     * Shows a message when the hacker theme is activated
     */
    function showHackerMessage() {
        // Create message element
        const message = document.createElement('div');
        message.className = 'hacker-message';
        message.innerHTML = `
            <div class="hacker-message-content">
                <h3>MODE HACKEUR ACTIVÉ</h3>
                <p>Vous avez découvert un easter egg ! Le mode hackeur est maintenant activé.</p>
                <p>Explorez le site pour découvrir d'autres surprises...</p>
                <div class="terminal-commands">
                    <p class="terminal-tip">Astuce : Utilisez <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> pour ouvrir le terminal hackeur</p>
                    <button id="open-terminal" class="btn-secondary">Ouvrir le Terminal</button>
                </div>
                <button id="close-hacker-message" class="btn-primary">Fermer</button>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .hacker-message {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: glitch 0.3s infinite;
            }
            
            .hacker-message-content {
                background-color: #111;
                border: 1px solid #00ff00;
                border-radius: 5px;
                padding: 2rem;
                max-width: 500px;
                text-align: center;
                color: #00ff00;
                font-family: 'Courier New', monospace;
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
            }
            
            .hacker-message h3 {
                margin-top: 0;
                color: #00ff00;
                text-shadow: 0 0 5px #00ff00;
            }
            
            .hacker-message button {
                margin-top: 1.5rem;
                background-color: #111;
                color: #00ff00;
                border: 1px solid #00ff00;
                padding: 0.5rem 1rem;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                transition: all 0.3s;
            }
            
            .hacker-message button:hover {
                background-color: #00ff00;
                color: #111;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(message);
        
        // Add event listener to close button
        const closeButton = document.getElementById('close-hacker-message');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                message.remove();
            });
        }
        
        // Add event listener to open terminal button
        const openTerminalButton = document.getElementById('open-terminal');
        if (openTerminalButton) {
            openTerminalButton.addEventListener('click', () => {
                message.remove();
                
                // Ouvrir le terminal principal
                const terminal = document.querySelector('.hacker-terminal');
                if (terminal) {
                    terminal.classList.add('active');
                    const input = terminal.querySelector('#terminal-input');
                    if (input) {
                        input.focus();
                    }
                    if (typeof playSound === 'function') {
                        playSound('terminal');
                    }
                } else {
                    console.error('Terminal not found. Make sure hacker-effects.js is loaded.');
                }
            });
        }
    }
    
    /**
     * Plays a glitch sound effect
     */
    function playGlitchSound() {
        // Create audio element
        const audio = document.createElement('audio');
        
        // In a real implementation, you would use an actual sound file
        // For this example, we'll just log a message
        console.log('Playing glitch sound effect');
        
        // If you want to add a real sound effect, uncomment the following lines
        // audio.src = 'sounds/glitch.mp3';
        // audio.volume = 0.3;
        // audio.play();
    }
    
    /**
     * Adds random character animation to some text elements
     */
    function addRandomCharAnimation() {
        // Get random text elements
        const textElements = document.querySelectorAll('p, li, h3, h4');
        const randomElements = Array.from(textElements).sort(() => 0.5 - Math.random()).slice(0, 5);
        
        randomElements.forEach(element => {
            element.classList.add('random-chars');
            element.setAttribute('data-text', element.textContent);
        });
    }
    
    /**
     * Creates a simple terminal as a fallback
     */
    function createSimpleTerminal() {
        // Check if terminal already exists
        if (document.getElementById('simple-terminal')) {
            document.getElementById('simple-terminal').classList.add('active');
            return;
        }
        
        // Create terminal container
        const terminal = document.createElement('div');
        terminal.id = 'simple-terminal';
        terminal.className = 'simple-terminal';
        
        // Create terminal content
        terminal.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-title">Terminal Hackeur (Version Simplifiée)</div>
                <div class="terminal-controls">
                    <span class="terminal-close">×</span>
                </div>
            </div>
            <div class="terminal-body">
                <div class="terminal-output">
                    <p>Bienvenue dans le terminal hackeur simplifié.</p>
                    <p>Tapez 'help' pour voir les commandes disponibles.</p>
                </div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">hackeur@lycee-jp:~$</span>
                    <input type="text" id="simple-terminal-input" autocomplete="off" spellcheck="false">
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .simple-terminal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                max-width: 600px;
                height: 400px;
                background-color: rgba(0, 0, 0, 0.9);
                border: 1px solid #00ff00;
                border-radius: 5px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                font-family: 'Courier New', monospace;
                color: #00ff00;
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
                display: none;
            }
            
            .simple-terminal.active {
                display: flex;
            }
            
            .terminal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px 10px;
                background-color: #111;
                border-bottom: 1px solid #00ff00;
            }
            
            .terminal-title {
                font-weight: bold;
            }
            
            .terminal-controls span {
                cursor: pointer;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .terminal-controls span:hover {
                background-color: rgba(255, 0, 0, 0.5);
            }
            
            .terminal-body {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 10px;
                overflow: hidden;
            }
            
            .terminal-output {
                flex: 1;
                overflow-y: auto;
                margin-bottom: 10px;
            }
            
            .terminal-output p {
                margin: 5px 0;
                line-height: 1.3;
            }
            
            .terminal-input-line {
                display: flex;
                align-items: center;
            }
            
            .terminal-prompt {
                margin-right: 10px;
            }
            
            #simple-terminal-input {
                flex: 1;
                background-color: transparent;
                border: none;
                color: #00ff00;
                font-family: 'Courier New', monospace;
                font-size: 16px;
                outline: none;
            }
            
            .error {
                color: #ff0000;
            }
            
            .success {
                color: #00ff00;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
        
        // Add terminal to document
        document.body.appendChild(terminal);
        
        // Show terminal
        terminal.classList.add('active');
        
        // Focus input
        const input = document.getElementById('simple-terminal-input');
        if (input) {
            input.focus();
        }
        
        // Add event listener to close button
        const closeButton = terminal.querySelector('.terminal-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                terminal.classList.remove('active');
            });
        }
        
        // Add event listener to input
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const command = input.value.trim();
                    
                    // Add command to output
                    const output = terminal.querySelector('.terminal-output');
                    const commandLine = document.createElement('p');
                    commandLine.innerHTML = `<span class="terminal-prompt">hackeur@lycee-jp:~$</span> ${command}`;
                    output.appendChild(commandLine);
                    
                    // Process command
                    processCommand(command, output);
                    
                    // Clear input
                    input.value = '';
                    
                    // Scroll to bottom
                    output.scrollTop = output.scrollHeight;
                }
            });
        }
        
        // Process terminal commands
        function processCommand(command, output) {
            const commands = {
                'help': () => {
                    const helpText = document.createElement('p');
                    helpText.innerHTML = `
                        Commandes disponibles :<br>
                        <span class="success">help</span> - Affiche cette aide<br>
                        <span class="success">clear</span> - Efface l'écran<br>
                        <span class="success">echo [texte]</span> - Affiche le texte<br>
                        <span class="success">date</span> - Affiche la date et l'heure<br>
                        <span class="success">whoami</span> - Affiche l'utilisateur actuel<br>
                        <span class="success">ls</span> - Liste les fichiers<br>
                        <span class="success">matrix</span> - Active l'effet Matrix<br>
                        <span class="success">exit</span> - Ferme le terminal
                    `;
                    output.appendChild(helpText);
                },
                'clear': () => {
                    output.innerHTML = '';
                },
                'echo': (args) => {
                    const echoText = document.createElement('p');
                    echoText.textContent = args.join(' ');
                    output.appendChild(echoText);
                },
                'date': () => {
                    const dateText = document.createElement('p');
                    dateText.textContent = new Date().toLocaleString();
                    output.appendChild(dateText);
                },
                'whoami': () => {
                    const whoamiText = document.createElement('p');
                    whoamiText.textContent = 'élève@lycee-jean-prevost';
                    output.appendChild(whoamiText);
                },
                'ls': () => {
                    const lsText = document.createElement('p');
                    lsText.innerHTML = `
                        <span class="success">index.html</span><br>
                        <span class="success">visite.html</span><br>
                        <span class="success">mini-jeux.html</span><br>
                        <span class="success">solution.html</span><br>
                        <span class="success">final.html</span><br>
                        <span class="success">credits.html</span><br>
                        <span class="success">ressources.html</span><br>
                        <span class="success">archives.html</span><br>
                        <span class="success">css/</span><br>
                        <span class="success">js/</span><br>
                        <span class="success">images/</span><br>
                        <span class="success">data/</span>
                    `;
                    output.appendChild(lsText);
                },
                'matrix': () => {
                    const matrixText = document.createElement('p');
                    matrixText.textContent = 'Activation de l\'effet Matrix...';
                    output.appendChild(matrixText);
                    
                    // Check if matrix-rain.js is loaded
                    if (typeof window.toggleMatrixRain === 'function') {
                        window.toggleMatrixRain();
                        
                        const successText = document.createElement('p');
                        successText.className = 'success';
                        successText.textContent = 'Effet Matrix activé !';
                        output.appendChild(successText);
                    } else {
                        const errorText = document.createElement('p');
                        errorText.className = 'error';
                        errorText.textContent = 'Erreur : matrix-rain.js non chargé.';
                        output.appendChild(errorText);
                    }
                },
                'exit': () => {
                    terminal.classList.remove('active');
                },
                'default': () => {
                    const errorText = document.createElement('p');
                    errorText.className = 'error';
                    errorText.textContent = `Commande non reconnue : ${command}. Tapez 'help' pour voir les commandes disponibles.`;
                    output.appendChild(errorText);
                }
            };
            
            // Parse command and arguments
            const parts = command.split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);
            
            // Execute command
            if (cmd === 'echo') {
                commands.echo(args);
            } else if (commands[cmd]) {
                commands[cmd]();
            } else {
                commands.default();
            }
        }
    }
}
