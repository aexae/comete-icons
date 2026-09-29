/**
 * generate-components.ts
 *
 * Reads optimised SVGs from svg/{variant}/ and generates:
 *   - src/icons/{IconName}.tsx   (one per icon, all variants+spacings inline)
 *   - src/types.ts               (IconName union; the IconColor union is preserved)
 *   - src/utils.ts
 *   - src/registry.ts
 *   - src/index.ts               (barrel export)
 *
 * NOT generated here: src/styles/icons.css and the IconColor union belong to
 * scripts/sync-icon-colors.ts (`pnpm sync-colors`), which derives them from
 * comete-design-tokens. This script never touches them.
 *
 * Additive: icons already present in src/icons/ are always kept, even when
 * absent from svg/. Nothing is ever removed by this script.
 *
 * RULE (absolute): a generated component must not contain any hardcoded color.
 * The script aborts if one does (fix the mapping in optimize-svg.ts).
 *
 * Usage:
 *   tsx scripts/generate-components.ts                       # every icon in svg/
 *   tsx scripts/generate-components.ts --only DeployedCode   # only that icon
 *   tsx scripts/generate-components.ts --only A,B --only C   # several icons
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { basename, join } from "node:path";

const ROOT = join(import.meta.dirname!, "..");
const SVG_DIR = join(ROOT, "svg");
const SRC_DIR = join(ROOT, "src");
const ICONS_DIR = join(SRC_DIR, "icons");
const TYPES_PATH = join(SRC_DIR, "types.ts");
const VARIANTS = ["outlined", "filled", "duotone"] as const;
// SVG filenames use 24 (spacing=default, with padding) and 16 (spacing=none, no padding)
const SPACINGS = ["default", "none"] as const;
const FILE_TO_SPACING: Record<string, string> = {
  "24": "default",
  "16": "none",
};

/** Matches a hardcoded color in a generated component (hex or rgb/hsl). */
const HARDCODED_COLOR_RE =
  /\b(?:fill|stroke|stopColor|color)="(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))"/g;

/** Parses `--only A,B --only C` into a Set of icon names (empty = no filter). */
function parseOnly(argv: string[]): Set<string> {
  const only = new Set<string>();
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--only" && argv[i + 1]) {
      for (const n of argv[++i]!.split(",")) if (n.trim()) only.add(n.trim());
    } else if (argv[i]!.startsWith("--only=")) {
      for (const n of argv[i]!.slice(7).split(","))
        if (n.trim()) only.add(n.trim());
    }
  }
  return only;
}

/**
 * Reads the IconColor union from the existing src/types.ts.
 * It is owned by sync-icon-colors.ts and must survive regeneration untouched.
 */
function readExistingIconColors(): string[] {
  if (!existsSync(TYPES_PATH)) {
    throw new Error(
      "src/types.ts not found — run `pnpm sync-colors` first to create the IconColor union",
    );
  }
  const match = readFileSync(TYPES_PATH, "utf-8").match(
    /export type IconColor =\n([\s\S]*?);/,
  );
  const colors = match
    ? [...match[1]!.matchAll(/\|\s*"([^"]+)"/g)].map((m) => m[1]!)
    : [];
  if (colors.length === 0) {
    throw new Error(
      "IconColor union not found in src/types.ts — run `pnpm sync-colors` first",
    );
  }
  return colors;
}

/** Sort icon names using natural/locale sort to match Biome's import ordering */
function sortIconNames(names: string[]): string[] {
  return [...names].sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" }),
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Extract SVG inner content (everything between <svg> and </svg>) */
function extractSvgInner(svg: string): string {
  // Remove XML declaration if present
  const clean = svg.replace(/<\?xml[^?]*\?>\s*/g, "");

  // Extract inner content
  const match = clean.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!match) return "";

  return match[1].trim();
}

