/**
 * fetch-icons.ts
 *
 * Fetches all icon SVGs from the Figma file via the REST API.
 * Organises them into svg/{variant}/{IconName}-{24|16}.svg
 *
 * Reads FIGMA_TOKEN from .env or environment variable.
 *
 * Usage:  pnpm figma:sync
 */

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

// ─── .env loader (zero-dep) ────────────────────────────────────────────────
const ROOT = join(import.meta.dirname!, "..");
const envPath = join(ROOT, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = (match[2] ?? "").replace(/^["']|["']$/g, "");
    }
  }
}

// ─── Config ────────────────────────────────────────────────────────────────
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
if (!FIGMA_TOKEN) {
  console.error(
    "❌ Missing FIGMA_TOKEN. Set it in .env or pass via env variable.",
  );
  process.exit(1);
}

const FILE_KEY = "3rYV3P1VzRh0q22HNhgCZv";
const FRAME_NODE_ID = "1:965"; // "DO NOT DELETE THIS FRAME (targeted by script)"
const SVG_DIR = join(ROOT, "svg");
const MANIFEST_PATH = join(SVG_DIR, ".manifest.json");
const BATCH_SIZE = 100; // Figma API limit per images request
const DEBUG = process.argv.includes("--debug");
const FORCE = process.argv.includes("--force");

// ─── Types ─────────────────────────────────────────────────────────────────
interface FigmaNode {
  id: string;
  name: string;
  type: string;
  /** Absent = visible. L'API REST n'émet `visible: false` que pour un nœud masqué. */
  visible?: boolean;
  children?: FigmaNode[];
}

interface IconEntry {
  nodeId: string;
  iconName: string;
  variant: "outlined" | "filled" | "duotone";
  spacing: "default" | "none";
}

interface ManifestEntry {
  nodeId: string;
  iconName: string;
  variant: string;
  spacing: string;
  hash: string; // sha256 du contenu SVG
}

interface Manifest {
  lastModified: string; // Figma file lastModified
  generatedAt: string;
  icons: Record<string, ManifestEntry>; // clé = "{variant}/{IconName}-{size}.svg"
}

function svgHash(content: string): string {
  return createHash("sha256").update(content).digest("hex").slice(0, 16);
}

function loadManifest(): Manifest | null {
  if (!existsSync(MANIFEST_PATH)) return null;
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf-8")) as Manifest;
  } catch {
    return null;
  }
}

function saveManifest(manifest: Manifest): void {
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
}

// ─── Helpers ───────────────────────────────────────────────────────────────
async function figmaGet<T>(path: string, retries = 3): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`https://api.figma.com/v1${path}`, {
      headers: { "X-Figma-Token": FIGMA_TOKEN! },
    });
    if (res.status === 429 && attempt < retries) {
      const wait = 2 ** (attempt + 1) * 15_000; // 30s, 60s, 120s
      console.warn(
        `⏳ Rate limited, waiting ${Math.round(wait / 1000)}s before retry…`,
      );
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) {
      throw new Error(`Figma API ${res.status}: ${await res.text()}`);
    }
    return res.json() as Promise<T>;
  }
  throw new Error("Figma API: max retries exceeded");
}

