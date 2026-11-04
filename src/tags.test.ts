import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { readIconNames } from "./omnis-build.js";
import { iconRegistry } from "./registry.js";
import { getIconOmnisIds, getIconTags, searchIcons } from "./search.js";
import { iconTags } from "./tags.js";
import {
  buildTags,
  readTagRows,
  renderTagsCsv,
  renderTagsModule,
} from "./tags-build.js";
import type { IconName } from "./types.js";

const ROOT = join(import.meta.dirname, "..");
const ICON_NAMES = readIconNames(
  readFileSync(join(ROOT, "src/types.ts"), "utf-8"),
);

describe("iconTags", () => {
  it("should list exactly the icons of the registry", () => {
    expect(Object.keys(iconTags).sort()).toEqual(
      Object.keys(iconRegistry).sort(),
    );
  });

  it("should match the generated output when data/icon-tags.csv changes", () => {
    const csv = readFileSync(join(ROOT, "data/icon-tags.csv"), "utf-8");
    const rows = buildTags(readTagRows(csv), ICON_NAMES);
    // Échec = lancer `pnpm sync-tags`.
    expect(readFileSync(join(ROOT, "src/tags.ts"), "utf-8")).toBe(
      renderTagsModule(rows),
    );
    expect(csv).toBe(renderTagsCsv(rows));
  });
});

describe("readTagRows", () => {
  it("should trim tags and drop duplicates when only accents or case differ", () => {
    expect(
      readTagRows(
        "Nom;Tags\nPayments; Montant |montant| Facturé | facture |\n",
      ),
    ).toEqual([{ name: "Payments", tags: ["Montant", "Facturé"] }]);
  });

  it("should keep a separator inside a quoted field", () => {
    expect(readTagRows('Nom;Tags\nKey;"Mot de passe; code"\n')).toEqual([
      { name: "Key", tags: ["Mot de passe; code"] },
    ]);
  });

  it("should throw when an icon is listed twice", () => {
    expect(() => readTagRows("Nom;Tags\nKey;a\nKey;b\n")).toThrow(/double/);
  });
});

describe("buildTags", () => {
  const names = new Set(["Key", "Payments"]);

  it("should throw when a name is not in the package", () => {
    expect(() =>
      buildTags(
        [
          { name: "Key", tags: [] },
          { name: "Payments", tags: [] },
          { name: "Nope", tags: [] },
        ],
        names,
      ),
    ).toThrow(/Nope/);
  });

  it("should throw when an icon has no row", () => {
    expect(() => buildTags([{ name: "Key", tags: [] }], names)).toThrow(
      /Payments/,
    );
  });

  it("should throw when a tag is a feature path", () => {
    expect(() =>
      buildTags(
        [
          { name: "Key", tags: ["Plan. > Menu vacation"] },
          { name: "Payments", tags: [] },
        ],
        names,
      ),
    ).toThrow(/chemin/);
  });

  it("should round-trip through the CSV when a tag contains a separator", () => {
    const rows = [
      { name: "Key", tags: ['Mot "clé"; code'] },
      { name: "Payments", tags: [] },
    ];
    expect(readTagRows(renderTagsCsv(rows))).toEqual(rows);
  });
});

describe("searchIcons", () => {
  it("should return every icon when the query is empty", () => {
    expect(searchIcons("  ")).toHaveLength(Object.keys(iconRegistry).length);
  });

  it("should find an icon by a tag when accents and case differ", () => {
    expect(searchIcons("SECURITE sociale")).toContain("MedicalInformation");
  });

  it("should find an icon by its exact Omnis ID first", () => {
    expect(searchIcons("99990802")[0]).toBe("Payments");
  });

  it("should rank a name match before a tag match", () => {
    const results = searchIcons("search");
    expect(results[0]).toBe("Search");
  });

  it("should require every word of the query to match", () => {
    for (const name of searchIcons("case cochée")) {
      const haystack = [name, ...getIconTags(name)].join(" ").toLowerCase();
      expect(haystack).toContain("case");
      expect(haystack).toMatch(/coch/);
    }
    expect(searchIcons("case zzzz")).toEqual([]);
  });

  it("should match a word of a camelCase name", () => {
    expect(searchIcons("range")).toContain("DateRange");
  });
});

describe("getIconOmnisIds", () => {
  it("should return every Omnis ID of an icon", () => {
    expect(getIconOmnisIds("DateRange")).toEqual(
      expect.arrayContaining([7009, 180008]),
    );
  });

  it("should return an empty list when the icon has no Omnis ID", () => {
    expect(getIconOmnisIds("Figma" as IconName)).toEqual([]);
  });
});