/** Extract viewBox from SVG */
function extractViewBox(svg: string): string {
  const match = svg.match(/viewBox="([^"]+)"/);
  return match?.[1] ?? "0 0 24 24";
}

/** Convert SVG attributes to JSX (kebab-case → camelCase) */
function svgToJsx(svgContent: string): string {
  return svgContent
    .replace(/clip-rule/g, "clipRule")
    .replace(/fill-rule/g, "fillRule")
    .replace(/fill-opacity/g, "fillOpacity")
    .replace(/stroke-width/g, "strokeWidth")
    .replace(/stroke-linecap/g, "strokeLinecap")
    .replace(/stroke-linejoin/g, "strokeLinejoin")
    .replace(/stroke-dasharray/g, "strokeDasharray")
    .replace(/stroke-dashoffset/g, "strokeDashoffset")
    .replace(/stroke-miterlimit/g, "strokeMiterlimit")
    .replace(/stroke-opacity/g, "strokeOpacity")
    .replace(/stop-color/g, "stopColor")
    .replace(/stop-opacity/g, "stopOpacity")
    .replace(/class="/g, 'className="')
    .replace(/xmlns:xlink="[^"]*"/g, "");
}

// ─── Build icon map ────────────────────────────────────────────────────────

interface SvgData {
  inner: string;
  viewBox: string;
}

type IconMap = Map<
  string, // IconName
  Partial<
    Record<
      (typeof VARIANTS)[number],
      Partial<Record<(typeof SPACINGS)[number], SvgData>>
    >
  >
>;

function buildIconMap(only: Set<string>): IconMap {
  const iconMap: IconMap = new Map();

  for (const variant of VARIANTS) {
    const dir = join(SVG_DIR, variant);
    if (!existsSync(dir)) continue;

    const files = readdirSync(dir).filter((f) => f.endsWith(".svg"));

    for (const file of files) {
      // filename: IconName-24.svg or IconName-16.svg
      const match = basename(file, ".svg").match(/^(.+)-(16|24)$/);
      if (!match) {
        console.warn(`⚠️  Skipping ${file} (unexpected filename format)`);
        continue;
      }

      const [, rawName, fileSize] = match;
      // Convert spaces/hyphens to PascalCase (e.g. "Emergency home" → "EmergencyHome")
      const iconName = rawName.replace(/[\s-]+(.)/g, (_, c: string) =>
        c.toUpperCase(),
      );
      if (only.size > 0 && !only.has(iconName)) continue;
      const spacing = FILE_TO_SPACING[fileSize] as (typeof SPACINGS)[number];
      const svg = readFileSync(join(dir, file), "utf-8");
      const inner = extractSvgInner(svg);
      const viewBox = extractViewBox(svg);

      if (!iconMap.has(iconName)) {
        iconMap.set(iconName, {});
      }

      const entry = iconMap.get(iconName)!;
      if (!entry[variant as (typeof VARIANTS)[number]]) {
        entry[variant as (typeof VARIANTS)[number]] = {};
      }
      entry[variant as (typeof VARIANTS)[number]]![spacing] = {
        inner: svgToJsx(inner),
        viewBox,
      };
    }
  }

  return iconMap;
}

// ─── Generate types.ts ─────────────────────────────────────────────────────

function generateTypes(iconNames: string[], iconColors: string[]): string {
  const sorted = sortIconNames(iconNames);
  return `import type { SVGAttributes } from "react";

export type IconSpacing = "default" | "none";

export type IconVariant = "outlined" | "filled" | "duotone";

export type IconColor =
${iconColors.map((c) => `  | "${c}"`).join("\n")};

/** Union of every available icon name (auto-generated from SVG sources). */
export type IconName =
${sorted.map((n) => `  | "${n}"`).join("\n")};

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "color"> {
  /**
   * Rendered size in pixels. SVG scales without pixelation.
   * @default 24
   */
  size?: number;
  /**
   * Internal spacing of the SVG (viewBox).
   * - "default" — icon with padding (viewBox 0 0 24 24)
   * - "none" — icon without padding (viewBox 0 0 16 16)
   * @default "default"
   */
  spacing?: IconSpacing;
  /** Icon style variant. @default "outlined" */
  variant?: IconVariant;
  /** Semantic color mapped to design tokens. @default "default" */
  color?: IconColor;
  /** Additional CSS class */
  className?: string;
}
`;
}

// ─── Generate utils.ts ─────────────────────────────────────────────────────

function generateUtils(): string {
  return `import type { IconColor } from "./types";

const PREFIX = "comete-icon";

/** Returns the CSS class that maps to the corresponding design token */
export function getIconClass(color: IconColor): string {
  return \`\${PREFIX}--\${color}\`;
}
`;
}

// ─── Generate component ────────────────────────────────────────────────────

function generateComponent(
  iconName: string,
  variants: IconMap extends Map<string, infer V> ? V : never,
): string {
  // Build the variant data structure keyed by spacing
  const variantEntries: string[] = [];

  for (const variant of VARIANTS) {
    const spacings = variants[variant];
    if (!spacings) continue;

    const spacingEntries: string[] = [];
    for (const spacing of SPACINGS) {
      const data = spacings[spacing];
      if (!data) continue;
      spacingEntries.push(
        `      "${spacing}": { viewBox: "${data.viewBox}", paths: <>${data.inner}</> }`,
      );
    }

    if (spacingEntries.length > 0) {
      variantEntries.push(
        `    ${variant}: {\n${spacingEntries.join(",\n")}\n    }`,
      );
    }
  }

  return `import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
${variantEntries.join(",\n")}
};

export function ${iconName}({
  size = 24,
  spacing = "default",
  variant = "outlined",
  color = "default",
  className,
  ...props
}: IconProps) {
  const data = svgData[variant]?.[spacing] ?? svgData.outlined?.["default"];
  if (!data) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={data.viewBox}
      fill="none"
      className={\`\${getIconClass(color)}\${className ? \` \${className}\` : ""}\`}
      aria-hidden="true"
      {...props}
    >
      {data.paths}
    </svg>
  );
}

${iconName}.displayName = "${iconName}";
`;
}

// ─── Generate registry ────────────────────────────────────────────────────

function generateRegistry(iconNames: string[]): string {
  const sorted = sortIconNames(iconNames);
  const lines = [
    "/* Auto-generated — do not edit manually */",
    'import type { ComponentType } from "react";',
    'import type { IconName } from "./types";',
    'import type { IconProps } from "./types";',
    "",
  ];

  const RESERVED = new Set([
    "Error",
    "Map",
    "Number",
    "String",
    "Object",
    "Array",
    "Function",
    "Symbol",
    "Date",
    "Promise",
    "Set",
  ]);
  for (const name of sorted) {
    if (RESERVED.has(name)) {
      lines.push(`import { ${name} as ${name}Icon } from "./icons/${name}";`);
    } else {
      lines.push(`import { ${name} } from "./icons/${name}";`);
    }
  }

  lines.push("");
  lines.push("/** Maps every icon name to its React component. */");
  lines.push(
    "export const iconRegistry: Record<IconName, ComponentType<IconProps>> = {",
  );
  for (const name of sorted) {
    if (RESERVED.has(name)) {
      lines.push(`  ${name}: ${name}Icon,`);
    } else {
      lines.push(`  ${name},`);
    }
  }
  lines.push("};");
  lines.push("");

  return lines.join("\n");
}

// ─── Generate barrel index ─────────────────────────────────────────────────

function generateIndex(iconNames: string[]): string {
  const lines = [
    "/* Auto-generated — do not edit manually */",
    "",
    "// Styles",
    'import "./styles/icons.css";',
    "",
    "// Icons",
  ];

  for (const name of sortIconNames(iconNames)) {
    lines.push(`export { ${name} } from "./icons/${name}";`);
  }

  lines.push("");
  lines.push("// Types");
  lines.push(
    'export type { IconProps, IconSpacing, IconVariant, IconColor, IconName } from "./types";',
  );
  lines.push("");
  lines.push("// Utils");
  lines.push('export { getIconClass } from "./utils";');
  lines.push("");
  lines.push("// Registry");
  lines.push('export { iconRegistry } from "./registry";');
  lines.push("");

  return lines.join("\n");
}

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  const only = parseOnly(process.argv.slice(2));
  // Read before anything is written: the IconColor union is owned by sync-colors.
  const iconColors = readExistingIconColors();

  console.log("🔨 Building icon map from SVGs…");
  const iconMap = buildIconMap(only);
  console.log(
    `   Found ${iconMap.size} icons${only.size > 0 ? ` (--only ${[...only].join(",")})` : ""}`,
  );

  if (only.size > 0) {
    const missing = [...only].filter((n) => !iconMap.has(n));
    if (missing.length > 0) {
      console.error(`❌ No SVG found in svg/ for: ${missing.join(", ")}`);
      process.exit(1);
    }
  }

  if (!existsSync(ICONS_DIR)) mkdirSync(ICONS_DIR, { recursive: true });

  // Generate components first to collect icon names
  const iconNames: string[] = [];
  const offenders: string[] = [];
  for (const [name, variants] of iconMap) {
    const source = generateComponent(name, variants);
    for (const m of source.matchAll(HARDCODED_COLOR_RE)) {
      offenders.push(`${name}: ${m[1]}`);
    }
    writeFileSync(join(ICONS_DIR, `${name}.tsx`), source, "utf-8");
    iconNames.push(name);
  }
  if (offenders.length > 0) {
    console.error(
      `\n❌ ${offenders.length} hardcoded color(s) in generated components.` +
        " Map them to design tokens in scripts/optimize-svg.ts, then re-run optimize + generate:",
    );
    for (const o of offenders) console.error(`   - ${o}`);
    process.exit(1);
  }

  // Additif : conserver les composants déjà présents dans src/icons/ mais absents
  // de Figma ou exclus par --only (le pipeline n'enlève jamais d'icône du paquet).
  // Leur .tsx existant n'est pas régénéré ; on l'inclut dans types/registry/barrel.
  const generated = new Set(iconNames);
  const kept: string[] = [];
  for (const file of readdirSync(ICONS_DIR)) {
    if (!file.endsWith(".tsx")) continue;
    const name = file.slice(0, -4);
    if (!generated.has(name)) {
      iconNames.push(name);
      kept.push(name);
    }
  }
  if (kept.length > 0 && only.size === 0) {
    console.log(
      `   ↳ ${kept.length} icône(s) conservée(s) (absentes de Figma) : ${kept.join(", ")}`,
    );
  } else if (kept.length > 0) {
    console.log(`   ↳ ${kept.length} icône(s) existante(s) conservée(s)`);
  }
  console.log(`   ✓ ${iconNames.length} icon components`);

  // Generate types + utils (types needs iconNames for IconName union)
  writeFileSync(TYPES_PATH, generateTypes(iconNames, iconColors), "utf-8");
  writeFileSync(join(SRC_DIR, "utils.ts"), generateUtils(), "utf-8");
  console.log("   ✓ types.ts (IconColor preserved) + utils.ts");

  // Generate registry (maps icon names to components)
  writeFileSync(
    join(SRC_DIR, "registry.ts"),
    generateRegistry(iconNames),
    "utf-8",
  );
  console.log("   ✓ registry.ts");

  // Generate barrel
  writeFileSync(join(SRC_DIR, "index.ts"), generateIndex(iconNames), "utf-8");
  console.log("   ✓ index.ts");

  console.log(`\n✅ Generated ${iconNames.length} React icon components`);
}

main();
