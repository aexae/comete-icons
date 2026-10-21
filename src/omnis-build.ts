/**
 * Construction du dictionnaire ID Omnis → icône (`src/omnis.ts`).
 *
 * Logique pure, partagée par `scripts/sync-omnis.ts` (écriture du fichier) et
 * `src/omnis.test.ts` (vérifie que `src/omnis.ts` est à jour). Non exporté par
 * le paquet.
 */

/** Rangée retenue du classeur : ID Omnis et nom d'icône. */
export interface OmnisRow {
  id: number;
  name: string;
}

/** Entrée résolue du dictionnaire. */
export interface ResolvedOmnisIcon {
  name: string;
  variant?: "filled";
  color?: "disabled" | "critical";
}

/**
 * ID volontairement non mappés : aucune icône du paquet ne leur correspond sans
 * arbitrage design (cf. TODO.md). Tout autre nom inconnu fait échouer le build.
 */
export const KNOWN_UNMAPPED_IDS: ReadonlySet<number> = new Set([
  130020, // VisibilityAll : « Lu par tous » (icône masquée dans Figma, non validée)
  150005, // Done : « Fait »
  160019, // BrowserUpdatedNeutral : « Exécuter un script »
  180010, // ExpiredSignature : « Signature expirée »
]);

/** Suffixes d'état Omnis portés par `color` / `variant` dans le paquet. */
const STATE_SUFFIXES = [
  { suffix: "Disabled", apply: { color: "disabled" } },
  { suffix: "Critical", apply: { color: "critical" } },
  { suffix: "Filled", apply: { variant: "filled" } },
] as const;

/** Noms de rangée qui ne désignent pas une icône. */
const PLACEHOLDER_NAMES = new Set(["", "Empty"]);

