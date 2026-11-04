/**
 * figma-descriptions — produit la description Figma de chaque icône du paquet.
 *
 * La description d'un composant est indexée par la recherche du panneau Assets
 * de Figma : y recopier les ID Omnis et les tags permet de retrouver une icône
 * par son usage côté Figma aussi. Le CSV `data/icon-tags.csv` reste la source.
 *
 * L'API REST de Figma ne sait pas écrire les descriptions : le JSON produit est
 * appliqué par un script Plugin API (MCP Figma `use_figma`) qui affecte
 * `description` aux COMPONENT_SET nommés `Icon/<Nom>`.
 *
 * Run:
 *   pnpm figma:descriptions > descriptions.json
 */

import { getIconOmnisIds, getIconTags } from "../src/search";
import { iconTags } from "../src/tags";
import type { IconName } from "../src/types";

/** Description Figma d'une icône (chaîne vide si ni ID Omnis ni tag). */
export function renderFigmaDescription(name: IconName): string {
  const lines: string[] = [];
  const ids = getIconOmnisIds(name);
  if (ids.length > 0) lines.push(`Omnis : ${ids.join(", ")}`);
  const tags = getIconTags(name);
  if (tags.length > 0) lines.push(`Tags : ${tags.join(" | ")}`);
  return lines.join("\n");
}

const descriptions = Object.fromEntries(
  (Object.keys(iconTags) as IconName[]).map((name) => [
    name,
    renderFigmaDescription(name),
  ]),
);
console.log(JSON.stringify(descriptions, null, 2));
