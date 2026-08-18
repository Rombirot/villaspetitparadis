# Villas Petit Paradis — Guide de déploiement

## 1. Mise en ligne (5 minutes)

1. Décompressez l'archive `villas-petitparadis.zip` sur votre ordinateur.
2. Allez sur **https://app.netlify.com/drop**
3. Glissez-déposez **le dossier entier** `villas-petitparadis` (pas les fichiers un par un) dans la zone indiquée.
4. Le site est en ligne. Créez un compte gratuit pour le conserver.
5. Dans *Site configuration → Change site name*, choisissez `villas-petitparadis` pour obtenir l'adresse `villas-petitparadis.netlify.app`.

Le formulaire de contact fonctionne automatiquement : les messages arrivent dans l'onglet **Forms** de Netlify. Activez la notification par email dans *Forms → Settings → Form notifications*.

## 2. Nom de domaine (15 minutes, ~8 €/an)

1. Achetez `villaspetitparadis.fr` sur **ovh.com** ou **gandi.net**.
2. Dans Netlify : *Domain management → Add a domain*.
3. Suivez les instructions DNS affichées (copier les serveurs de noms chez OVH).
4. Le certificat HTTPS est généré automatiquement sous 24 h.

## 3. Remplacer les photos temporaires

Les photos actuelles pointent vers les serveurs Airbnb : c'est provisoire et fragile.

1. Téléchargez vos originaux depuis votre espace hôte Airbnb.
2. Redimensionnez-les à 1600 px de large (site **squoosh.app**, gratuit).
3. Nommez-les `villa01-01.jpg` à `paradis-06.jpg` et `petit-villa01-01.jpg` à `petit-paradis-06.jpg`.
4. Placez-les dans le dossier `images/`.
5. Ouvrez `assets/site.js` et remplacez chaque URL du bloc `PHOTOS` par `"images/villa01-01.jpg"` etc.
6. Reglissez le dossier sur Netlify.

## 4. À compléter avant la version définitive

- [ ] Numéros d'enregistrement des meublés (DéclaLoc → `www.declaloc.fr`)
- [ ] Mentions légales : nom, adresse, SIRET, téléphone
- [ ] Adresse email de contact (créable chez OVH avec le domaine)
- [ ] Photos originales hébergées en propre
- [ ] Inscription sur Google Search Console + envoi du `sitemap.xml`
- [ ] Création des fiches Google Business Profile (une par villa)

## 5. Structure des fichiers

```
villas-petitparadis/
├── index.html                    Accueil
├── villa-01.html                  Fiche villa 01
├── villa-02.html                  Fiche villa 02
├── la-region.html                Guide local (page SEO)
├── contact.html                  Formulaire Netlify
├── mentions-legales.html         Obligations légales + RGPD
├── sitemap.xml                   Plan du site pour Google
├── robots.txt
├── assets/
│   ├── style.css                 Toute la mise en forme
│   └── site.js                   Photos, menu, galerie
└── images/                       Vos photos (à remplir)
```

## 6. Modifier un texte

Tous les textes sont en clair dans les fichiers `.html`. Ouvrez le fichier avec un éditeur de texte (Bloc-notes, TextEdit en mode texte brut, ou VS Code), modifiez entre les balises, enregistrez en **UTF-8**, reglissez sur Netlify.

Pour changer les couleurs du site, tout se trouve en haut de `assets/style.css`, dans le bloc `:root`.