/** Découpe un CSV (séparateur `;`, `,` ou tabulation, guillemets RFC 4180). */
export function parseCsv(text: string): string[][] {
  const src = text.replace(/^﻿/, "");
  const firstLine = src.split(/\r?\n/, 1)[0] ?? "";
  const delimiter = [";", "\t", ","].find((d) => firstLine.includes(d)) ?? ";";
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === delimiter) {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/**
 * Extrait les rangées « ID Omnis » / « Nom » d'un export CSV du classeur
 * (l'onglet complet ou l'instantané `data/omnis-icons.csv`).
 */
export function readOmnisRows(csv: string): OmnisRow[] {
  const [header, ...lines] = parseCsv(csv);
  if (!header) throw new Error("CSV vide");
  const idCol = header.findIndex((h) => h.trim() === "ID Omnis");
  const nameCol = header.findIndex((h) => h.trim() === "Nom");
  if (idCol < 0 || nameCol < 0) {
    throw new Error("Colonnes « ID Omnis » et « Nom » introuvables");
  }
  const rows: OmnisRow[] = [];
  const seen = new Set<number>();
  for (const line of lines) {
    const rawId = (line[idCol] ?? "").trim();
    const name = (line[nameCol] ?? "").trim();
    if (!/^\d+$/.test(rawId) || PLACEHOLDER_NAMES.has(name)) continue;
    const id = Number(rawId);
    if (seen.has(id)) throw new Error(`ID Omnis en double : ${id}`);
    seen.add(id);
    rows.push({ id, name });
  }
  return rows;
}

/** Résout un nom du classeur en icône du paquet (nom exact, sinon suffixes d'état). */
export function resolveOmnisName(
  name: string,
  iconNames: ReadonlySet<string>,
): ResolvedOmnisIcon | undefined {
  let base = name;
  const state: Omit<ResolvedOmnisIcon, "name"> = {};
  while (!iconNames.has(base)) {
    const match = STATE_SUFFIXES.find(
      (s) => base.endsWith(s.suffix) && base.length > s.suffix.length,
    );
    if (!match) return undefined;
    base = base.slice(0, -match.suffix.length);
    // REASON: en disabled, toutes les couleurs suivent (le disabled prime sur critical).
    if ("color" in match.apply && state.color !== "disabled") {
      state.color = match.apply.color;
    }
    if ("variant" in match.apply) state.variant = match.apply.variant;
  }
  return { name: base, ...state };
}

/** Résultat de la construction : entrées résolues et ID non mappés. */
export interface OmnisBuild {
  entries: Array<{ id: number; icon: ResolvedOmnisIcon }>;
  unmapped: OmnisRow[];
}

/** Résout toutes les rangées. Échoue sur tout nom inconnu hors `KNOWN_UNMAPPED_IDS`. */
export function buildOmnis(
  rows: readonly OmnisRow[],
  iconNames: ReadonlySet<string>,
): OmnisBuild {
  const entries: OmnisBuild["entries"] = [];
  const unmapped: OmnisRow[] = [];
  const unknown: OmnisRow[] = [];
  for (const row of rows) {
    const icon = resolveOmnisName(row.name, iconNames);
    if (icon) entries.push({ id: row.id, icon });
    else if (KNOWN_UNMAPPED_IDS.has(row.id)) unmapped.push(row);
    else unknown.push(row);
  }
  if (unknown.length > 0) {
    const list = unknown.map((r) => `${r.id} ${r.name}`).join(", ");
    throw new Error(`Noms absents du paquet : ${list}`);
  }
  return { entries, unmapped };
}

/** Produit le contenu de `src/omnis.ts`. */
export function renderOmnisModule(build: OmnisBuild): string {
  const lines = [
    "/* Auto-generated by scripts/sync-omnis.ts — do not edit manually */",
    "/**",
    " * Correspondance entre l'identifiant d'icône Omnis (Comète desktop) et l'icône",
    " * du paquet, avec la variante ou la couleur qui restitue l'état Omnis.",
    " *",
    " * Source : classeur SharePoint « Signification et usage des icônes.xlsx »",
    " * (onglet « Liste des icônes »), instantané dans `data/omnis-icons.csv`.",
    " * Mise à jour : `pnpm sync-omnis [export.csv]`.",
    " */",
    'import type { IconColor, IconName, IconVariant } from "./types";',
    "",
    "/** Icône du paquet correspondant à un ID Omnis. */",
    "export interface OmnisIcon {",
    "  name: IconName;",
    "  variant?: IconVariant;",
    "  color?: IconColor;",
    "}",
    "",
    "export const omnisIcons = {",
  ];
  for (const { id, icon } of build.entries) {
    const parts = [`name: "${icon.name}"`];
    if (icon.variant) parts.push(`variant: "${icon.variant}"`);
    if (icon.color) parts.push(`color: "${icon.color}"`);
    lines.push(`  ${id}: { ${parts.join(", ")} },`);
  }
  lines.push(
    "} as const satisfies Readonly<Record<number, OmnisIcon>>;",
    "",
    "/** Identifiant d'icône Omnis connu du dictionnaire. */",
    "export type OmnisIconId = keyof typeof omnisIcons;",
    "",
    "/** ID Omnis du classeur sans icône dédiée dans le paquet (arbitrage design en attente). */",
    "export const omnisUnmappedIds: readonly number[] = [",
  );
  for (const row of build.unmapped) lines.push(`  ${row.id}, // ${row.name}`);
  lines.push(
    "];",
    "",
    "/**",
    " * Retourne l'icône correspondant à un ID Omnis, ou `undefined` si l'ID est",
    " * inconnu. Accepte un nombre ou une chaîne (ex. valeur lue en base).",
    " */",
    "export function getIconByOmnisId(id: number | string): OmnisIcon | undefined {",
    '  const key = typeof id === "number" ? id : Number(id.trim());',
    "  if (!Number.isInteger(key)) return undefined;",
    "  return (omnisIcons as Readonly<Record<number, OmnisIcon>>)[key];",
    "}",
    "",
  );
  return lines.join("\n");
}

/** Lit l'union `IconName` de `src/types.ts`. */
export function readIconNames(typesSource: string): Set<string> {
  const union =
    (typesSource.split("export type IconName")[1] ?? "").split(";")[0] ?? "";
  return new Set(
    [...union.matchAll(/^\s+\| "(\w+)"/gm)].map((m) => m[1] ?? ""),
  );
}

/** Produit le contenu normalisé de l'instantané `data/omnis-icons.csv`. */
export function renderOmnisCsv(rows: readonly OmnisRow[]): string {
  return `ID Omnis;Nom\n${rows.map((r) => `${r.id};${r.name}`).join("\n")}\n`;
}
