import { describe, expect, it } from "vitest";
import { getIconClass } from "./utils.js";

describe("getIconClass", () => {
  it("should prefix every color with the comete-icon class", () => {
    const cases: Array<{
      color: Parameters<typeof getIconClass>[0];
      expected: string;
    }> = [
      { color: "default", expected: "comete-icon--default" },
      { color: "disabled", expected: "comete-icon--disabled" },
      { color: "inverted", expected: "comete-icon--inverted" },
      { color: "on-light-surface", expected: "comete-icon--on-light-surface" },
      { color: "on-dark-surface", expected: "comete-icon--on-dark-surface" },
      { color: "warning", expected: "comete-icon--warning" },
      { color: "critical", expected: "comete-icon--critical" },
      { color: "success", expected: "comete-icon--success" },
      { color: "brand", expected: "comete-icon--brand" },
      { color: "selected", expected: "comete-icon--selected" },
      { color: "information", expected: "comete-icon--information" },
      { color: "subtle", expected: "comete-icon--subtle" },
      { color: "subtlest", expected: "comete-icon--subtlest" },
      { color: "accentPurple", expected: "comete-icon--accentPurple" },
      { color: "accentTeal", expected: "comete-icon--accentTeal" },
      { color: "accentTurquoise", expected: "comete-icon--accentTurquoise" },
      { color: "accentMagenta", expected: "comete-icon--accentMagenta" },
      { color: "accentBlueGrey", expected: "comete-icon--accentBlueGrey" },
      { color: "bold", expected: "comete-icon--bold" },
      { color: "day", expected: "comete-icon--day" },
      { color: "night", expected: "comete-icon--night" },
    ];

    for (const { color, expected } of cases) {
      expect(getIconClass(color)).toBe(expected);
    }
  });
});
