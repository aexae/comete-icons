/**
 * generate-omnis-script — génère le script d'import Omnis d'une icône dans #ICONS.
 *
 * Produit un fichier `ajout_icon_<Nom>_<idOmnis>.txt` au format « notation Omnis »
 * (blocs `;<replace><C_SCRIPTS/executed>` / `;<do>executed</do>`), reproduisant la
 * méthode `W_SCRIPT/script_icon` du code Omnis : déclaration des variables locales
 * `oIcons` + `bin`, PNG encodé en hexadécimal par paquets de 5000 octets
 * (`binfromhex` / `bytecon`), puis `oIcons.$import_icon(<id>,bin,<taille>)`.
 *
 * Le script importe l'icône en deux tailles #ICONS :
 *   - 16 px : variante outlined, spacing none (svg/outlined/<Nom>-16.svg)
 *   - 32 px : variante duotone, spacing default (svg/duotone/<Nom>-24.svg), la
 *     glyphe 24 px étant centrée dans un canevas 32 px (Omnis ne connaît pas le 24).
 *
 * Les couleurs sémantiques (`currentColor` → `--icon-default`, `var(--icon-*)`) sont
 * résolues en hex depuis le CSS compilé de comete-design-tokens (thème clair), puis
 * rasterisées en PNG transparent (resvg).
 *
 * Format Comète (cf. skill script-omnis-comete) :
 *   - Ligne 1 obligatoire : `;<#>6829</#>` + base64 d'une description HTML (UTF-8).
 *     Sans `;<#>` en première position ni `</#>`, Comète refuse le script
 *     (« Format de script incorrect »). Le chargeur C_SCRIPTS ne valide que ce
 *     préambule ; la description qui suit est informative.
 *   - Corps en Windows-1252, lignes séparées par CR seul, sans BOM.
 *
 * Prérequis : les SVG optimisés de l'icône doivent exister dans svg/ (lancer
 * `pnpm optimize --only <Nom>` au préalable, comme pour `generate`).
 *
 * L'ID Omnis n'est jamais deviné : il est fourni explicitement (--omnis-id) et doit
 * provenir du classeur SharePoint « Signification et usage des icônes.xlsx ».
 *
 * Usage :
 *   pnpm omnis:script --only Service --omnis-id 180011
 *   pnpm omnis:script --only Service --omnis-id 180011 --description "..."
 *   pnpm omnis:script --only Service --omnis-id 180011 --out-dir /chemin/sortie
 *
 * Destination par défaut : $OMNIS_SCRIPTS_DIR, sinon le dossier « scripts by claude ».
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const ROOT = resolve(import.meta.dirname, "..");
const SVG_DIR = join(ROOT, "svg");
const CSV_PATH = join(ROOT, "data", "omnis-icons.csv");

// Même source que sync-icon-colors.ts : le CSS compilé du dépôt voisin.
const TOKENS_CSS_PATH = resolve(
  import.meta.dirname,
  "../../comete-design-tokens/build/css/comete-tokens.css",
);

// Destination des scripts produits (surchargée par --out-dir ou $OMNIS_SCRIPTS_DIR).
const DEFAULT_OUT_DIR =
  process.env.OMNIS_SCRIPTS_DIR ??
  "/Users/nax/Documents/Axel/Professionnel/Companies/Comète/_fichiers_claude/scripts by claude";

// Omnis découpe le binaire par pas de 5000 octets avant l'encodage hex (cf. W_SCRIPT).
const BYTES_PER_CHUNK = 5000;
// Le format script Omnis sépare les lignes par un CR seul (cf. skill script-omnis-comete).
const CR = "\r";
// Code de vérification Comète : un script `;<#>6829</#>…` se charge sans demander de code.
const PIN_CODE = "6829";

// ─── Arguments ──────────────────────────────────────────────────────────────

interface Args {
  name: string;
  omnisId: number;
  outDir: string;
  description?: string;
}

function parseArgs(argv: string[]): Args {
  let name: string | undefined;
  let omnisId: string | undefined;
  let outDir = DEFAULT_OUT_DIR;
  let description: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--only" || arg === "--name") name = argv[++i];
    else if (arg?.startsWith("--only=")) name = arg.slice("--only=".length);
    else if (arg === "--omnis-id") omnisId = argv[++i];
    else if (arg?.startsWith("--omnis-id="))
      omnisId = arg.slice("--omnis-id=".length);
    else if (arg === "--out-dir") outDir = argv[++i] ?? outDir;
    else if (arg?.startsWith("--out-dir="))
      outDir = arg.slice("--out-dir=".length);
    else if (arg === "--description") description = argv[++i];
    else if (arg?.startsWith("--description="))
      description = arg.slice("--description=".length);
  }

  if (!name)
    fail("--only <Nom> est requis (un seul nom d'icône en PascalCase)");
  if (name.includes(","))
    fail("un seul nom d'icône par exécution (un ID Omnis par icône)");
  if (!omnisId)
    fail(
      "--omnis-id <id> est requis (ID issu du classeur SharePoint, jamais deviné)",
    );
  if (!/^\d+$/.test(omnisId))
    fail(`--omnis-id doit être un entier, reçu : ${omnisId}`);

  return { name, omnisId: Number(omnisId), outDir, description };
}

function fail(message: string): never {
  console.error(`❌ ${message}`);
  process.exit(1);
}

// ─── Résolution des couleurs sémantiques ────────────────────────────────────

/** Valeur hex (thème clair = 1re occurrence) d'un token dans le CSS compilé. */
function resolveToken(css: string, token: string): string {
  const match = css.match(
    new RegExp(
      `${token.replace(/-/g, "\\-")}\\s*:\\s*(#[0-9a-fA-F]{3,8})\\s*;`,
    ),
  );
  if (!match?.[1]) {
    fail(
      `token ${token} introuvable (ou non hex) dans ${TOKENS_CSS_PATH} — ne jamais deviner une couleur`,
    );
  }
  return match[1];
}

