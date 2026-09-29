/**
 * optimize-svg.ts
 *
 * Runs SVGO on the SVGs in svg/ to:
 * - Remove hardcoded fill/stroke colors → replace with currentColor
 * - For duotone: replace the primary color (icon/default = #455D84) with
 *   currentColor and map every secondary accent color to a design token
 * - Clean up metadata, comments, editor cruft
 * - Optimise paths
 *
 * RULE (absolute): no hardcoded color may survive optimisation. Any hex/rgb
 * color left in an optimised SVG aborts the script with the list of offenders.
 * Fix = add the Figma color to DUOTONE_COLOR_TO_TOKEN (never guess a token:
 * match the hex in comete-tokens.css or ask).
 *
 * Usage:
 *   tsx scripts/optimize-svg.ts                       # every SVG in svg/
 *   tsx scripts/optimize-svg.ts --only DeployedCode   # only that icon
 *   tsx scripts/optimize-svg.ts --only A,B --only C   # several icons
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { type Config, optimize } from "svgo";
import type { XastElement, XastParent } from "svgo/lib/types";

const SVG_DIR = join(import.meta.dirname!, "..", "svg");
const VARIANTS = ["outlined", "filled", "duotone"] as const;

/**
 * Primary colors used in Figma duotone SVGs.
 * Both are replaced with currentColor by the duotone SVGO plugin.
 */
const DUOTONE_PRIMARY_COLORS = ["#455D84", "#49585B"];

/**
 * Mapping of Figma hardcoded colors to design token CSS custom properties.
 * Used in duotone SVGs to replace secondary accent colors with token references.
 * RULE: Never use hardcoded colors — always map to design tokens.
 * Keys are lowercase hex as found in the Figma export.
 */
const DUOTONE_COLOR_TO_TOKEN: Record<string, string> = {
  "#007ada": "var(--icon-information)",
  "#0076d8": "var(--icon-information)",
  "#856d0e": "var(--icon-warning)",
  "#e12121": "var(--icon-critical)",
  "#009b60": "var(--icon-success)",
  "#8270db": "var(--icon-accent-purple)",
  "#6f8488": "var(--icon-subtlest)",
  "#0060b0": "var(--icon-night)",
  "#9c4f10": "var(--icon-warning)",
  "#feb939": "var(--background-cycle-day-bold-default)",
  // Icônes produit Comète (étoile en dégradé + fond)
  "#1e3661": "var(--logo-comete-default)",
  "#224986": "var(--logo-comete-neutral)",
  "#f8bf01": "var(--logo-comete-gradient-dark)",
  "#fff146": "var(--logo-comete-gradient-light)",
};

/**
 * Tokens that must never appear in an icon: interaction colors belong to the
 * component that renders the icon, not to the icon itself.
 */
const FORBIDDEN_TOKENS = ["--icon-selected"];

/** Matches a hardcoded color in an attribute value (hex or rgb/hsl function). */
const HARDCODED_COLOR_RE =
  /\b(?:fill|stroke|stop-color|color)="(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))"/g;

/**
 * Figma wraps some exports in a clipPath covering the whole viewBox
 * (`<clipPath><path fill="#fff" d="M0 0h16v16H0z"/></clipPath>`). It clips
 * nothing and its white fill is the only source of `#fff` in the icons.
 * This plugin drops such full-frame clipPaths and the `clip-path` references.
 */
