import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ICON_COLORS } from "./types.js";

const ICONS_CSS = readFileSync(
  join(import.meta.dirname, "styles/icons.css"),
  "utf-8",
);

/** Classes `.comete-icon--<couleur>` déclarées dans icons.css. */
const CSS_COLORS = [...ICONS_CSS.matchAll(/^\.comete-icon--([\w-]+)\s*\{/gm)]
  .map((m) => m[1] ?? "")
  .sort((a, b) => a.localeCompare(b));

describe("ICON_COLORS", () => {
  it("should be sorted with localeCompare", () => {
    const sorted = [...ICON_COLORS].sort((a, b) => a.localeCompare(b));
    expect([...ICON_COLORS]).toEqual(sorted);
  });

  it("should not contain duplicates", () => {
    expect(new Set(ICON_COLORS).size).toBe(ICON_COLORS.length);
  });

  it("should have a `.comete-icon--<color>` class in icons.css for every color", () => {
    for (const color of ICON_COLORS) {
      expect(ICONS_CSS).toContain(`.comete-icon--${color} {`);
    }
  });

  it("should list every `.comete-icon--<color>` class of icons.css", () => {
    expect(CSS_COLORS).toEqual([...ICON_COLORS]);
  });
});
