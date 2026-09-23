# @aexae/comete-icons

**423 icônes** de l'écosystème Comète, exportées depuis Figma et distribuées sous forme de composants React typés. Les couleurs sont pilotées par les design tokens de `@aexae/comete-design-tokens`.

## Installation

Le package est publié sur GitHub Packages. Configurer le registry dans un `.npmrc` :

```ini
@aexae:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_AUTH_TOKEN}
```

```bash
pnpm add @aexae/comete-icons
```

Peer dependencies : `react` (18 ou 19) et `@aexae/comete-design-tokens` (^0.11.0).

## Utilisation

```tsx
import { Check, ChevronRight, Dashboard } from "@aexae/comete-icons";
import "@aexae/comete-design-tokens/css";

<Check variant="filled" color="success" size={24} />
<ChevronRight spacing="none" color="default" />
<Dashboard variant="duotone" size={32} />
```

La feuille de style des icônes (mapping `color` → token) est importée automatiquement par le barrel export : aucun import CSS supplémentaire n'est nécessaire. Elle reste accessible explicitement via `@aexae/comete-icons/styles` pour les contextes où le CSS doit être chargé séparément.

Le bundle est ESM et tree-shakeable : seules les icônes effectivement importées sont incluses.

### Registry dynamique

Pour résoudre une icône depuis un nom (string) à l'exécution :

```tsx
import { iconRegistry, type IconName } from "@aexae/comete-icons";

function DynamicIcon({ name }: { name: IconName }) {
  const Component = iconRegistry[name];
  return <Component color="brand" />;
}
```

## Props

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `variant` | `"outlined" \| "filled" \| "duotone"` | `"outlined"` | Style visuel |
| `spacing` | `"default" \| "none"` | `"default"` | ViewBox 24×24 (avec padding) ou 16×16 (sans) |
| `color` | `IconColor` | `"default"` | Couleur sémantique liée aux design tokens |
| `size` | `number` | `24` | Taille de rendu en pixels (SVG, pas de pixelisation) |
| `className` | `string` | — | Classes CSS additionnelles |

Toutes les autres props SVG (`onClick`, `aria-label`, `style`, …) sont transmises à l'élément `<svg>`. Les icônes sont `aria-hidden="true"` par défaut.

### Couleurs sémantiques

`IconColor` est généré depuis les tokens `--icon-*` de `@aexae/comete-design-tokens` :

`default` · `bold` · `subtle` · `subtlest` · `disabled` · `inverted` · `selected` · `brand` · `information` · `success` · `warning` · `critical` · `on-warning` · `day` · `night` · `accentBlueGrey` · `accentMagenta` · `accentPurple` · `accentTeal` · `accentTurquoise`

Chaque valeur applique la classe `.comete-icon--{color}` qui résout `color: var(--icon-…)`.

### Types exportés

`IconProps` · `IconName` · `IconColor` · `IconVariant` · `IconSpacing`

## Architecture

```
comete-icons/
├── scripts/
│   ├── fetch-icons.ts          # API Figma → SVG bruts dans svg/
│   ├── optimize-svg.ts         # SVGO : nettoyage + currentColor
│   ├── generate-components.ts  # SVG → composants React + CSS + types
│   └── sync-icon-colors.ts     # tokens --icon-* → icons.css + type IconColor
├── svg/{outlined,filled,duotone}/  # SVGs (gitignored, générés par fetch)
├── src/
│   ├── icons/*.tsx             # Composants générés (1 par icône)
│   ├── styles/icons.css        # Classes CSS → design tokens
│   ├── registry.ts             # Map IconName → composant
│   ├── types.ts                # IconProps, IconName, IconColor, …
│   └── index.ts                # Barrel export
└── dist/                       # Build ESM (tsup)
```

## Pipeline Figma → React

| Commande | Description |
|---|---|
| `pnpm figma:sync` | Export incrémental des SVGs depuis l'API Figma |
| `pnpm figma:sync -- --force` | Re-télécharge tous les SVGs (ignore le manifeste) |
| `pnpm optimize` | Optimise les SVGs avec SVGO (couleurs → `currentColor`) |
| `pnpm generate` | Génère les composants React, le registry et les types |
| `pnpm sync-colors` | Régénère `icons.css` et `IconColor` depuis les tokens |
| `pnpm pipeline` | `figma:sync` → `optimize` → `generate` → `build` |
| `pnpm build` | Bundle ESM tree-shakeable (tsup) |
| `pnpm typecheck` / `pnpm lint` / `pnpm test` | Validation (TypeScript, Biome, Vitest) |

L'export est incrémental : un manifeste (`svg/.manifest.json`) compare le `lastModified` du fichier Figma et les nodeIds pour ne re-télécharger que les icônes ajoutées ou modifiées. Les icônes supprimées dans Figma sont retirées automatiquement.

Le token Figma est lu depuis `FIGMA_TOKEN` (voir `.env.example`).

### Source Figma

- **Fichier** : `3rYV3P1VzRh0q22HNhgCZv` (Comète Icons Set)
- **Frame cible** : `1:965` — *"DO NOT DELETE THIS FRAME (targeted by script)"*
- **Properties** : `variant` (outlined/filled/duotone), `spacing` (default = 24 px avec padding, none = 16 px sans padding)

## Ajout d'une icône

**Depuis Figma** — ajouter l'icône dans la frame cible (3 variants × 2 spacings), la nommer `Icon/{NomEnPascalCase}`, puis `pnpm pipeline`.

**Depuis Material Symbols** (icône absente de Figma) — placer les 6 SVGs dans `svg/{outlined,filled,duotone}/{PascalName}-{24,16}.svg`, puis `pnpm optimize && pnpm generate && pnpm build`.

La procédure détaillée (URLs sources, normalisation du viewBox `0 -960 960 960`, mapping duotone) est documentée dans [`CLAUDE.md`](./CLAUDE.md).

## Règle sur les couleurs

**Aucune couleur en dur** (hex, rgb) dans les SVGs ou les composants générés — tout passe par `currentColor` ou une CSS custom property. Les tracés duotone secondaires sont mappés vers un token via `DUOTONE_COLOR_TO_TOKEN` dans `scripts/optimize-svg.ts`.

## Publication

Publication manuelle sur GitHub Packages (ce dépôt n'a pas de workflow CI de publication) :

```bash
# bump la version dans package.json, committer, puis :
NPM_AUTH_TOKEN=$(gh auth token) pnpm publish --no-git-checks
```

`gh auth token` doit porter le scope `write:packages` (sinon `gh auth refresh -h github.com -s write:packages`). `prepublishOnly` enchaîne typecheck, lint, test et build avant la publication. Aucun PAT stocké.

## Stack

React 18/19 · TypeScript strict · ESM uniquement · SVGO 3 · tsup · Biome · Vitest · Node ≥ 22

## Écosystème

| Package | Rôle |
|---|---|
| [`@aexae/comete-design-tokens`](https://github.com/aexae/comete-design-tokens) | Source des tokens `--icon-*` |
| [`@aexae/comete-design-system`](https://github.com/aexae/comete-design-system) | Consommateur (composant `Icon`, props `iconBefore`/`iconAfter`) |

## Licence

AGPL-3.0-only
