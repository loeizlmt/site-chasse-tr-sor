/**
 * Matrix Rain Animation
 * Ce fichier crée une animation de "pluie de code" style Matrix en arrière-plan
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser l'animation si le mode hackeur est activé
    if (localStorage.getItem('hackerTheme') === 'enabled') {
        initMatrixRain();
    }
    
    // Écouter les changements de thème
    document.addEventListener('hackerThemeToggled', (e) => {
        if (e.detail.enabled) {
            initMatrixRain();
        } else {
            stopMatrixRain();
        }
    });
});

// Variables globales
let matrixCanvas;
let matrixCtx;
let matrixCharacters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let matrixDrops = [];
let matrixFontSize = 14;
let matrixAnimationId;
let matrixRainEnabled = false;

/**
 * Initialise l'animation de pluie de code Matrix
 */
function initMatrixRain() {
    // Vérifier si l'animation est déjà en cours
    if (matrixRainEnabled) return;
    
    // Créer le canvas
    matrixCanvas = document.createElement('canvas');
    matrixCanvas.id = 'matrix-canvas';
    matrixCanvas.style.position = 'fixed';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.width = '100%';
    matrixCanvas.style.height = '100%';
    matrixCanvas.style.zIndex = '-1';
    matrixCanvas.style.opacity = '0.1';
    matrixCanvas.style.pointerEvents = 'none';
    document.body.appendChild(matrixCanvas);
    
    // Obtenir le contexte de dessin
    matrixCtx = matrixCanvas.getContext('2d');
    
    // Définir la taille du canvas
    resizeMatrixCanvas();
    
    // Initialiser les gouttes
    initMatrixDrops();
    
    // Démarrer l'animation
    matrixRainEnabled = true;
    animateMatrixRain();
    
    // Ajouter un écouteur pour le redimensionnement de la fenêtre
    window.addEventListener('resize', handleMatrixResize);
    
    // Ajouter un contrôle pour ajuster l'opacité
    addMatrixOpacityControl();
}

/**
 * Arrête l'animation de pluie de code Matrix
 */
function stopMatrixRain() {
    // Vérifier si l'animation est en cours
    if (!matrixRainEnabled) return;
    
    // Arrêter l'animation
    cancelAnimationFrame(matrixAnimationId);
    
    // Supprimer le canvas
    if (matrixCanvas) {
        document.body.removeChild(matrixCanvas);
        matrixCanvas = null;
    }
    
    // Supprimer le contrôle d'opacité
    const opacityControl = document.getElementById('matrix-opacity-control');
    if (opacityControl) {
        document.body.removeChild(opacityControl);
    }
    
    // Supprimer l'écouteur de redimensionnement
    window.removeEventListener('resize', handleMatrixResize);
    
    // Réinitialiser les variables
    matrixRainEnabled = false;
}

/**
 * Redimensionne le canvas pour qu'il occupe tout l'écran
 */
function resizeMatrixCanvas() {
    if (!matrixCanvas) return;
    
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    // Réinitialiser les gouttes après le redimensionnement
    initMatrixDrops();
}

/**
 * Gère le redimensionnement de la fenêtre
 */
function handleMatrixResize() {
    // Utiliser un délai pour éviter trop d'appels pendant le redimensionnement
    clearTimeout(window.matrixResizeTimeout);
    window.matrixResizeTimeout = setTimeout(resizeMatrixCanvas, 100);
}

/**
 * Initialise les gouttes de code Matrix
 */
function initMatrixDrops() {
    if (!matrixCanvas) return;
    
    // Calculer le nombre de colonnes
    const columns = Math.ceil(matrixCanvas.width / matrixFontSize);
    
    // Initialiser les gouttes
    matrixDrops = [];
    for (let i = 0; i < columns; i++) {
        // Valeur initiale aléatoire pour y
        matrixDrops[i] = Math.random() * -100;
    }
}

/**
 * Anime la pluie de code Matrix
 */
function animateMatrixRain() {
    if (!matrixCanvas || !matrixCtx || !matrixRainEnabled) return;
    
    // Effacer le canvas avec un fond semi-transparent
    matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    // Définir la police et la couleur
    matrixCtx.font = matrixFontSize + 'px monospace';
    matrixCtx.fillStyle = '#00ff00';
    
    // Dessiner les caractères
    for (let i = 0; i < matrixDrops.length; i++) {
        // Choisir un caractère aléatoire
        const text = matrixCharacters.charAt(Math.floor(Math.random() * matrixCharacters.length));
        
        // Calculer la position x
        const x = i * matrixFontSize;
        
        // Calculer la position y
        const y = matrixDrops[i] * matrixFontSize;
        
        // Dessiner le caractère
        matrixCtx.fillText(text, x, y);
        
        // Réinitialiser la goutte si elle atteint le bas de l'écran
        if (y > matrixCanvas.height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
        }
        
        // Faire tomber la goutte
        matrixDrops[i]++;
    }
    
    // Continuer l'animation
    matrixAnimationId = requestAnimationFrame(animateMatrixRain);
}

/**
 * Ajoute un contrôle pour ajuster l'opacité de l'animation
 */
function addMatrixOpacityControl() {
    // Créer le contrôle
    const opacityControl = document.createElement('div');
    opacityControl.id = 'matrix-opacity-control';
    opacityControl.innerHTML = `
        <label for="matrix-opacity">Opacité Matrix:</label>
        <input type="range" id="matrix-opacity" min="0" max="30" value="10" step="1">
    `;
    
    // Ajouter les styles
    opacityControl.style.position = 'fixed';
    opacityControl.style.bottom = '70px';
    opacityControl.style.right = '20px';
    opacityControl.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    opacityControl.style.color = '#00ff00';
    opacityControl.style.padding = '5px 10px';
    opacityControl.style.borderRadius = '5px';
    opacityControl.style.zIndex = '1000';
    opacityControl.style.fontFamily = 'monospace';
    opacityControl.style.fontSize = '12px';
    opacityControl.style.display = 'flex';
    opacityControl.style.alignItems = 'center';
    opacityControl.style.gap = '10px';
    opacityControl.style.border = '1px solid #00ff00';
    
    // Ajouter le contrôle au document
    document.body.appendChild(opacityControl);
    
    // Ajouter l'écouteur d'événement
    const opacitySlider = document.getElementById('matrix-opacity');
    opacitySlider.addEventListener('input', (e) => {
        if (matrixCanvas) {
            matrixCanvas.style.opacity = e.target.value / 100;
        }
    });
}

/**
 * Fonction publique pour activer/désactiver l'animation
 */
window.toggleMatrixRain = function() {
    if (matrixRainEnabled) {
        stopMatrixRain();
    } else {
        initMatrixRain();
    }
    return matrixRainEnabled;
};

/**
 * Fonction publique pour ajuster l'opacité
 */
window.setMatrixOpacity = function(opacity) {
    if (matrixCanvas) {
        matrixCanvas.style.opacity = opacity / 100;
        const opacitySlider = document.getElementById('matrix-opacity');
        if (opacitySlider) {
            opacitySlider.value = opacity;
        }
    }
};
