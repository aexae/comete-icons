import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Règle absolue du paquet : aucune couleur codée en dur (hex, rgb, hsl) dans
 * les composants ni dans la feuille de style. Toute couleur passe par un design
 * token (`currentColor` piloté par la classe, ou `var(--icon-*)` / `var(--logo-*)`).
 */
const ICONS_DIR = join(import.meta.dirname, "icons");
const STYLES_DIR = join(import.meta.dirname, "styles");

/**
 * Couleurs d'interaction : jamais dans le dessin d'une icône (src/icons).
 * Elles restent disponibles via la prop `color` (icons.css), choisie par le composant hôte.
 */
const FORBIDDEN_IN_ARTWORK = ["--icon-selected"];

const HARDCODED_COLOR_RE =
  /\b(?:fill|stroke|stopColor|stop-color|color)\s*[=:]\s*"?(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))/g;

function offendersIn(
  dir: string,
  ext: string,
  forbiddenTokens: string[] = [],
): string[] {
  const out: string[] = [];
  for (const file of readdirSync(dir)
    .filter((f) => f.endsWith(ext))
    .sort()) {
    const src = readFileSync(join(dir, file), "utf-8");
    for (const m of src.matchAll(HARDCODED_COLOR_RE)) {
      out.push(`${file}: ${m[1]}`);
    }
    for (const t of forbiddenTokens) {
      if (src.includes(`var(${t})`)) out.push(`${file}: var(${t}) (forbidden)`);
    }
  }
  return out;
}

describe("no hardcoded colors", () => {
  it("should only use design tokens in every icon component", () => {
    expect(offendersIn(ICONS_DIR, ".tsx", FORBIDDEN_IN_ARTWORK)).toEqual([]);
  });

  it("should only use design tokens in styles/icons.css", () => {
    expect(offendersIn(STYLES_DIR, ".css")).toEqual([]);
  });
});
