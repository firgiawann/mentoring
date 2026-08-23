import { describe, expect, it } from "vitest";

import { materialExperiences, getMaterialExperience } from "@/features/materials/material-experiences";
import { materials } from "@/features/prototype/mock-data";

describe("interactive material catalog", () => {
  it("maps every official module chapter to one unique experience", () => {
    expect(materials).toHaveLength(14);
    expect(materials[0]?.title).toBe("Panduan Mentoring");
    expect(materials[13]?.title).toBe("Konsultasi dengan Penasihat Akademik");
    expect(materialExperiences).toHaveLength(14);
    expect(new Set(materialExperiences.map((item) => item.materialId)).size).toBe(14);
    expect(materialExperiences.every((item) => item.blocks.length > 0)).toBe(true);
  });

  it("provides varied activities without requiring a meeting assignment", () => {
    const blockTypes = new Set(materialExperiences.flatMap((item) => item.blocks.map((block) => block.type)));

    expect(blockTypes.has("checklist")).toBe(true);
    expect(blockTypes.has("reflection")).toBe(true);
    expect(blockTypes.has("scenario")).toBe(true);
    expect(blockTypes.has("true_false")).toBe(true);
    expect(blockTypes.has("ordering")).toBe(true);
    expect(getMaterialExperience("material-01")?.sourcePages).toEqual([1, 6]);
    expect(materialExperiences.every((item) => !("meetingIds" in item))).toBe(true);
  });
});
