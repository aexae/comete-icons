/**
 * Recherche d'icônes par nom, tag d'usage ou ID Omnis.
 *
 * N'importe que des données (`tags.ts`, `omnis.ts`), jamais les composants :
 * l'utiliser n'embarque aucune icône dans le bundle.
 */

import { normalizeSearchText } from "./normalize";
import { omnisIcons } from "./omnis";
import { iconTags } from "./tags";
import type { IconName } from "./types";

interface SearchEntry {
  name: IconName;
  /** Nom normalisé, ex. "workrange". */
  key: string;
  /** Nom découpé en mots, ex. "work range". */
  words: string;
  tags: string[];
  omnisIds: string[];
}

let index: SearchEntry[] | undefined;

function getIndex(): SearchEntry[] {
  if (index) return index;
  const idsByName = new Map<string, string[]>();
  for (const [id, icon] of Object.entries(omnisIcons)) {
    const ids = idsByName.get(icon.name) ?? [];
    ids.push(id);
    idsByName.set(icon.name, ids);
  }
  index = (Object.keys(iconTags) as IconName[]).map((name) => ({
    name,
    key: normalizeSearchText(name),
    words: normalizeSearchText(name.replace(/([a-z0-9])([A-Z])/g, "$1 $2")),
    tags: iconTags[name].map(normalizeSearchText),
    omnisIds: idsByName.get(name) ?? [],
  }));
  return index;
}

/** Score d'un mot de la recherche pour une icône (plus petit = meilleur), ou `undefined`. */
function scoreToken(entry: SearchEntry, token: string): number | undefined {
  if (entry.key === token || entry.omnisIds.includes(token)) return 0;
  if (entry.key.startsWith(token)) return 1;
  if (entry.words.split(" ").some((w) => w.startsWith(token))) return 2;
  // REASON: un mot très court (« ia ») apparaît au milieu de trop de mots.
  const inner = token.length >= 3;
  if (inner && entry.key.includes(token)) return 3;
  if (entry.tags.some((t) => t === token)) return 4;
  if (
    entry.tags.some((t) =>
      t.split(/[^a-z0-9]+/).some((w) => w.startsWith(token)),
    )
  ) {
    return 5;
  }
  if (inner && entry.tags.some((t) => t.includes(token))) return 6;
  if (entry.omnisIds.some((id) => id.startsWith(token))) return 7;
  return undefined;
}

/**
 * Retourne les icônes correspondant à la recherche, les plus pertinentes d'abord.
 *
 * - Sans accents ni casse : « interfacage » trouve le tag « Interfaçages ».
 * - Chaque mot doit correspondre au nom, à un tag ou à un ID Omnis.
 * - Le nom prime sur les tags. Un ID Omnis exact (`99990802`) trouve son icône.
 * - Recherche vide : toutes les icônes, par ordre alphabétique.
 */
export function searchIcons(query: string): IconName[] {
  const tokens = normalizeSearchText(query).split(" ").filter(Boolean);
  const entries = getIndex();
  if (tokens.length === 0) return entries.map((e) => e.name);
  const results: Array<{ name: IconName; score: number }> = [];
  for (const entry of entries) {
    let score = 0;
    for (const token of tokens) {
      const s = scoreToken(entry, token);
      if (s === undefined) {
        score = -1;
        break;
      }
      score += s;
    }
    if (score >= 0) results.push({ name: entry.name, score });
  }
  return results
    .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name, "en"))
    .map((r) => r.name);
}

/** Tags d'usage d'une icône (liste vide si aucun). */
export function getIconTags(name: IconName): readonly string[] {
  return iconTags[name] ?? [];
}

/** ID Omnis qui désignent une icône (liste vide si aucun). */
export function getIconOmnisIds(name: IconName): readonly number[] {
  return (
    getIndex()
      .find((e) => e.name === name)
      ?.omnisIds.map(Number) ?? []
  );
}
