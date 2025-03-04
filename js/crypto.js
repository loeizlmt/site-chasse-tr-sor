/**
 * Cryptographie & Cybersécurité JavaScript
 * Fonctionnalités pour la page de cryptographie et cybersécurité
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les outils cryptographiques
    initCryptographyTools();
    
    // Initialiser l'accordéon des menaces
    initThreatsAccordion();
    
    // Ajouter des effets visuels
    addVisualEffects();
});

/**
 * Initialise les outils cryptographiques interactifs
 */
function initCryptographyTools() {
    // Chiffre de César
    initCaesarCipher();
    
    // Chiffre de Vigenère
    initVigenereCipher();
    
    // Encodage Base64
    initBase64Encoding();
    
    // Générateur de hachage
    initHashGenerator();
}

/**
 * Initialise le chiffre de César
 */
function initCaesarCipher() {
    const input = document.getElementById('caesar-input');
    const shift = document.getElementById('caesar-shift');
    const encryptBtn = document.getElementById('caesar-encrypt');
    const decryptBtn = document.getElementById('caesar-decrypt');
    const result = document.getElementById('caesar-result');
    
    if (!input || !shift || !encryptBtn || !decryptBtn || !result) return;
    
    // Fonction de chiffrement de César
    function caesarCipher(text, shift, decrypt = false) {
        // Si déchiffrement, inverser le décalage
        if (decrypt) shift = (26 - shift) % 26;
        
        return text.split('').map(char => {
            // Vérifier si le caractère est une lettre
            if (/[a-zA-Z]/.test(char)) {
                // Déterminer le code ASCII de base (65 pour A, 97 pour a)
                const base = char.charCodeAt(0) < 91 ? 65 : 97;
                
                // Appliquer le chiffrement de César
                return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
            }
            // Retourner le caractère tel quel s'il n'est pas une lettre
            return char;
        }).join('');
    }
    
    // Événement de chiffrement
    encryptBtn.addEventListener('click', () => {
        const text = input.value;
        const shiftValue = parseInt(shift.value, 10);
        
        if (!text) {
            result.innerHTML = '<span class="error">Veuillez entrer un message à chiffrer.</span>';
            return;
        }
        
        const encrypted = caesarCipher(text, shiftValue);
        result.textContent = encrypted;
        
        // Ajouter un effet visuel
        result.classList.add('result-highlight');
        setTimeout(() => {
            result.classList.remove('result-highlight');
        }, 500);
    });
    
    // Événement de déchiffrement
    decryptBtn.addEventListener('click', () => {
        const text = input.value;
        const shiftValue = parseInt(shift.value, 10);
        
        if (!text) {
            result.innerHTML = '<span class="error">Veuillez entrer un message à déchiffrer.</span>';
            return;
        }
        
        const decrypted = caesarCipher(text, shiftValue, true);
        result.textContent = decrypted;
        
        // Ajouter un effet visuel
        result.classList.add('result-highlight');
        setTimeout(() => {
            result.classList.remove('result-highlight');
        }, 500);
    });
}

/**
 * Initialise le chiffre de Vigenère
 */
function initVigenereCipher() {
    const input = document.getElementById('vigenere-input');
    const key = document.getElementById('vigenere-key');
    const encryptBtn = document.getElementById('vigenere-encrypt');
    const decryptBtn = document.getElementById('vigenere-decrypt');
    const result = document.getElementById('vigenere-result');
    
    if (!input || !key || !encryptBtn || !decryptBtn || !result) return;
    
    // Fonction de chiffrement de Vigenère
    function vigenereCipher(text, key, decrypt = false) {
        // Convertir la clé en tableau de décalages
        const keyArray = key.toUpperCase().split('').map(char => char.charCodeAt(0) - 65);
        
        return text.split('').map((char, index) => {
            // Vérifier si le caractère est une lettre
            if (/[a-zA-Z]/.test(char)) {
                // Déterminer le code ASCII de base (65 pour A, 97 pour a)
                const base = char.charCodeAt(0) < 91 ? 65 : 97;
                
                // Obtenir le décalage pour cette position
                const keyIndex = index % keyArray.length;
                let shift = keyArray[keyIndex];
                
                // Si déchiffrement, inverser le décalage
                if (decrypt) shift = (26 - shift) % 26;
                
                // Appliquer le chiffrement de Vigenère
                return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
            }
            // Retourner le caractère tel quel s'il n'est pas une lettre
            return char;
        }).join('');
    }
    
    // Événement de chiffrement
    encryptBtn.addEventListener('click', () => {
        const text = input.value;
        const keyValue = key.value;
        
        if (!text) {
            result.innerHTML = '<span class="error">Veuillez entrer un message à chiffrer.</span>';
            return;
        }
        
        if (!keyValue || !/^[a-zA-Z]+$/.test(keyValue)) {
            result.innerHTML = '<span class="error">Veuillez entrer une clé valide (lettres uniquement).</span>';
            return;
        }
        
        const encrypted = vigenereCipher(text, keyValue);
        result.textContent = encrypted;
        
        // Ajouter un effet visuel
        result.classList.add('result-highlight');
        setTimeout(() => {
            result.classList.remove('result-highlight');
        }, 500);
    });
    
    // Événement de déchiffrement
    decryptBtn.addEventListener('click', () => {
        const text = input.value;
        const keyValue = key.value;
        
        if (!text) {
            result.innerHTML = '<span class="error">Veuillez entrer un message à déchiffrer.</span>';
            return;
        }
        
        if (!keyValue || !/^[a-zA-Z]+$/.test(keyValue)) {
            result.innerHTML = '<span class="error">Veuillez entrer une clé valide (lettres uniquement).</span>';
            return;
        }
        
        const decrypted = vigenereCipher(text, keyValue, true);
        result.textContent = decrypted;
        
        // Ajouter un effet visuel
        result.classList.add('result-highlight');
        setTimeout(() => {
            result.classList.remove('result-highlight');
        }, 500);
    });
}

