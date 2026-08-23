import { describe, expect, it } from "vitest";

import { createSitePath } from "@/config/site-path";

describe("createSitePath", () => {
  it("prefixes absolute application paths for a GitHub project site", () => {
    expect(createSitePath("/icons/icon-192.svg", "/mentoring")).toBe("/mentoring/icons/icon-192.svg");
    expect(createSitePath("/", "/mentoring")).toBe("/mentoring/");
  });

  it("keeps local paths rooted when no deployment base path is configured", () => {
    expect(createSitePath("/dashboard", "")).toBe("/dashboard");
  });
});
