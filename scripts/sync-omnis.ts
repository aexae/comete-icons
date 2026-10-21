/**
 * sync-omnis — génère src/omnis.ts (dictionnaire ID Omnis → icône).
 *
 * Source : un export CSV de l'onglet « Liste des icônes » du classeur SharePoint
 * « Signification et usage des icônes.xlsx » (colonnes « ID Omnis » et « Nom »).
 * L'export est normalisé dans l'instantané versionné data/omnis-icons.csv.
 *
 * Échoue si un nom du classeur n'existe pas dans le paquet (hors ID listés
 * dans KNOWN_UNMAPPED_IDS) : corriger le classeur ou ajouter l'icône.
 *
 * Run:
 *   pnpm sync-omnis                       # regénère depuis l'instantané
 *   pnpm sync-omnis ~/Downloads/liste.csv # met à jour l'instantané puis regénère
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildOmnis,
  readIconNames,
  readOmnisRows,
  renderOmnisCsv,
  renderOmnisModule,
} from "../src/omnis-build";

const SNAPSHOT_PATH = resolve(import.meta.dirname, "../data/omnis-icons.csv");
const TYPES_PATH = resolve(import.meta.dirname, "../src/types.ts");
const OUTPUT_PATH = resolve(import.meta.dirname, "../src/omnis.ts");

const sourcePath = process.argv[2] ? resolve(process.argv[2]) : SNAPSHOT_PATH;
const rows = readOmnisRows(readFileSync(sourcePath, "utf-8"));
const iconNames = readIconNames(readFileSync(TYPES_PATH, "utf-8"));

try {
  const build = buildOmnis(rows, iconNames);
  writeFileSync(SNAPSHOT_PATH, renderOmnisCsv(rows));
  writeFileSync(OUTPUT_PATH, renderOmnisModule(build));
  console.log(
    `✅ ${build.entries.length} ID mappés, ${build.unmapped.length} non mappés (connus)`,
  );
} catch (error) {
  console.error(`❌ ${(error as Error).message}`);
  process.exit(1);
}
