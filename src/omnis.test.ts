import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getIconByOmnisId, omnisIcons, omnisUnmappedIds } from "./omnis.js";
import {
  buildOmnis,
  parseCsv,
  readIconNames,
  readOmnisRows,
  renderOmnisModule,
  resolveOmnisName,
} from "./omnis-build.js";
import { iconRegistry } from "./registry.js";

const ROOT = join(import.meta.dirname, "..");
const ICON_NAMES = readIconNames(
  readFileSync(join(ROOT, "src/types.ts"), "utf-8"),
);

describe("omnisIcons", () => {
  it("should map every Omnis ID to an icon of the registry", () => {
    for (const { name } of Object.values(omnisIcons)) {
      expect(iconRegistry[name]).toBeDefined();
    }
  });

  it("should match the generated output when data/omnis-icons.csv changes", () => {
    const rows = readOmnisRows(
      readFileSync(join(ROOT, "data/omnis-icons.csv"), "utf-8"),
    );
    const expected = renderOmnisModule(buildOmnis(rows, ICON_NAMES));
    const actual = readFileSync(join(ROOT, "src/omnis.ts"), "utf-8");
    // Échec = lancer `pnpm sync-omnis`.
    expect(actual).toBe(expected);
  });

  it("should not list an ID as both mapped and unmapped", () => {
    for (const id of omnisUnmappedIds) {
      expect(getIconByOmnisId(id)).toBeUndefined();
    }
  });
});

describe("getIconByOmnisId", () => {
  it("should return the icon when the ID is a known number", () => {
    expect(getIconByOmnisId(99990101)).toEqual({ name: "Check" });
  });

  it("should return the icon when the ID is a numeric string", () => {
    expect(getIconByOmnisId(" 7009 ")).toEqual({ name: "DateRange" });
  });

  it("should return the color when the Omnis icon is a disabled state", () => {
    expect(getIconByOmnisId(2515)).toEqual({
      name: "CheckBox",
      color: "disabled",
    });
  });

  it("should return undefined when the ID is unknown", () => {
    expect(getIconByOmnisId(180012)).toBeUndefined();
  });

  it("should return undefined when the ID is not an integer", () => {
    expect(getIconByOmnisId("abc")).toBeUndefined();
    expect(getIconByOmnisId("")).toBeUndefined();
  });
});

describe("resolveOmnisName", () => {
  const names = new Set(["CheckBox", "Star", "LockCritical"]);

  it("should keep the exact name when it exists in the package", () => {
    expect(resolveOmnisName("LockCritical", names)).toEqual({
      name: "LockCritical",
    });
  });

  it("should map the Filled suffix to the filled variant", () => {
    expect(resolveOmnisName("StarFilled", names)).toEqual({
      name: "Star",
      variant: "filled",
    });
  });

  it("should keep the disabled color when Critical and Disabled are combined", () => {
    expect(resolveOmnisName("CheckBoxDisabledCritical", names)).toEqual({
      name: "CheckBox",
      color: "disabled",
    });
    expect(resolveOmnisName("CheckBoxCriticalDisabled", names)).toEqual({
      name: "CheckBox",
      color: "disabled",
    });
  });

  it("should return undefined when no base icon exists", () => {
    expect(resolveOmnisName("UnknownDisabled", names)).toBeUndefined();
  });
});

describe("readOmnisRows", () => {
  it("should read an Excel export with extra columns and quoted fields", () => {
    const csv =
      '﻿Page;ID Omnis;Nom;Signification\n1;7009;DateRange;"Prestation; ligne\nsuite"\n1;9002;Empty;\n1;;;\n';
    expect(readOmnisRows(csv)).toEqual([{ id: 7009, name: "DateRange" }]);
  });

  it("should throw when an ID is duplicated", () => {
    expect(() => readOmnisRows("ID Omnis;Nom\n1;A\n1;B\n")).toThrow(/double/);
  });

  it("should throw when a name is unknown and not allowlisted", () => {
    expect(() => buildOmnis([{ id: 1, name: "Nope" }], ICON_NAMES)).toThrow(
      /1 Nope/,
    );
  });

  it("should split comma-separated CSV", () => {
    expect(parseCsv("a,b\n1,2")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
  });
});
