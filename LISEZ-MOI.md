# CCV et calculs T16 : appli hors ligne (PWA)

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'appli (CCV + calculs T16) |
| `manifest.webmanifest` | Nom, icône et couleurs de l'appli installée |
| `sw.js` | Garde l'appli sur le téléphone pour qu'elle marche sans réseau |
| `icons/` | Icônes de l'écran d'accueil |

Gardez les fichiers ensemble, dans cette organisation.

## 1. Mettre en ligne sur GitHub Pages (gratuit, une seule fois)

1. Créez un compte sur github.com s'il n'existe pas.
2. Cliquez sur **New repository** et nommez-le par exemple `ccv`. Choisissez **Public**, puis **Create repository**.
3. Cliquez sur **uploading an existing file**, glissez tout le **contenu** du dossier (le dossier `icons` compris), puis **Commit changes**.
4. Allez dans **Settings → Pages**. Sous « Branch », choisissez `main` et `/ (root)`, puis **Save**.
5. Au bout d'une à deux minutes, l'adresse apparaît, par exemple `https://votre-nom.github.io/ccv/`.

Netlify Drop (app.netlify.com/drop) marche aussi : il suffit de glisser le dossier sur la page.

## 2. Installer sur le téléphone (connexion nécessaire une seule fois)

**iPhone / iPad**
1. Ouvrez l'adresse dans **Safari**. Les autres navigateurs iOS proposent aussi l'ajout à l'écran d'accueil depuis iOS 16.4.
2. Touchez **Partager**, puis **Sur l'écran d'accueil**, puis **Ajouter**.

**Android**
1. Ouvrez l'adresse dans **Chrome**.
2. Touchez le menu ⋮, puis **Installer l'application** (ou **Ajouter à l'écran d'accueil**).

Ouvrez l'appli une fois depuis l'icône pendant que vous avez du réseau. Ensuite, elle fonctionne en mode avion.

Astuce pour les élèves : transformez l'adresse en QR code et projetez-le en cours.

## 3. Mettre à jour l'appli

1. Remplacez `index.html` sur GitHub.
2. Dans `sw.js`, changez `ccv-t16-v1` en `ccv-t16-v2` (puis v3, v4… à chaque mise à jour).
3. Les téléphones récupèrent la nouvelle version la prochaine fois qu'ils ouvrent l'appli avec du réseau.

## À savoir

- Les annotations et les saisies sont enregistrées sur chaque téléphone, dans l'appli. Sur iPhone, l'appli installée ne partage pas ses données avec Safari.
- Les polices Barlow sont téléchargées au premier lancement avec réseau, puis gardées hors ligne. Si elles manquent, l'appli utilise une police système proche, et tout reste fonctionnel.
- Le bouton « Image » permet d'enregistrer le CCV annoté (appui long sur l'image).