/**
 * Initialise l'encodage Base64
 */
function initBase64Encoding() {
    const input = document.getElementById('base64-input');
    const encodeBtn = document.getElementById('base64-encode');
    const decodeBtn = document.getElementById('base64-decode');
    const result = document.getElementById('base64-result');
    
    if (!input || !encodeBtn || !decodeBtn || !result) return;
    
    // Événement d'encodage
    encodeBtn.addEventListener('click', () => {
        const text = input.value;
        
        if (!text) {
            result.innerHTML = '<span class="error">Veuillez entrer un texte à encoder.</span>';
            return;
        }
        
        try {
            const encoded = btoa(text);
            result.textContent = encoded;
            
            // Ajouter un effet visuel
            result.classList.add('result-highlight');
            setTimeout(() => {
                result.classList.remove('result-highlight');
            }, 500);
        } catch (error) {
            result.innerHTML = `<span class="error">Erreur d'encodage : ${error.message}</span>`;
        }
    });
    
    // Événement de décodage
    decodeBtn.addEventListener('click', () => {
        const text = input.value;
        
        if (!text) {
            result.innerHTML = '<span class="error">Veuillez entrer un texte à décoder.</span>';
            return;
        }
        
        try {
            const decoded = atob(text);
            result.textContent = decoded;
            
            // Ajouter un effet visuel
            result.classList.add('result-highlight');
            setTimeout(() => {
                result.classList.remove('result-highlight');
            }, 500);
        } catch (error) {
            result.innerHTML = `<span class="error">Erreur de décodage : ${error.message}</span>`;
        }
    });
}

/**
 * Initialise le générateur de hachage
 */