const removeFullFrameClipPaths = {
  name: "remove-full-frame-clip-paths",
  fn: () => {
    const fullFrame = new Set<string>();
    let viewBox: number[] = [];
    return {
      element: {
        enter: (node: XastElement, parent: XastParent) => {
          if (node.name === "svg" && node.attributes.viewBox) {
            viewBox = node.attributes.viewBox.split(/\s+/).map(Number);
          }
          if (node.name === "clipPath") {
            const [w, h] = [viewBox[2], viewBox[3]];
            const child = node.children?.[0];
            if (!child || child.type !== "element") return;
            const d: string | undefined = child.attributes.d;
            const isFull =
              node.children.length === 1 &&
              (child.name === "path" || child.name === "rect") &&
              (d === `M0 0h${w}v${h}H0z` ||
                d === `M${w} ${h}H0V0h${w}z` ||
                d === `M0 ${h}V0h${w}v${h}z` ||
                d === `M${w} 0v${h}H0V0z` ||
                (child.name === "rect" &&
                  Number(child.attributes.width) === w &&
                  Number(child.attributes.height) === h));
            if (isFull && node.attributes.id) {
              fullFrame.add(node.attributes.id);
              parent.children = parent.children.filter((c) => c !== node);
            }
          }
        },
        exit: (node: XastElement, parent: XastParent) => {
          const ref =
            node.attributes["clip-path"]?.match(/^url\(#(.+)\)$/)?.[1];
          if (ref && fullFrame.has(ref)) delete node.attributes["clip-path"];
          if (
            node.name === "defs" &&
            (!node.children || node.children.length === 0)
          ) {
            parent.children = parent.children.filter((c) => c !== node);
          }
        },
      },
    };
  },
};

/** Base SVGO config shared by outlined/filled variants (all colors → currentColor) */
const baseConfig: Config = {
  multipass: true,
  plugins: [
    removeFullFrameClipPaths,
    {
      name: "preset-default",
      params: {
        overrides: {
          // Keep viewBox for scaling
          removeViewBox: false,
          // Keep IDs — we'll namespace them
          cleanupIds: false,
        },
      },
    },
    // Remove fixed dimensions (we control size via React props)
    "removeDimensions",
    // Replace hardcoded colors with currentColor
    {
      name: "convertColors",
      params: {
        currentColor: true,
      },
    },
    // Remove fill="none" on root svg (keep on inner elements for duotone)
    {
      name: "removeAttrs",
      params: {
        attrs: ["svg:fill:none", "svg:xmlns:xlink"],
      },
    },
  ],
};

/**
 * SVGO config for duotone variants.
 * Does NOT use convertColors — instead uses a custom plugin to only replace
 * the primary color with currentColor and map accent colors to tokens.
 */
const duotoneConfig: Config = {
  multipass: true,
  plugins: [
    removeFullFrameClipPaths,
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: false,
        },
      },
    },
    "removeDimensions",
    // Custom plugin: convert primary color to currentColor,
    // and map secondary colors to design token CSS custom properties
    {
      name: "duotone-colors-to-tokens",
      fn: () => ({
        element: {
          enter: (node) => {
            const primarySet = new Set(
              DUOTONE_PRIMARY_COLORS.map((c) => c.toLowerCase()),
            );
            for (const attr of ["fill", "stroke", "stop-color"] as const) {
              const value = node.attributes[attr];
              if (!value) continue;
              const lower = value.toLowerCase();
              if (primarySet.has(lower)) {
                node.attributes[attr] = "currentColor";
              } else if (DUOTONE_COLOR_TO_TOKEN[lower]) {
                node.attributes[attr] = DUOTONE_COLOR_TO_TOKEN[lower];
              }
            }
          },
        },
      }),
    },
    {
      name: "removeAttrs",
      params: {
        attrs: ["svg:fill:none", "svg:xmlns:xlink"],
      },
    },
  ],
};

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

/** Returns the hardcoded colors still present in an optimised SVG. */
function findHardcodedColors(svg: string): string[] {
  const found = [...svg.matchAll(HARDCODED_COLOR_RE)].map((m) => m[1]!);
  for (const t of FORBIDDEN_TOKENS)
    if (svg.includes(`var(${t})`)) found.push(`var(${t}) (forbidden)`);
  return found;
}

function main() {
  const only = parseOnly(process.argv.slice(2));
  let total = 0;
  const offenders: string[] = [];

  for (const variant of VARIANTS) {
    const dir = join(SVG_DIR, variant);
    let files: string[];
    try {
      files = readdirSync(dir).filter((f) => f.endsWith(".svg"));
    } catch {
      console.warn(`⚠️  Skipping ${variant}/ (not found)`);
      continue;
    }

    if (only.size > 0) {
      files = files.filter((f) => {
        const name = basename(f, ".svg").replace(/-(16|24)$/, "");
        return only.has(name);
      });
    }

    const config = variant === "duotone" ? duotoneConfig : baseConfig;

    for (const file of files) {
      const filepath = join(dir, file);
      const raw = readFileSync(filepath, "utf-8");

      const result = optimize(raw, {
        ...config,
        path: filepath,
      });

      for (const color of findHardcodedColors(result.data)) {
        offenders.push(`${variant}/${file}: ${color}`);
      }

      writeFileSync(filepath, result.data, "utf-8");
      total++;
    }
  }

  if (only.size > 0 && total === 0) {
    console.error(`❌ No SVG found for --only ${[...only].join(",")}`);
    process.exit(1);
  }

  console.log(`✅ Optimised ${total} SVGs`);

  if (offenders.length > 0) {
    console.error(
      `\n❌ ${offenders.length} hardcoded color(s) remain after optimisation.` +
        "\n   Map each Figma color to a design token in DUOTONE_COLOR_TO_TOKEN" +
        " (match the hex in comete-tokens.css — never guess):",
    );
    for (const o of offenders) console.error(`   - ${o}`);
    process.exit(1);
  }
}

main();
