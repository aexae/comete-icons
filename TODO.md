# TODO

## Génération du script d'import Omnis (`scripts/generate-omnis-script.ts`, 30/10/2026)

- **Chemin de destination en dur** : `DEFAULT_OUT_DIR` pointe sur le Documents local d'Axel (`.../scripts by claude`). Un chemin perso figé dans un dépôt partagé est peu portable. Surchargeable par `$OMNIS_SCRIPTS_DIR` / `--out-dir`, mais à externaliser proprement (ex. `.env` non versionné) si d'autres contributeurs l'utilisent.
- **Couleurs thème clair uniquement** : le PNG est baké avec les valeurs `--icon-*` du thème clair (1re occurrence du CSS). Les icônes Omnis sont donc figées en clair. Si Omnis gère un thème sombre, prévoir une option `--theme dark`.
- **Source CSS tokens = checkout voisin** : comme `sync-colors`, le script lit `../../comete-design-tokens/build/css/comete-tokens.css`. Échoue si le dépôt voisin est absent ou non buildé (dépendance implicite entre dépôts). Envisager de lire la peer dep installée quand elle est présente.
- **Classeur non écrit automatiquement** : le script vérifie la cohérence (ID, nom) avec `data/omnis-icons.csv` mais n'y écrit pas (classeur SharePoint = source). L'ajout d'une ligne reste manuel (classeur + export CSV + `sync-omnis`). À réévaluer si on veut automatiser l'upsert CSV.
- **En-tête conforme à la skill, à valider côté Omnis** : l'en-tête `;<#>6829</#>` + base64 HTML est **byte-identique** à `entete()` de la skill `script-omnis-comete` (gabarit HTML reproduit à l'identique dans `generate-omnis-script.ts`) et le `.txt` passe `python omnis_script.py <script.txt>` (OK). Reste à exécuter **W_ANALYSE_SCRIPT** contre la librairie cible (1.5.3+) avant exécution : le script écrase toute modif postérieure à l'export (SCR-02). Note : le filigrane optionnel (nom poste + chemin lib) de `entete(poste, lib)` n'est pas renseigné (facultatif).
- **Duplication du gabarit en-tête** : le gabarit HTML + logique `entete()` est recopié de la skill (Python) vers `generate-omnis-script.ts` (TS). Si la skill fait évoluer son gabarit, les deux divergeront. Envisager un test qui compare la sortie au `entete()` de la skill quand elle est disponible.
- **Pas de test automatisé** : la génération du script (en-tête, format notation, tailles PNG, découpage hex) n'est couverte par aucun test. Ajouter un test de non-régression (snapshot du script pour une icône fixée).

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