function initHashGenerator() {
    const input = document.getElementById('hash-input');
    const algorithm = document.getElementById('hash-algorithm');
    const generateBtn = document.getElementById('hash-generate');
    const result = document.getElementById('hash-result');
    
    if (!input || !algorithm || !generateBtn || !result) return;
    
    // Fonction de hachage
    async function generateHash(text, algorithm) {
        // Convertir le texte en tableau d'octets
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        
        // Générer le hachage
        let hashBuffer;
        switch (algorithm) {
            case 'md5':
                // MD5 n'est pas disponible nativement dans l'API Web Crypto
                // Utiliser une implémentation JavaScript simplifiée
                result.innerHTML = '<span class="info">MD5 est obsolète et non sécurisé. Utilisez SHA-256 pour une meilleure sécurité.</span><br>';
                return md5(text);
            case 'sha1':
                hashBuffer = await crypto.subtle.digest('SHA-1', data);
                break;
            case 'sha256':
                hashBuffer = await crypto.subtle.digest('SHA-256', data);
                break;
            default:
                throw new Error('Algorithme non supporté');
        }
        
        // Convertir le buffer en chaîne hexadécimale
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
    
    // Implémentation simplifiée de MD5 (pour démonstration uniquement)
    function md5(string) {
        function rotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
        
        function addUnsigned(lX, lY) {
            const lX8 = lX & 0x80000000;
            const lY8 = lY & 0x80000000;
            const lX4 = lX & 0x40000000;
            const lY4 = lY & 0x40000000;
            const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            
            if (lX4 & lY4) {
                return lResult ^ 0x80000000 ^ lX8 ^ lY8;
            }
            
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
                } else {
                    return lResult ^ 0x40000000 ^ lX8 ^ lY8;
                }
            } else {
                return lResult ^ lX8 ^ lY8;
            }
        }
        
        function F(x, y, z) { return (x & y) | ((~x) & z); }
        function G(x, y, z) { return (x & z) | (y & (~z)); }
        function H(x, y, z) { return x ^ y ^ z; }
        function I(x, y, z) { return y ^ (x | (~z)); }
        
        function FF(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        
        function GG(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        
        function HH(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        
        function II(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        
        function convertToWordArray(string) {
            let lWordCount;
            const lMessageLength = string.length;
            const lNumberOfWords_temp1 = lMessageLength + 8;
            const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            const lWordArray = Array(lNumberOfWords - 1);
            let lBytePosition = 0;
            let lByteCount = 0;
            
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            
            return lWordArray;
        }
        
        function wordToHex(lValue) {
            let wordToHexValue = "", wordToHexValue_temp = "", lByte, lCount;
            
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                wordToHexValue_temp = "0" + lByte.toString(16);
                wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
            }
            
            return wordToHexValue;
        }
        
        const x = convertToWordArray(string);
        let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;
        let S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        let S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        let S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        let S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        let k, AA, BB, CC, DD;
        
        for (k = 0; k < x.length; k += 16) {
            AA = a; BB = b; CC = c; DD = d;
            
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }
        
        return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
    }
    
    // Événement de génération de hachage
    generateBtn.addEventListener('click', async () => {
        const text = input.value;
        const selectedAlgorithm = algorithm.value;
        
        if (!text) {
            result.innerHTML = '<span class="error">Veuillez entrer un texte à hacher.</span>';
            return;
        }
        
        try {
            const hash = await generateHash(text, selectedAlgorithm);
            result.textContent = hash;
            
            // Ajouter un effet visuel
            result.classList.add('result-highlight');
            setTimeout(() => {
                result.classList.remove('result-highlight');
            }, 500);
        } catch (error) {
            result.innerHTML = `<span class="error">Erreur de hachage : ${error.message}</span>`;
        }
    });
}

/**
 * Initialise l'accordéon des menaces
 */
function initThreatsAccordion() {
    const threatItems = document.querySelectorAll('.threat-item');
    
    threatItems.forEach(item => {
        const header = item.querySelector('.threat-header');
        
        if (header) {
            header.addEventListener('click', () => {
                // Fermer tous les autres éléments
                threatItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Basculer l'état de l'élément actuel
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Ajoute des effets visuels à la page
 */
function addVisualEffects() {
    // Ajouter des styles pour l'effet de surbrillance des résultats
    const style = document.createElement('style');
    style.textContent = `
        .result-highlight {
            animation: highlight 0.5s ease-out;
        }
        
        @keyframes highlight {
            0% { background-color: rgba(52, 152, 219, 0.3); }
            100% { background-color: transparent; }
        }
        
        .hacker-theme .result-highlight {
            animation: highlight-hacker 0.5s ease-out;
        }
        
        @keyframes highlight-hacker {
            0% { background-color: rgba(0, 255, 0, 0.3); }
            100% { background-color: transparent; }
        }
        
        .error {
            color: #e74c3c;
        }
        
        .info {
            color: #3498db;
        }
        
        .hacker-theme .error {
            color: #ff0000;
        }
        
        .hacker-theme .info {
            color: #00ffff;
        }
    `;
    document.head.appendChild(style);
    
    // Ajouter des effets de survol aux cartes
    const cards = document.querySelectorAll('.principle-card, .hacker-card, .famous-hacker, .tool-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (typeof playSound === 'function' && document.documentElement.classList.contains('hacker-theme')) {
                playSound('click');
            }
        });
    });
}

// Ajouter un easter egg Konami Code
document.addEventListener('keydown', (e) => {
    // Séquence de touches : Haut, Haut, Bas, Bas, Gauche, Droite, Gauche, Droite, B, A
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    
    // Stocker la séquence de touches
    window.konamiSequence = window.konamiSequence || [];
    window.konamiSequence.push(e.key);
    
    // Limiter la séquence à la longueur du code Konami
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    // Vérifier si la séquence correspond au code Konami
    if (window.konamiSequence.join(',') === konamiCode.join(',')) {
        // Activer le mode hackeur
        if (!document.documentElement.classList.contains('hacker-theme') && typeof toggleHackerTheme === 'function') {
            toggleHackerTheme();
        }
        
        // Afficher un message
        alert('Code Konami activé ! Mode hackeur activé.');
    }
});