function parseVariantProps(name: string): Record<string, string> {
  const props: Record<string, string> = {};
  for (const part of name.split(",")) {
    const eq = part.indexOf("=");
    if (eq > 0) {
      props[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
    }
  }
  return props;
}

/**
 * Recursively walks the Figma tree to collect every leaf node that
 * represents an icon variant (has variant/spacing/size properties).
 *
 * Icon frames are named "Icon/{Name}" — can be any node type (FRAME,
 * COMPONENT_SET, GROUP, etc.). Leaf variants can be INSTANCE, COMPONENT,
 * or any type with property syntax in the name.
 */
function collectIcons(
  node: FigmaNode,
  parentIconName?: string,
  depth = 0,
): IconEntry[] {
  const results: IconEntry[] = [];

  // REASON: dans Figma, une icône masquée (elle ou un de ses conteneurs) est une
  // icône non encore validée : elle ne doit jamais être exportée dans le paquet.
  if (node.visible === false) {
    if (DEBUG)
      console.log(`${"  ".repeat(depth)}🙈 masqué, ignoré : ${node.name}`);
    return results;
  }

  // Detect Icon/Name containers (any type, not just FRAME)
  let iconName = parentIconName;
  if (node.name.startsWith("Icon/")) {
    iconName = node.name.replace("Icon/", "");
    if (DEBUG)
      console.log(
        `${"  ".repeat(depth)}📁 Icon/${iconName} [${node.type}] id=${node.id}`,
      );
  }

  // Check if this node has variant properties (leaf node)
  const hasProps =
    node.name.includes("variant=") ||
    node.name.includes("size=") ||
    node.name.includes("spacing=");

  if (iconName && hasProps) {
    const props = parseVariantProps(node.name);
    const variant = (props.variant ?? "outlined") as IconEntry["variant"];

    // "spacing" property: default = with padding (24px viewBox), none = no padding (16px viewBox)
    // Also handle legacy "size" property: default/small
    const spacingRaw = props.spacing ?? props.size ?? "default";
    const spacing: IconEntry["spacing"] =
      spacingRaw === "none" || spacingRaw === "small" ? "none" : "default";

    // Skip special/placeholder icons
    if (iconName !== "Empty" && iconName !== "Unused") {
      if (DEBUG) {
        console.log(
          `${"  ".repeat(depth)}  ✓ ${node.name} [${node.type}] → ${iconName} ${variant}/${spacing}`,
        );
      }
      results.push({ nodeId: node.id, iconName, variant, spacing });
    }
  }

  // Recurse into children
  if (node.children) {
    for (const child of node.children) {
      results.push(...collectIcons(child, iconName, depth + 1));
    }
  }

  return results;
}

/** Debug: print a summary of node types found at each level */
function debugTree(node: FigmaNode, depth = 0, maxDepth = 4): void {
  if (depth > maxDepth) return;
  const childCount = node.children?.length ?? 0;
  console.log(
    `${"  ".repeat(depth)}[${node.type}] "${node.name}" (${childCount} children) id=${node.id}`,
  );
  if (node.children) {
    for (const child of node.children) {
      debugTree(child, depth + 1, maxDepth);
    }
  }
}

async function downloadSvg(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}`);
  return res.text();
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log("📡 Fetching Figma file tree…");

  // Fetch file metadata to get lastModified
  const fileMeta = await figmaGet<{ lastModified: string }>(
    `/files/${FILE_KEY}?depth=1`,
  );
  const fileLastModified = fileMeta.lastModified;
  console.log(`📅 Figma lastModified: ${fileLastModified}`);

  // Check manifest for early exit (no changes at all)
  const prevManifest = loadManifest();
  if (
    !FORCE &&
    prevManifest &&
    prevManifest.lastModified === fileLastModified
  ) {
    console.log(
      "✅ Aucun changement détecté dans le fichier Figma depuis le dernier sync.",
    );
    console.log(
      "   Utilisez --force pour forcer un re-téléchargement complet.",
    );
    return;
  }

  const data = await figmaGet<{
    nodes: Record<string, { document: FigmaNode }>;
  }>(`/files/${FILE_KEY}/nodes?ids=${FRAME_NODE_ID}&depth=10`);

  const rootNode = data.nodes[FRAME_NODE_ID]?.document;
  if (!rootNode) {
    // Try URL-encoded key format (1-965 vs 1:965)
    const altKey = Object.keys(data.nodes)[0];
    if (altKey) {
      console.log(
        `ℹ️  Node key returned as "${altKey}" (expected "${FRAME_NODE_ID}")`,
      );
      const altNode = data.nodes[altKey]?.document;
      if (altNode) {
        return runWithRoot(altNode, fileLastModified, prevManifest);
      }
    }
    console.error("❌ Could not find node", FRAME_NODE_ID);
    console.error("   Available keys:", Object.keys(data.nodes));
    process.exit(1);
  }

  return runWithRoot(rootNode, fileLastModified, prevManifest);
}

async function runWithRoot(
  rootNode: FigmaNode,
  fileLastModified: string,
  prevManifest: Manifest | null,
) {
  console.log(
    `📂 Root: "${rootNode.name}" [${rootNode.type}] — ${rootNode.children?.length ?? 0} children`,
  );

  if (DEBUG) {
    console.log("\n── Tree structure (4 levels) ──");
    debugTree(rootNode, 0, 4);
    console.log("── End tree ──\n");
  }

  const icons = collectIcons(rootNode);
  console.log(`🔍 Found ${icons.length} icon variants`);

  if (icons.length === 0) {
    console.log("\n⚠️  No icons found. Run with --debug to inspect the tree:");
    console.log("   pnpm figma:sync -- --debug");

    const leaves: string[] = [];
    function findLeaves(n: FigmaNode, d = 0) {
      if (!n.children || n.children.length === 0) {
        leaves.push(`  [${n.type}] "${n.name}" id=${n.id}`);
      } else if (d < 8) {
        for (const c of n.children) findLeaves(c, d + 1);
      }
    }
    findLeaves(rootNode);
    console.log(`\n   Sample leaf nodes (${leaves.length} total):`);
    for (const l of leaves.slice(0, 20)) console.log(l);
    if (leaves.length > 20) console.log(`   … and ${leaves.length - 20} more`);
    return;
  }

  // Build current icon key set for comparison
  const currentKeys = new Set<string>();
  const iconByKey = new Map<string, IconEntry>();
  for (const icon of icons) {
    const sizeLabel = icon.spacing === "default" ? "24" : "16";
    const key = `${icon.variant}/${icon.iconName}-${sizeLabel}.svg`;
    currentKeys.add(key);
    iconByKey.set(key, icon);
  }

  // Ensure svg/ directory structure exists
  for (const variant of ["outlined", "filled", "duotone"] as const) {
    mkdirSync(join(SVG_DIR, variant), { recursive: true });
  }

  // Determine which icons to fetch (incremental vs full)
  let iconsToFetch: IconEntry[];
  let removedKeys: string[] = [];

  if (FORCE || !prevManifest) {
    // Full sync: clean and re-download everything
    if (existsSync(SVG_DIR)) {
      rmSync(SVG_DIR, { recursive: true });
      console.log("🧹 Cleaned svg/ directory");
    }
    for (const variant of ["outlined", "filled", "duotone"] as const) {
      mkdirSync(join(SVG_DIR, variant), { recursive: true });
    }
    iconsToFetch = icons;
    console.log(
      FORCE
        ? "🔄 Mode --force : re-téléchargement complet"
        : "🆕 Premier sync : téléchargement complet",
    );
  } else {
    // Incrémental ADDITIF : on récupère les icônes nouvelles/modifiées de Figma,
    // mais on NE SUPPRIME JAMAIS celles présentes dans le repo et absentes de
    // Figma. Règle : le pipeline ajoute, il n'enlève pas d'icône du paquet.
    const prevKeys = new Set(Object.keys(prevManifest.icons));

    // New icons = present in Figma but not in manifest
    const newKeys = [...currentKeys].filter((k) => !prevKeys.has(k));

    // Icônes du repo absentes de Figma : conservées (jamais supprimées).
    removedKeys = [...prevKeys].filter((k) => !currentKeys.has(k));

    // Changed icons = nodeId changed (icon was re-created/replaced in Figma)
    const changedKeys = [...currentKeys].filter((k) => {
      if (!prevKeys.has(k)) return false;
      const prev = prevManifest.icons[k];
      const curr = iconByKey.get(k)!;
      return prev.nodeId !== curr.nodeId;
    });

    iconsToFetch = [...newKeys, ...changedKeys]
      .map((k) => iconByKey.get(k)!)
      .filter(Boolean);

    // Additif : aucune suppression de SVG sur disque (removedKeys est seulement
    // rapporté, jamais appliqué).

    console.log(
      `📊 Incrémental : ${newKeys.length} nouvelles, ${changedKeys.length} modifiées, ${removedKeys.length} absentes de Figma (conservées)`,
    );

    if (iconsToFetch.length === 0) {
      console.log("✅ Aucune icône à ajouter/mettre à jour.");
      // Still update manifest with new lastModified
      const manifest: Manifest = {
        ...prevManifest,
        lastModified: fileLastModified,
        generatedAt: new Date().toISOString(),
      };
      saveManifest(manifest);
      return;
    }
  }

  // Batch export SVGs via Figma images endpoint
  if (iconsToFetch.length > 0) {
    const allNodeIds = iconsToFetch.map((i) => i.nodeId);
    const urlMap: Record<string, string> = {};

    for (let i = 0; i < allNodeIds.length; i += BATCH_SIZE) {
      const batch = allNodeIds.slice(i, i + BATCH_SIZE);
      console.log(
        `📦 Requesting SVG export batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allNodeIds.length / BATCH_SIZE)}…`,
      );

      const result = await figmaGet<{ images: Record<string, string> }>(
        `/images/${FILE_KEY}?ids=${batch.join(",")}&format=svg`,
      );

      Object.assign(urlMap, result.images);
    }

    // Download and save each SVG
    let saved = 0;
    let errors = 0;

    const CONCURRENCY = 20;
    const entries = iconsToFetch.map((icon) => ({
      icon,
      url: urlMap[icon.nodeId],
    }));

    for (let i = 0; i < entries.length; i += CONCURRENCY) {
      const chunk = entries.slice(i, i + CONCURRENCY);

      await Promise.all(
        chunk.map(async ({ icon, url }) => {
          if (!url) {
            console.warn(
              `⚠️  No URL for ${icon.iconName} (${icon.variant}/${icon.spacing})`,
            );
            errors++;
            return;
          }

          try {
            const svg = await downloadSvg(url);
            const sizeLabel = icon.spacing === "default" ? "24" : "16";
            const filename = `${icon.iconName}-${sizeLabel}.svg`;
            const filepath = join(SVG_DIR, icon.variant, filename);
            writeFileSync(filepath, svg, "utf-8");
            saved++;
          } catch (err) {
            console.warn(`⚠️  Failed to download ${icon.iconName}: ${err}`);
            errors++;
          }
        }),
      );
    }

    console.log(`\n✅ Saved ${saved} SVGs (${errors} errors)`);
  }

  if (removedKeys.length > 0) {
    console.log(
      `ℹ️  ${removedKeys.length} icône(s) du repo absente(s) de Figma — conservée(s) (pipeline additif).`,
    );
  }

  // Build and save manifest
  const manifestIcons: Record<string, ManifestEntry> = {};
  for (const icon of icons) {
    const sizeLabel = icon.spacing === "default" ? "24" : "16";
    const key = `${icon.variant}/${icon.iconName}-${sizeLabel}.svg`;
    const filepath = join(SVG_DIR, key);

    let hash = "";
    if (existsSync(filepath)) {
      hash = svgHash(readFileSync(filepath, "utf-8"));
    }

    manifestIcons[key] = {
      nodeId: icon.nodeId,
      iconName: icon.iconName,
      variant: icon.variant,
      spacing: icon.spacing,
      hash,
    };
  }

  const manifest: Manifest = {
    lastModified: fileLastModified,
    generatedAt: new Date().toISOString(),
    icons: manifestIcons,
  };
  saveManifest(manifest);
  console.log(
    `📋 Manifeste sauvegardé (${Object.keys(manifestIcons).length} entrées)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
