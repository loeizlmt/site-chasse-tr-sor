/**
 * Dropdown Menu JavaScript
 * Gère le comportement du menu déroulant, notamment sur les appareils mobiles
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le menu déroulant
    initDropdownMenu();
});

/**
 * Initialise le menu déroulant
 */
function initDropdownMenu() {
    // Sélectionner tous les éléments dropdown
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Pour chaque dropdown, ajouter un écouteur d'événements
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        // Si on est sur mobile, ajouter un écouteur de clic pour ouvrir/fermer le menu
        if (window.innerWidth <= 767 && toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Fermer tous les autres dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Basculer l'état du dropdown actuel
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Ajouter un écouteur pour les changements de taille de fenêtre
    window.addEventListener('resize', () => {
        // Si on passe en mode desktop, supprimer la classe active de tous les dropdowns
        if (window.innerWidth > 767) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Fermer les dropdowns lorsqu'on clique en dehors
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 767) {
            // Vérifier si le clic est en dehors d'un dropdown
            const isOutsideDropdown = !e.target.closest('.dropdown');
            
            if (isOutsideDropdown) {
                // Fermer tous les dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Empêcher la propagation des clics à l'intérieur du dropdown
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}
