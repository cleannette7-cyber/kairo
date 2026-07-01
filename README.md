# KAIRO LEATHER — Site boutique statique

## Contenu
- `index.html` : page boutique premium
- `assets/css/style.css` : design complet
- `assets/js/app.js` : produits, panier, quantités, suppression
- `admin/admin.html` : espace admin local
- `admin/admin.js` : ajout / modification / suppression produits
- `assets/images/` : images produits
- `assets/logo/logo.png` : logo compressé
- `_redirects` et `_headers` : fichiers Netlify

## Admin
Mot de passe : `admin123`

Les modifications produits sont sauvegardées dans le navigateur via `localStorage`. Pour une vraie boutique en ligne avec commandes et paiements réels, il faudra connecter une base de données et Stripe.

## Paiement carte bancaire
Le bouton est prêt visuellement. Pour encaisser réellement : intégrer Stripe Checkout côté serveur ou via une fonction Netlify.

## Déploiement Netlify
Publier le dossier complet à la racine. Pas de build nécessaire.
