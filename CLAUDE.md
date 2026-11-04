# CLAUDE.md

## Contexte

`@aexae/comete-icons` est la bibliothèque d'icônes React de l'écosystème Comète.
Les icônes proviennent du fichier Figma `Comète Icons Set` et sont exportées en SVG optimisé
puis transformées en composants React typés avec support des design tokens de couleur.

## Architecture

```
comete-icons/
├── scripts/
│   ├── fetch-icons.ts          # API Figma → SVG bruts dans svg/
│   ├── optimize-svg.ts         # SVGO : nettoyage + currentColor
│   └── generate-components.ts  # SVG → composants React + CSS + types
├── svg/{outlined,filled,duotone}/  # SVGs (gitignored, générés par fetch)
├── src/
│   ├── icons/*.tsx             # Composants générés (1 par icône)
│   ├── styles/icons.css        # Classes CSS → design tokens
│   ├── types.ts                # IconProps, IconColor, IconSpacing, IconVariant
│   ├── utils.ts                # getIconClass()
│   └── index.ts                # Barrel export
└── dist/                       # Build ESM (tsup)
```

## Commandes

| Commande | Description |
|---|---|
| `pnpm figma:sync` | Export incrémental des SVGs depuis Figma (ne re-télécharge que les changements) |
| `pnpm figma:sync -- --force` | Re-télécharge tous les SVGs (ignore le cache/manifeste) |
| `pnpm figma:sync -- --debug` | Mode debug : affiche l'arbre Figma pour diagnostic |
| `pnpm optimize` | Optimise les SVGs avec SVGO (`--only Nom[,Nom]` pour cibler) et **échoue** s'il reste une couleur en dur |
| `pnpm generate` | Génère les composants React depuis les SVGs (`--only Nom[,Nom]` pour cibler) et **échoue** s'il reste une couleur en dur |
| `pnpm sync-colors` | Génère `src/styles/icons.css` + l'union `IconColor` depuis comete-design-tokens (seul propriétaire de ces deux sorties) |
| `pnpm sync-tags` | Génère `src/tags.ts` (tags de recherche) depuis `data/icon-tags.csv` et renormalise ce CSV. Échoue si le CSV ne couvre pas exactement les icônes du paquet |
| `pnpm figma:descriptions` | Produit en JSON la description Figma de chaque icône (ID Omnis + tags), à appliquer via le MCP Figma (`use_figma`) |
| `pnpm sync-omnis [export.csv]` | Génère `src/omnis.ts` (ID Omnis → icône) depuis `data/omnis-icons.csv` ou un export CSV du classeur (qui remplace alors l'instantané). Échoue si un nom est absent du paquet |
| `pnpm omnis:script --only Nom --omnis-id ID` | Génère le script d'import Omnis `ajout_icon_Nom_ID.txt` (PNG 16 px outlined + 32 px duotone encodés pour `#ICONS`). Voir « Génération du script d'import Omnis » |
| `pnpm pipeline` | fetch → optimize → generate (chaîne complète) |
| `pnpm build` | Build ESM avec tsup |

## Figma

- **Fichier** : `3rYV3P1VzRh0q22HNhgCZv` (Comète Icons Set)
- **Frame cible** : `1:965` — nommée **"DO NOT DELETE THIS FRAME (targeted by script)"**
- **Properties des composants** : `variant` (outlined/filled/duotone), `spacing` (default=24px avec padding, none=16px sans padding)

## Couleurs

**Règle absolue : ne jamais utiliser de couleur en dur (hex, rgb, etc.) dans les SVGs ou composants générés.** Toutes les couleurs doivent passer par des design tokens CSS (`var(--token)`). Si un token manque, demander à l'utilisateur avant de procéder.

Cette règle est **vérifiée mécaniquement** à trois niveaux :
- `pnpm optimize` échoue s'il reste un hex/rgb dans un SVG optimisé (liste les fichiers fautifs) ;
- `pnpm generate` échoue si un composant généré contient un hex/rgb ;
- `src/no-hardcoded-colors.test.ts` (dans `pnpm test`, donc dans `prepublishOnly` et la CI) échoue si un composant de `src/icons/` ou `src/styles/icons.css` contient un hex/rgb.

**Tokens interdits dans une icône** : `--icon-selected` (couleur d'interaction, portée par le composant hôte). La garde le refuse au même titre qu'un hex.

Pour résoudre un échec : chercher la valeur hex dans `comete-design-tokens/build/css/comete-tokens.css` (bloc `:root`, thème clair), préférer un token `--icon-*` (ou `--logo-*` pour les icônes produit Comète), l'ajouter dans `DUOTONE_COLOR_TO_TOKEN` de `scripts/optimize-svg.ts`, relancer `optimize` + `generate`. Ne jamais deviner un token : sans correspondance, demander.

- **Outlined / Filled** : tous les tracés utilisent `currentColor` (contrôlé par la prop `color` → classe CSS → token `--icon-*`)
- **Duotone** : deux couches de couleur :
  - Tracés **primaires** (couleur Figma `#455D84` = `--icon-default`) → `currentColor`
  - Tracés **secondaires** : couleur d'accent mappée vers un token CSS. Le mapping de référence est `DUOTONE_COLOR_TO_TOKEN` dans `scripts/optimize-svg.ts` (ex. `#E12121` → `var(--icon-critical)`, `#009B60` → `var(--icon-success)`, `#8270DB` → `var(--icon-accent-purple)`). Les dégradés des icônes produit Comète utilisent `--logo-comete-gradient-light/dark` et `--logo-comete-neutral`.
- La prop `color` mappe vers les CSS custom properties de `@aexae/comete-design-tokens` : `--icon-default`, `--icon-success`, etc.

### `src/styles/icons.css` et l'union `IconColor` appartiennent à `sync-icon-colors.ts`

Le fichier `src/styles/icons.css` (mapping `color` → token, ex. `.comete-icon--accentBlueGrey`) et l'union `IconColor` de `src/types.ts` sont la sortie de **`pnpm sync-colors`**, qui les dérive des tokens `--icon-*` de comete-design-tokens.

`pnpm generate` **n'écrit jamais** `icons.css` et **préserve** l'union `IconColor` existante (il la relit depuis `types.ts` avant de régénérer l'union `IconName`). Ajouter/retirer une icône ne change donc jamais `icons.css`. Relancer `pnpm sync-colors` uniquement quand comete-design-tokens ajoute ou retire un token `--icon-*`.

## Export incrémental

Le script `fetch-icons.ts` utilise un manifeste (`svg/.manifest.json`) pour tracker l'état des icônes :

- **Première exécution** : téléchargement complet, création du manifeste
- **Exécutions suivantes** : compare le `lastModified` du fichier Figma avec le manifeste
  - Si identique → skip complet (aucun appel API supplémentaire)
  - Si différent → récupère l'arbre, compare les nodeIds pour détecter ajouts/suppressions/modifications
- **`--force`** : ignore le manifeste et re-télécharge tout

### ⚠️ Icône masquée = non validée (règle absolue)

Dans Figma, une icône masquée (elle ou l'un de ses conteneurs) n'est **pas encore validée** : elle ne doit jamais être exportée. `fetch-icons.ts` ignore tout sous-arbre `visible: false`. Ne jamais démasquer une icône dans Figma, ni l'ajouter à la main au paquet, sans validation explicite.

### ⚠️ Pipeline ADDITIF (règle absolue)

Le pipeline **ajoute** les icônes présentes dans Figma et absentes du repo, mais **ne supprime JAMAIS** une icône présente dans le repo et absente de Figma :

- `fetch-icons.ts` ne supprime plus les SVG « obsolètes » : il les **conserve** et les rapporte seulement (`… absentes de Figma (conservées)`).
- `generate-components.ts` **unionne** les icônes de `svg/` (Figma) avec les composants déjà présents dans `src/icons/*.tsx` → le jeu d'icônes du paquet ne rétrécit jamais (robuste même en `--force`/fresh clone).
- Retirer une icône est donc une opération **manuelle et explicite** (supprimer son `.tsx` + les entrées `index.ts`/`types.ts`/`registry.ts`), jamais un effet de bord du sync — et c'est un changement **cassant**.

## Convention de nommage

Les noms d'icônes sont en PascalCase, identiques aux noms dans Figma (ex: `ConfirmationNumber`, `ChevronLeft`).
Fichiers SVG : `{IconName}-{16|24}.svg`

## Ajout d'une nouvelle icône depuis Figma

1. Ajouter l'icône dans la frame **"DO NOT DELETE THIS FRAME (targeted by script)"** du fichier Figma (3 variants × 2 spacings)
2. Nommer la frame de l'icône `Icon/{NomEnPascalCase}` avec des instances portant les properties `variant` et `spacing`
3. `FIGMA_TOKEN=xxx pnpm figma:sync` (⚠️ pas `pnpm fetch`, commande built-in de pnpm ; le token est lu depuis **`FIGMA_TOKEN`**, le `.env` peut la définir). Le sync remplit le cache local `svg/` (gitignoré) avec **tout** le fichier Figma, y compris des icônes volontairement non ajoutées au paquet.
4. `pnpm optimize --only NomEnPascalCase && pnpm generate --only NomEnPascalCase` (plusieurs noms séparés par des virgules). Le filtre `--only` ne touche que l'icône visée : les autres composants, `index.ts`, `types.ts`, `registry.ts` et `icons.css` restent inchangés. Le diff attendu est exactement : `src/icons/Nom.tsx` + une ligne dans chacun de `index.ts`, `types.ts` (union `IconName`), `registry.ts` (import + map). Ne jamais lancer `optimize`/`generate` **sans** `--only` pour un ajout ciblé.
5. Ajouter une rangée `Nom;tag | tag` dans `data/icon-tags.csv` (usages métier, cf. « Tags de recherche ») puis `pnpm sync-tags`
6. `pnpm typecheck && pnpm lint && pnpm test && pnpm build`
7. Si l'icône a un ID Omnis : `pnpm omnis:script --only NomEnPascalCase --omnis-id ID` (cf. « Génération du script d'import Omnis ») et livrer le `.txt`
8. Commit, bump de version, tag `v<version>` → la CI publie (cf. Publication)

## Ajout d'une icône Material Symbols (hors Figma)

Quand une icône provient de Material Symbols et n'est pas dans le fichier Figma :

### Source des SVGs

- **Repo GitHub** (source de vérité, SVGs à jour) :
  - Outlined : `https://raw.githubusercontent.com/google/material-design-icons/master/symbols/web/{nom_underscore}/materialsymbolsoutlined/{nom_underscore}_24px.svg`
  - Filled (FILL=1) : `https://raw.githubusercontent.com/google/material-design-icons/master/symbols/web/{nom_underscore}/materialsymbolsoutlined/{nom_underscore}_fill1_24px.svg`
- **API Google Fonts** (fallback, ⚠️ certains SVGs sont obsolètes — ex: `task_alt` retournait une pilule au lieu d'un cercle) :
  - Outlined : `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/{nom_underscore}/default/24px.svg`
  - Filled (FILL=1) : `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/{nom_underscore}/fill1/24px.svg`
- **Noms** : Google utilise des underscores (`wifi_off`), le DS utilise PascalCase (`WifiOff`)
- **Ne PAS utiliser les variantes `-rounded` d'Iconify comme filled** — ce sont des variantes de forme, pas de remplissage
- **Toujours vérifier visuellement** que le SVG téléchargé correspond à ce qu'on voit sur https://fonts.google.com/icons

### Variantes outlined vs filled

Material Symbols a un paramètre `FILL` (0 = outlined, 1 = filled). Certaines icônes n'ont pas de différence visuelle entre les deux (ex: `tune`, `wifi`, `collapse_all`, `unfold_less`). Dans ce cas, utiliser les mêmes paths pour outlined et filled (c'est le comportement normal).

Pour les icônes ayant un vrai filled (ex: `description`, `label`, `event`, `inbox`, `rocket_launch`), le filled a des formes pleines/solides au lieu de simples contours.

### Normalisation du viewBox

Les SVGs Google Fonts utilisent `viewBox="0 -960 960 960"`. Pour les normaliser en `0 0 24 24` (ou `0 0 16 16`), encapsuler les paths dans un `<g>` avec transform :

```xml
<!-- 24px -->
<svg viewBox="0 0 24 24">
  <g transform="scale(0.025) translate(0,960)">
    <path fill="currentColor" d="...paths Google Fonts..."/>
  </g>
</svg>

<!-- 16px -->
<svg viewBox="0 0 16 16">
  <g transform="scale(0.016667) translate(0,960)">
    <path fill="currentColor" d="...paths Google Fonts..."/>
  </g>
</svg>
```

SVGO aplati automatiquement les transforms lors de l'optimisation.

**Important** : toujours ajouter `fill="currentColor"` aux paths avant l'optimisation (les SVGs Google Fonts n'en ont pas par défaut).

### Variante duotone

Pour les icônes Material Symbols ajoutées manuellement, utiliser les paths outlined avec `fill="#455D84"` (couleur primaire duotone). Si l'icône a des éléments secondaires qui méritent une couleur d'accent, les marquer avec la couleur hex correspondante au token souhaité (ex: `#007ADA` → `var(--icon-information)`, `#856D0E` → `var(--icon-warning)`).

Le mapping hex → token est dans `scripts/optimize-svg.ts` (`DUOTONE_COLOR_TO_TOKEN`).

### Pipeline

1. Placer les 6 SVGs dans `svg/{outlined,filled,duotone}/{PascalName}-{24,16}.svg`
2. `pnpm optimize --only PascalName` → `pnpm generate --only PascalName` → `pnpm build`
3. `npx biome check --write .` (les fichiers auto-générés nécessitent un fix d'imports)
4. Ajouter une rangée dans `data/icon-tags.csv` puis `pnpm sync-tags`
5. `pnpm typecheck && pnpm lint && pnpm test`
6. Si l'icône a un ID Omnis : `pnpm omnis:script --only PascalName --omnis-id ID` (cf. « Génération du script d'import Omnis ») et livrer le `.txt`
7. Commit, bump de version, tag `v<version>` → la CI publie (cf. Publication)

## Dictionnaire ID Omnis (`src/omnis.ts`)

- **Généré** par `pnpm sync-omnis`, ne jamais l'éditer à la main (exclu de Biome pour que le test de fraîcheur compare l'octet près).
- Source : onglet « Liste des icônes » du classeur SharePoint « Signification et usage des icônes.xlsx » (Design System / Icônes). Instantané versionné : `data/omnis-icons.csv`.
- Résolution : nom exact du paquet, sinon suffixes d'état `Disabled` → `color: "disabled"` (prime), `Critical` → `color: "critical"`, `Filled` → `variant: "filled"`.
- Un nom inconnu fait échouer le script, sauf ID listé dans `KNOWN_UNMAPPED_IDS` (`src/omnis-build.ts`). Corriger le classeur ou ajouter l'icône, jamais deviner.
- Après l'ajout d'une icône qui a un ID Omnis : renseigner l'ID dans le classeur, exporter en CSV, `pnpm sync-omnis export.csv`.
- Sources **obsolètes**, à ne jamais utiliser : onglet « Export » du classeur, `Correspondance omnisId-svgName.csv` et dossier `Icônes/svg` (archivés).

## Tags de recherche (`data/icon-tags.csv` → `src/tags.ts`)

- **Source de vérité** : `data/icon-tags.csv` (`Nom;Tags`, tags séparés par `|`), modifié à la main et relu en PR. `src/tags.ts` est **généré** par `pnpm sync-tags` (exclu de Biome, test de fraîcheur).
- **Une rangée par icône du paquet**, tags éventuellement vides : une icône ajoutée sans rangée, ou une rangée dont l'icône a été renommée, fait échouer le script et les tests.
- **Contenu attendu** : significations et usages métier dans Comète (« Montant », « Code de pointage »), synonymes. **Jamais les endroits où l'icône apparaît** (« Fenêtre agent », « Raccourcis personnels », « Plateforme ») : ce sont les sous-titres gris de la page Figma, des exemples d'usage, pas des tags (règle d'Axel, 04/11/2026). Pas le nom technique (déjà cherché). Pas de chemin d'accès à une fonctionnalité (« Plan. > Menu vacation ») : refusé par le script (`>`, `›`, `»`, `→`). En français.
- **Amorçage (30/10/2026, refait le 04/11/2026 sans les exemples)** : colonne « Signification » du classeur (hors lignes « Remplacé par… » et mentions « remplacer par ») + titre noir et section de chaque icône sur la page Figma 620:2966. Le sous-titre gris (exemple d'usage) est exclu. Le CSV est ensuite l'unique source : ne pas réamorcer depuis ces sources, cela écraserait les corrections.
- `searchIcons(query)` (`src/search.ts`) cherche dans le nom, les tags et les ID Omnis, sans accents ni casse. N'importe que des données, jamais les composants.
- **Descriptions Figma** : la description de chaque `Icon/<Nom>` visible contient `Omnis : …` et `Tags : …` (cherchable dans le panneau Assets). Après toute modification du CSV ou des ID Omnis : `pnpm figma:descriptions > descriptions.json`, puis un script `use_figma` qui affecte `description` aux COMPONENT_SET visibles de la page « ❖ Icons » (l'API REST ne sait pas écrire les descriptions). Ne jamais toucher aux composants masqués. Publier ensuite la bibliothèque.

## Génération du script d'import Omnis (`pnpm omnis:script`)

L'application historique Omnis stocke ses icônes en bitmaps dans la classe `#ICONS`. Pour qu'une icône du paquet y soit disponible, on génère un **script notation Omnis** qui importe le PNG de l'icône via `oIcons.$import_icon(id,bin,taille)`. Ce script reproduit la méthode `W_SCRIPT/script_icon` du code Omnis (blocs `;<replace><C_SCRIPTS/executed>` / `;<do>executed</do>`, PNG encodé hex par paquets de 5000 octets).

```bash
pnpm omnis:script --only Service --omnis-id 180011
# → ajout_icon_Service_180011.txt dans « scripts by claude »
```

- **Deux tailles importées** dans `#ICONS`, exactement ce qu'attend Omnis (16 / 32 / 48 px, pas de 24) :
  - **16 px** : variante **outlined**, spacing **none** (`svg/outlined/Nom-16.svg`).
  - **32 px** : variante **duotone**, spacing **default** (`svg/duotone/Nom-24.svg`), la glyphe 24 px centrée dans un canevas 32 px.
- **Couleurs** résolues en hex depuis le CSS compilé de comete-design-tokens (thème clair, même source que `sync-colors`) : `currentColor` → `--icon-default`, `var(--icon-*)` → sa valeur. Jamais de couleur devinée (échoue si le token est absent).
- **ID Omnis jamais deviné** : `--omnis-id` est obligatoire et doit provenir du classeur SharePoint. Le script avertit si le couple (ID, nom) diverge de `data/omnis-icons.csv`, mais **n'écrit pas** le classeur (il reste la source) : pour la résolution `getIconByOmnisId`, renseigner le classeur puis `pnpm sync-omnis`.
- **Format Comète** (cf. skill `script-omnis-comete`) : ligne 1 obligatoire `;<#>6829</#>` + base64 d'une description HTML (UTF-8), sinon Comète refuse le script (« Format de script incorrect »). Le chargeur `C_SCRIPTS` ne valide que ce préambule ; la description (par défaut « Ajout de l'icône … », surchargeable par `--description`) est informative. Corps en Windows-1252, lignes séparées par CR seul, sans BOM. Vérifier le script produit avec l'outil de la skill (`python omnis_script.py <script.txt>`) et **W_ANALYSE_SCRIPT** avant exécution dans Omnis (il écrase toute modif postérieure à l'export).
- **Prérequis** : les SVG optimisés doivent exister dans `svg/` (lancer `pnpm optimize --only Nom` avant). Le dépôt `comete-design-tokens` doit être cloné en voisin et buildé.
- **Destination** : `$OMNIS_SCRIPTS_DIR`, sinon le dossier « scripts by claude » (surchargeable par `--out-dir`). Fichier nommé `ajout_icon_<Nom>_<ID>.txt`.

> **Étape de pipeline** : à tout ajout ou remplacement d'icône destinée à Omnis, après `optimize`/`generate`, lancer `pnpm omnis:script --only Nom --omnis-id ID` et livrer le `.txt` produit à l'équipe Omnis.
