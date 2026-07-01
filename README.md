# KAIRO LEATHER — Version développée depuis le ZIP modifié

## Pages
- `index.html` : entrée Homme / Femme
- `homme.html` : boutique Homme
- `femme.html` : boutique Femme
- `admin/admin.html` : espace Admin

## Admin
Mot de passe : `admin123`

Fonctions ajoutées :
- ajout / modification / suppression de produits
- choix univers : Homme / Femme / Mixte
- modification du prix, stock, image, badge, avis, description
- gestion des variantes couleur par produit
- variantes enregistrées dans le panier
- couleurs cliquables sur les fiches produits

Format des variantes dans l'admin :
`Nom|Code couleur|Image|Prix optionnel`

Exemple :
`Noir|#15110e|voyageur.jpg|29.90`

## Fichiers importants
- `assets/css/style.css`
- `assets/js/app.js`
- `assets/images/`
- `assets/logo/logo.png`
- `_headers`
- `_redirects`

## Déploiement Netlify
Déposer le dossier complet à la racine. Aucun build nécessaire.