/**
 * Remplace les couleurs sémantiques d'un SVG par leur valeur hex :
 * `currentColor` → `--icon-default`, `var(--icon-x)` → valeur de `--icon-x`.
 */
function bakeColors(svg: string, css: string): string {
  return svg
    .replace(/currentColor/g, resolveToken(css, "--icon-default"))
    .replace(/var\((--[a-z0-9-]+)\)/gi, (_, token: string) =>
      resolveToken(css, token),
    );
}

// ─── Rasterisation ──────────────────────────────────────────────────────────

/** Rasterise un SVG en PNG transparent à la taille exacte demandée (px). */
function rasterize(svg: string, px: number): Buffer {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: px },
    background: "rgba(0,0,0,0)",
  });
  return Buffer.from(resvg.render().asPng());
}

/** Centre la glyphe 24 px d'un SVG dans un canevas 32 px (format Omnis). */
function wrapInto32(svg24: string): string {
  const inner = svg24
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g transform="translate(4,4)">${inner}</g></svg>`;
}

// ─── Format notation Omnis ──────────────────────────────────────────────────

/** Découpe un binaire en chaînes hex de BYTES_PER_CHUNK octets (comme W_SCRIPT). */
function hexChunks(buffer: Buffer): string[] {
  const chunks: string[] = [];
  for (let offset = 0; offset < buffer.length; offset += BYTES_PER_CHUNK) {
    const end = Math.min(offset + BYTES_PER_CHUNK, buffer.length);
    chunks.push(buffer.subarray(offset, end).toString("hex"));
  }
  return chunks;
}

/** Bloc d'import d'une taille : réinitialise `bin`, empile les paquets hex, importe. */
function importBlock(omnisId: number, png: Buffer, size: number): string[] {
  const chunks = hexChunks(png);
  const lines = chunks.map((hex, index) =>
    index === 0
      ? `Calculate bin as binfromhex("${hex}")`
      : `Calculate bin as bytecon(bin,binfromhex("${hex}"))`,
  );
  lines.push(`Do oIcons.$import_icon(${omnisId},bin,${size})`);
  return lines;
}

// Gabarit HTML exact de W_SCRIPT (skill script-omnis-comete, fonction `entete`),
// lignes internes séparées par CRLF. `{description}` est inséré brut (comme la skill).
const HTML_STYLE_CLASSES = [
  "Normal",
  "Normal_table",
  "Header_&amp;_Footer",
  "Header_&amp;_Footer_table",
];
const HTML_TEMPLATE = [
  "<html>",
  '<head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8">',
  '<style type="text/css" media="all">',
  "a:link {",
  "color:#0000FF;",
  "font-style:normal;",
  "font-weight:normal;",
  "text-decoration:underline;",
  "}",
  "<!--",
  ...HTML_STYLE_CLASSES.map(
    (c) =>
      `\t.${c}\t{text-align:left;margin-top:0;padding-top:0pt;margin-bottom:0;padding-bottom:0pt;font-family:Tahoma;font-size:10pt;font-style:normal;font-weight:normal;text-decoration:none;vertical-align:top;vertical-align:top;color:#000000;text-decoration:none;}`,
  ),
  "-->",
  "</style>",
  "</head>",
  '<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" marginheight="0" marginwidth="0" bgcolor="#FFFFFF">',
  '<p class="Normal" style="margin-top:0.000000cm;margin-bottom:0.000000cm;">',
  "{description}",
  "</p>",
  "</body>",
  "</html>",
  "{trace}",
].join("\r\n");

