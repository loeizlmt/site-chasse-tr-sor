# Chasse au Trésor - Lycée Jean Prévost

Un site web interactif pour une chasse au trésor éducative destinée aux élèves du Lycée Jean Prévost de Montivilliers, France.

## Description

Ce projet est une application web interactive développée en HTML, CSS et JavaScript pur (sans framework) qui permet aux élèves de participer à une chasse au trésor éducative à travers le lycée. Les élèves explorent des visites virtuelles, découvrent des QR codes cachés, résolvent des mini-jeux pour collecter des fragments d'une citation, puis soumettent la citation complète pour accéder à une épreuve finale créative.

## Fonctionnalités

1. **Page d'accueil** - Présentation du jeu, règles et déroulement
2. **Visites virtuelles** - Exploration de différents espaces du lycée via des visites virtuelles intégrées
3. **Mini-jeux** - 6 mini-jeux interactifs accessibles via des QR codes ou directement depuis le site
4. **Système de citation** - Collecte de fragments de citation à travers les mini-jeux
5. **Épreuve finale** - Défi créatif basé sur des extraits musicaux
6. **Stockage de progression** - Sauvegarde de l'avancement via localStorage

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (Vanilla)
- localStorage pour la persistance des données

## Structure du projet

```
site-chasse/
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   ├── index.js
│   ├── visite.js
│   ├── mini-jeux.js
│   ├── solution.js
│   ├── final.js
│   ├── logo-placeholder.js
│   ├── qr-placeholder.js
│   └── hero-placeholder.js
├── images/
│   └── (images du projet)
├── index.html
├── visite.html
├── mini-jeux.html
├── solution.html
├── final.html
├── credits.html
└── README.md
```

## Comment utiliser

1. Clonez ce dépôt ou téléchargez les fichiers
2. Ouvrez `index.html` dans votre navigateur web
3. Suivez les instructions à l'écran pour commencer l'aventure

Aucun serveur n'est nécessaire pour exécuter ce projet, il fonctionne entièrement côté client.

## Personnalisation

Pour adapter ce projet à votre établissement :

1. Modifiez les informations du lycée dans les fichiers HTML
2. Remplacez les URL des visites virtuelles dans `js/script.js` (variable `visitsData`)
3. Personnalisez la citation à reconstituer dans `js/script.js` (variable `quoteData`)
4. Ajoutez vos propres extraits musicaux dans `js/script.js` (variable `musicData`)
5. Remplacez les images par celles de votre établissement

## Crédits

Développé pour le Lycée Jean Prévost de Montivilliers, France.

## Licence

Ce projet est disponible sous licence MIT. Voir le fichier LICENSE pour plus de détails.
