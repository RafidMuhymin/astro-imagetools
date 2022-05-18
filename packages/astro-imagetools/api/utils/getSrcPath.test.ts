import path from "node:path";
import { describe, expect, it, afterAll, vi } from "vitest";
import { getSrcPath } from "./getSrcPath";

vi.mock("../../astroViteConfigs.js", () => {
  return {
    default: {
      rootDir: buildPath(),
      // Custom publicDir
      publicDir: buildPath("out"),
    },
  };
});

/**
 * Build an absolute path to the target in the fixture directory
 */
function buildPath(target = "") {
  return path.resolve(__dirname, "../../test-fixtures/getSrcPath", target);
}

describe("getLinkElement", () => {
  afterAll(() => {
    vi.unmock("../../astroViteConfigs.js");
  });

  it("finds a file in the root of the project", async () => {
    const result = await getSrcPath("root.jpeg");
    expect(result).toBe(buildPath("root.jpeg"));
  });

  it("finds a file in the public folder", async () => {
    const result = await getSrcPath("out.jpeg");
    expect(result).toBe(buildPath("out/out.jpeg"));
  });

  it("returns an absolute path unchanged, if it exists", async () => {
    const result = await getSrcPath(buildPath("out/out.jpeg"));
    expect(result).toBe(buildPath("out/out.jpeg"));
  });

  it("handles query parameters", async () => {
    const result = await getSrcPath("root.jpeg?w=200");
    expect(result).toBe(buildPath("root.jpeg?w=200"));
  });

  it("handles query parameters for public-resolved files", async () => {
    const result = await getSrcPath("out.jpeg?w=200");
    expect(result).toBe(buildPath("out/out.jpeg?w=200"));
  });

  it("returns the original input if the file is not found", async () => {
    const result = await getSrcPath(
      "https://cdn.nedis.com/images/products_high_res/TVRC2080BK_P30.JPG"
    );
    expect(result).toBe(
      "https://cdn.nedis.com/images/products_high_res/TVRC2080BK_P30.JPG"
    );
  });

  it("finds relative paths correctly", async () => {
    const outResult = await getSrcPath("./out/out.jpeg");
    const rootResult = await getSrcPath("./root.jpeg");
    expect(outResult).toBe(buildPath("out/out.jpeg"));
    expect(rootResult).toBe(buildPath("root.jpeg"));
  });
});