/**
 * En-tête obligatoire : `;<#>6829</#>` + base64 d'une description HTML (UTF-8).
 * Doit être la 1re ligne ; le chargeur C_SCRIPTS ne valide que ce préambule.
 * Reproduit à l'identique `entete()` de la skill (gabarit HTML, base64 UTF-8).
 */
function entete(description: string): string {
  const html = HTML_TEMPLATE.replace("{description}", description).replace(
    "{trace}",
    "",
  );
  const encoded = Buffer.from(html, "utf-8").toString("base64");
  return `;<#>${PIN_CODE}</#>${encoded}`;
}

/** Script Omnis complet : en-tête, déclaration des variables puis import 16 + 32. */
function buildOmnisScript(
  omnisId: number,
  png16: Buffer,
  png32: Buffer,
  description: string,
): string {
  const lines = [
    entete(description),
    ";<replace><C_SCRIPTS/executed>",
    "Do $classes.C_SCRIPTS.$methods.executed.$lvardefs.$sendall($classes.C_SCRIPTS.$methods.executed.$lvardefs.$remove($sendallref))",
    'Do $classes.C_SCRIPTS.$methods.//executed//.$lvardefs.$add("oIcons",37,"oIcons",0,0) Returns reference',
    'Do $classes.C_SCRIPTS.$methods.//executed//.$lvardefs.$add("bin",28,0,100000000,0) Returns reference',
    ";</replace>",
    ";<do>executed</do>",
    ";<replace><C_SCRIPTS/executed>",
    ...importBlock(omnisId, png16, 16),
    ...importBlock(omnisId, png32, 32),
    ";</replace>",
    ";<do>executed</do>",
    "",
    "",
  ];
  return lines.join(CR);
}

// ─── Cohérence du classeur Omnis ────────────────────────────────────────────

/** Avertit si le couple (id, nom) diverge de l'instantané data/omnis-icons.csv. */
function checkCsvConsistency(name: string, omnisId: number): void {
  if (!existsSync(CSV_PATH)) return;
  const rows = readFileSync(CSV_PATH, "utf-8")
    .split(/\r?\n/)
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const [id, iconName] = line.split(";");
      return { id: Number(id), name: (iconName ?? "").trim() };
    });

  const byId = rows.find((r) => r.id === omnisId);
  const byName = rows.find((r) => r.name === name);

  if (byId && byId.name !== name) {
    console.warn(
      `⚠️  Le classeur mappe déjà l'ID ${omnisId} à « ${byId.name} », pas « ${name} ».`,
    );
  }
  if (byName && byName.id !== omnisId) {
    console.warn(
      `⚠️  Le classeur mappe déjà « ${name} » à l'ID ${byName.id}, pas ${omnisId}.`,
    );
  }
  if (!byId && !byName) {
    console.warn(
      `⚠️  (${omnisId} → ${name}) absent de data/omnis-icons.csv. Renseigner le classeur SharePoint puis « pnpm sync-omnis » pour que getIconByOmnisId le résolve.`,
    );
  }
}

// ─── Programme ────────────────────────────────────────────────────────────────

const { name, omnisId, outDir, description } = parseArgs(process.argv.slice(2));

const scriptDescription =
  description ??
  `Ajout de l'icône ${name} (ID Omnis ${omnisId}) dans #ICONS : 16 px outlined (spacing none) et 32 px duotone (spacing default).`;

const outlined16Path = join(SVG_DIR, "outlined", `${name}-16.svg`);
const duotone24Path = join(SVG_DIR, "duotone", `${name}-24.svg`);

for (const path of [outlined16Path, duotone24Path]) {
  if (!existsSync(path)) {
    fail(
      `SVG introuvable : ${path} — lancer « pnpm optimize --only ${name} » d'abord`,
    );
  }
}
if (!existsSync(TOKENS_CSS_PATH)) {
  fail(
    `CSS tokens introuvable : ${TOKENS_CSS_PATH} — le dépôt comete-design-tokens doit être cloné en voisin et buildé`,
  );
}

const css = readFileSync(TOKENS_CSS_PATH, "utf-8");

const png16 = rasterize(
  bakeColors(readFileSync(outlined16Path, "utf-8"), css),
  16,
);
const png32 = rasterize(
  wrapInto32(bakeColors(readFileSync(duotone24Path, "utf-8"), css)),
  32,
);

checkCsvConsistency(name, omnisId);

const script = buildOmnisScript(omnisId, png16, png32, scriptDescription);

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, `ajout_icon_${name}_${omnisId}.txt`);
// Corps ASCII (commandes + hex + base64) : « latin1 » écrit un octet par unité,
// compatible Windows-1252. Pas de BOM : le chargeur exige `;<#>` en position 1.
writeFileSync(outPath, script, "latin1");

console.log(`✅ Script Omnis généré : ${outPath}`);
console.log(
  `   16 px outlined : ${png16.length} octets • 32 px duotone : ${png32.length} octets`,
);
