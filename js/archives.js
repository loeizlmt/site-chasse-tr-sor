/**
 * Archives JavaScript
 * Fonctionnalités pour la page d'archives historiques
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser la galerie de photos
    initGallery();
    
    // Initialiser la lightbox
    initLightbox();
    
    // Ajouter des placeholders pour les images manquantes
    addImagePlaceholders();
});

/**
 * Initialise la galerie de photos avec filtrage
 */
function initGallery() {
    // Sélectionner tous les boutons de filtre
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Sélectionner tous les éléments de la galerie
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Ajouter des écouteurs d'événements aux boutons de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Supprimer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Obtenir la catégorie à filtrer
            const filterValue = button.getAttribute('data-filter');
            
            // Filtrer les éléments de la galerie
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Ajouter une animation de fondu
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialise la lightbox pour afficher les images en grand
 */
function initLightbox() {
    // Sélectionner la lightbox et ses éléments
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    
    // Sélectionner toutes les images cliquables
    const galleryImages = document.querySelectorAll('.gallery-item img, .document-item img, .timeline-image');
    
    // Tableau pour stocker les images actuellement visibles
    let visibleImages = [];
    let currentIndex = 0;
    
    // Fonction pour ouvrir la lightbox
    function openLightbox(image, index) {
        // Mettre à jour l'image et la légende
        lightboxImg.src = image.getAttribute('data-full') || image.src;
        lightboxImg.alt = image.alt;
        
        // Trouver la légende
        let caption = '';
        if (image.closest('.gallery-item')) {
            caption = image.closest('.gallery-item').querySelector('.gallery-caption').textContent;
        } else if (image.closest('.document-item')) {
            caption = image.closest('.document-item').querySelector('.document-caption').textContent;
        } else if (image.closest('.timeline-content')) {
            const timelineItem = image.closest('.timeline-item');
            const date = timelineItem.querySelector('.timeline-date').textContent;
            const title = timelineItem.querySelector('h3').textContent;
            caption = `${title} (${date})`;
        }
        
        lightboxCaption.textContent = caption;
        
        // Afficher la lightbox
        lightbox.classList.add('active');
        
        // Mettre à jour l'index courant
        currentIndex = index;
        
        // Jouer un son si le mode hackeur est activé
        if (document.documentElement.classList.contains('hacker-theme') && typeof playSound === 'function') {
            playSound('glitch');
        }
    }
    
    // Fonction pour fermer la lightbox
    function closeLightboxFunc() {
        lightbox.classList.remove('active');
    }
    
    // Fonction pour naviguer vers l'image précédente
    function prevImage() {
        currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
        openLightbox(visibleImages[currentIndex], currentIndex);
    }
    
    // Fonction pour naviguer vers l'image suivante
    function nextImage() {
        currentIndex = (currentIndex + 1) % visibleImages.length;
        openLightbox(visibleImages[currentIndex], currentIndex);
    }
    
    // Mettre à jour la liste des images visibles
    function updateVisibleImages() {
        visibleImages = Array.from(galleryImages).filter(img => {
            const item = img.closest('.gallery-item, .document-item, .timeline-item');
            return item && window.getComputedStyle(item).display !== 'none';
        });
    }
    
    // Ajouter des écouteurs d'événements aux images
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            updateVisibleImages();
            const visibleIndex = visibleImages.indexOf(image);
            openLightbox(image, visibleIndex);
        });
    });
    
    // Ajouter des écouteurs d'événements aux boutons de navigation
    closeLightbox.addEventListener('click', closeLightboxFunc);
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);
    
    // Fermer la lightbox en cliquant en dehors de l'image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightboxFunc();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
}

/**
 * Ajoute des placeholders pour les images manquantes
 */
function addImagePlaceholders() {
    // Sélectionner toutes les images
    const images = document.querySelectorAll('img');
    
    // Ajouter un écouteur d'événement pour les erreurs de chargement
    images.forEach(img => {
        img.addEventListener('error', () => {
            // Remplacer l'image par un placeholder
            img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22500%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20500%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A25pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22500%22%20height%3D%22300%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22185.125%22%20y%3D%22157.1%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
            img.alt = 'Image non disponible';
            
            // Ajouter une classe pour le style
            img.classList.add('placeholder-image');
            
            // Ajouter un message dans la console
            console.log('Image non disponible:', img.getAttribute('data-full') || img.src);
        });
    });
    
    // Ajouter des styles pour les placeholders
    const style = document.createElement('style');
    style.textContent = `

        
        .hacker-theme .placeholder-image {
            filter: hue-rotate(120deg) grayscale(50%);
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Crée un effet de vieille photo pour les images d'archives
 * Cette fonction est appelée si le mode hackeur est activé
 */
function applyVintageEffect() {
    // Sélectionner toutes les images
    const images = document.querySelectorAll('.gallery-item img, .document-item img, .timeline-image');
    
    // Ajouter des styles pour l'effet vintage
    const style = document.createElement('style');
    style.textContent = `
        .vintage-effect {
            filter: sepia(70%) contrast(110%) brightness(90%) saturate(85%);
            transition: filter 0.5s;
        }
        
        .vintage-effect:hover {
            filter: sepia(0%) contrast(100%) brightness(100%) saturate(100%);
        }
        
        .hacker-theme .vintage-effect {
            filter: sepia(30%) hue-rotate(120deg) contrast(120%) brightness(80%) saturate(70%);
        }
        
        .hacker-theme .vintage-effect:hover {
            filter: sepia(0%) hue-rotate(120deg) contrast(100%) brightness(100%) saturate(100%);
        }
    `;
    document.head.appendChild(style);
    
    // Appliquer l'effet à toutes les images
    images.forEach(img => {
        img.classList.add('vintage-effect');
    });
}

// Appliquer l'effet vintage si le mode hackeur est activé
if (document.documentElement.classList.contains('hacker-theme')) {
    applyVintageEffect();
}

// Écouter les changements de thème
document.addEventListener('hackerThemeToggled', (e) => {
    if (e.detail.enabled) {
        applyVintageEffect();
    } else {
        // Supprimer l'effet vintage
        const images = document.querySelectorAll('.vintage-effect');
        images.forEach(img => {
            img.classList.remove('vintage-effect');
        });
    }
});
