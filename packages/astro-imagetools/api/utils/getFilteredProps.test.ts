import { describe, expect, it } from "vitest";
import getFilteredProps from "./getFilteredProps";

describe("getFilteredProps", () => {
  it("should should merge in default props", () => {
    const result = getFilteredProps("Img", { src: "/img.jpeg", alt: "alt" });
    expect(result).toEqual({
      filteredProps: {
        alt: "alt",
        attributes: {},
        breakpoints: undefined,
        decoding: "async",
        format: undefined,
        formatOptions: {
          tracedSVG: {
            function: "trace",
          },
        },
        layout: "constrained",
        loading: "lazy",
        objectFit: "cover",
        objectPosition: "50% 50%",
        placeholder: "blurred",
        preload: undefined,
        sizes: expect.any(Function),
        src: "/img.jpeg",
      },
      transformConfigs: {},
    });
  });

  it("should accept empty string for `alt` prop on Img", () => {
    const result = getFilteredProps("Img", { src: "/img.jpeg", alt: "" });
    expect(result).toMatchObject({
      filteredProps: {
        alt: "",
      },
    });
  });

  it("should accept empty string for `alt` prop on Picture", () => {
    const result = getFilteredProps("Picture", { src: "/img.jpeg", alt: "" });
    expect(result).toMatchObject({
      filteredProps: {
        alt: "",
      },
    });
  });
});
