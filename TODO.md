# TODO

## Dictionnaire Omnis (`src/omnis.ts`)

### Ouvert

- **130020 `VisibilityAll` « Lu par tous »** : icône masquée dans Figma, donc non validée. Hors paquet et hors dictionnaire (`KNOWN_UNMAPPED_IDS`) tant qu'elle n'est pas validée et rendue visible. Le classeur la référence déjà.
- **3 ID sans icône, en attente d'arbitrage design** (laissés non mappés à la demande, liste `KNOWN_UNMAPPED_IDS` de `src/omnis-build.ts`) :
  - 150005 `Done` « Fait » : piste `Check` (Figma l'utilise pour « Bouton valider »).
  - 160019 `BrowserUpdatedNeutral` « Exécuter un script » : piste `BrowserUpdated` en couleur neutre (`subtle`).
  - 180010 `ExpiredSignature` « Signature expirée » : Figma utilise provisoirement `DocumentIsSigned` (déjà « Document signé », 130001). Icône dédiée à dessiner, ou `DocumentIsSigned` en `critical`.
- **Figma, bibliothèque à publier** : les renommages `Icon/VisibilityAll` (masquée) et `Icon/EmergencyHome` ne parviennent aux fichiers consommateurs qu'après publication de la bibliothèque Comète icons (action manuelle dans Figma).
- **Figma, `AlternateEmail` (173:1769) a une variante `variant=colored`** non gérée par le pipeline (pas de dossier `svg/colored/`) : le sync `--force` échoue sur 2 fichiers. Variante à retirer de Figma, ou à prendre en charge dans `fetch-icons.ts` si elle est voulue. Le doublon masqué (620:4943) est désormais ignoré par le sync.

### Résolu (21/10/2026)

- Classeur corrigé (copie OneDrive, XML des seules cellules visées, images en cellule préservées) : 6 noms alignés sur le paquet, ligne 180011 `WorkRange`, `Gif` « Fichier GIF », libellés 150018/150019 inversés. Instantané `data/omnis-icons.csv` vérifié identique au classeur.
- `Correspondance omnisId-svgName.csv` et dossier `Icônes/svg` (export de janvier 2025) archivés par Axel.
- Onglet « Export » du classeur : obsolète d'après Axel (onglet de travail antérieur au nouveau set). Ne pas l'utiliser comme source. Piste : le supprimer ou le renommer « Export (obsolète) » pour éviter toute confusion.
- **150018 / 150019** : libellés corrigés (noms confirmés par l'image Omnis d'origine en colonne « Old » : point vert en 150019, ancienne icône de 99990611 en 150018).
- Les états Omnis (cases à cocher disabled/critical, `StarFilled`) sont restitués par `variant` / `color` au lieu d'être perdus.
- `WorkRange` reçoit l'ID 180011.
- Sync : les nœuds masqués dans Figma (icône non validée) sont explicitement exclus par `fetch-icons.ts`, au lieu d'échouer par hasard à l'export.
- Dictionnaire généré par `pnpm sync-omnis` depuis un export CSV du classeur, avec test de fraîcheur et échec sur nom inconnu (fin de la copie figée à la main).
- `Security` (présente dans la frame Figma, jamais ajoutée) ajoutée au paquet.
- Figma : `Icon/AllVisibililty` renommée `Icon/VisibilityAll` (reste masquée, non validée). `Icon/Emergency home` renommée `Icon/EmergencyHome`.
- Doublons d'ID du classeur (`DateRange` 7009/180008, cases à cocher) : pas un défaut, plusieurs ID peuvent désigner la même icône. Un ID en double, lui, fait échouer le script.
