import { describe, expect, it } from "vitest";
import getLinkElement from "./getLinkElement";

describe("getLinkElement", () => {
  it("returns an empty string if preload is not set", () => {
    const result = getLinkElement({ linkAttributes: {} });
    expect(result).toBe("");
  });

  it("returns an empty string if no images are provided", () => {
    const result = getLinkElement({ linkAttributes: {}, preload: "webp" });
    expect(result).toBe("");
  });
});
