// @ts-check
import printWarning from "./printWarning.js";

export default function getBreakpoints(breakpoints, imageWidth) {
  if (Array.isArray(breakpoints)) {
    return breakpoints.sort((a, b) => a - b);
  }

  const { count, minWidth = 320 } = breakpoints || {};

  const maxWidth = (() => {
    if (breakpoints?.maxWidth) return breakpoints.maxWidth;

    if (imageWidth > 2880) {
      printWarning(
        null,
        null,
        "The width of the source image is greater than 2880px. The generated breakpoints will be capped at 2880px. If you need breakpoints larger than this, please pass the maxWidth option to the breakpoints property."
      );

      return 2880;
    }

    return imageWidth;
  })();

  const breakPoints = [],
    diff = maxWidth - minWidth,
    steps = count || (maxWidth < 400 ? 1 : maxWidth < 640 ? 2 : 3),
    pixelsPerStep = diff / steps;

  let currentWidth = minWidth;

  steps > 1 && breakPoints.push(currentWidth);

  for (let i = 1; i < steps - 1; i++) {
    const next = pixelsPerStep * (steps - i) + currentWidth;
    breakPoints.push(Math.round(next));
    currentWidth = next;
  }

  breakPoints.push(maxWidth);

  return [...new Set(breakPoints)];
}
