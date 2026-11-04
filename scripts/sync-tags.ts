/**
 * sync-tags — génère src/tags.ts (tags de recherche de chaque icône).
 *
 * Source : data/icon-tags.csv (colonnes « Nom » et « Tags », tags séparés par
 * `|`), modifié à la main et relu en PR. Le script le renormalise (tri, espaces,
 * doublons) puis écrit src/tags.ts.
 *
 * Échoue si le CSV ne couvre pas exactement les icônes du paquet : ajouter une
 * rangée (tags éventuellement vides) pour chaque nouvelle icône.
 *
 * Run:
 *   pnpm sync-tags
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { readIconNames } from "../src/omnis-build";
import {
  buildTags,
  readTagRows,
  renderTagsCsv,
  renderTagsModule,
} from "../src/tags-build";

const CSV_PATH = resolve(import.meta.dirname, "../data/icon-tags.csv");
const TYPES_PATH = resolve(import.meta.dirname, "../src/types.ts");
const OUTPUT_PATH = resolve(import.meta.dirname, "../src/tags.ts");

const rows = readTagRows(readFileSync(CSV_PATH, "utf-8"));
const iconNames = readIconNames(readFileSync(TYPES_PATH, "utf-8"));

try {
  const sorted = buildTags(rows, iconNames);
  writeFileSync(CSV_PATH, renderTagsCsv(sorted));
  writeFileSync(OUTPUT_PATH, renderTagsModule(sorted));
  const empty = sorted.filter((r) => r.tags.length === 0).length;
  console.log(`✅ ${sorted.length} icônes, ${empty} sans tag`);
} catch (error) {
  console.error(`❌ ${(error as Error).message}`);
  process.exit(1);
}
