# Décisions

## 21/10/2026 : ajout de l'icône WorkRange

- **Décision** : ajout de `WorkRange` (Figma node 1969:1124, « Période de travail / Service ») via `figma:sync` puis `optimize`/`generate --only WorkRange`.
- **Contexte** : demande d'Axel. ID Omnis attribué : 180011 (premier ID libre du classeur, page 18).

## 21/10/2026 : dictionnaire ID Omnis → icône

- **Décision** : `src/omnis.ts` exporte `omnisIcons` (`ID numérique → { name, variant?, color? }`, contrôlé par `satisfies`), `omnisUnmappedIds` et `getIconByOmnisId(id: number | string)`.
- **Contexte** : source = onglet « Liste des icônes » du classeur SharePoint « Signification et usage des icônes.xlsx ». La page Figma des usages (620:2966) ne contient pas d'ID Omnis. Elle a servi à résoudre par leur libellé les noms du classeur absents du paquet.
- **Règles retenues** :
  - Format `{ name, variant?, color? }` (choix d'Axel) : les ID d'état Omnis gardent leur sens (2515 → `CheckBox` en `disabled`, 130009 → `Star` en `filled`). Le disabled prime sur critical (toutes les couleurs suivent le disabled).
  - Noms corrigés seulement avec une preuve Figma (même libellé) : `NotificationAdd→NotificationsAdd`, `ArrowBackwardIos→ArrowBackwardIosNew`, `Orders→Order`, `Ai→Sparkle`, `Forms→FormEdit`, `Break→ClockingBreak`. Correction portée dans le classeur plutôt que par une table d'alias dans le code.
  - `Done`, `BrowserUpdatedNeutral`, `ExpiredSignature` laissés non mappés (choix d'Axel), suivis dans TODO.md.
  - Fichier **généré** par `pnpm sync-omnis` depuis un export CSV du classeur (instantané `data/omnis-icons.csv`), exclu de Biome, avec test de fraîcheur. Raison : éviter la dérive d'une copie figée à la main. Un nom inconnu fait échouer le script.
  - L'export Omnis est écrit par `generate-components.ts` pour survivre à la régénération de `index.ts`.

## 21/10/2026 : ajout de VisibilityAll et Security

- **VisibilityAll** (130020 « Lu par tous ») : composant Figma `Icon/AllVisibililty` (800:3559), dans un conteneur masqué (cf. « corrections Figma »). L'API Figma renvoie `null` à l'export SVG de ce nœud. SVG reconstruits depuis la géométrie vectorielle (`geometry=paths`), méthode validée en reconstruisant `WorkRange` à l'identique, puis pipeline standard `--only`. Choix d'Axel : importer sous le nom correct `VisibilityAll`.
- **Security** : présente dans la frame cible (ramenée par le sync du 21/10/2026), ajoutée pour ne pas laisser le paquet en retard sur Figma.

## 21/10/2026 : corrections des sources externes

- **Décision d'Axel** : corriger directement le classeur Excel et le fichier Figma.
- **Excel** : le fichier fait 5 Mo (limite d'écriture de l'outil SharePoint : 1 Mo) et contient des images en cellule (`richData`) qu'une bibliothèque type openpyxl détruirait. Modification de la copie OneDrive locale au niveau XML : seuls `sharedStrings.xml` et `sheet1.xml` changent, nouvelles chaînes ajoutées en fin de table. Sauvegarde préalable hors OneDrive, plus l'historique des versions SharePoint.
- **Onglet « Export »** : obsolète (onglet de travail antérieur au nouveau set, confirmé par Axel). Non modifié. Seul « Liste des icônes » fait foi.
- **Archives** : `Correspondance omnisId-svgName.csv` et le dossier `Icônes/svg` archivés par Axel.
- **CriticalDot / PositiveDot** : on corrige les libellés, pas les noms. Preuve : l'image Omnis d'origine (colonne « Old ») de 150019 est un point vert, celle de 150018 l'ancienne icône de 99990611.

## 21/10/2026 : corrections Figma

- **Cause réelle** de l'absence de `AllVisibililty` : son conteneur (800:3558) était masqué. Figma refuse d'exporter un nœud sous un parent masqué, d'où l'export `null` et l'absence au sync. La composante était bien dans la frame cible, aucun déplacement nécessaire.
- **Décision** : conteneur rendu visible (seul un autre conteneur est masqué, un doublon de `AlternateEmail`, donc pas de convention « masqué = retiré »), composant renommé `Icon/VisibilityAll`. `Icon/Emergency home` renommé `Icon/EmergencyHome` (0 instance locale, composant du paquet inchangé).
- `VisibilityAll` du paquet régénérée depuis l'export officiel, la reconstruction géométrique n'est plus utilisée.

## 21/10/2026 : icône masquée = icône non validée (règle d'Axel)

- **Règle** : dans Figma, une icône masquée (elle ou l'un de ses conteneurs) est une icône pas encore validée. Elle ne doit jamais être exportée dans le paquet.
- **Conséquences** :
  - Annule la décision « conteneur rendu visible » ci-dessus : 800:3558 remasqué. Le renommage `Icon/VisibilityAll` (correction de la faute) est conservé.
  - `VisibilityAll` retirée du paquet (composant, `index.ts`, `types.ts`, `registry.ts`, cache `svg/`, manifeste). 130020 passe dans `KNOWN_UNMAPPED_IDS`.
  - `fetch-icons.ts` ignore désormais tout sous-arbre `visible: false`. Avant, l'exclusion n'était qu'un effet de bord (export Figma vide, compté comme erreur).
