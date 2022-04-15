// @ts-check

export default function getBreakpoints(breakpoints, imageWidth) {
  if (Array.isArray(breakpoints)) {
    return breakpoints.sort((a, b) => a - b);
  }

  const { count, minWidth = 320 } = breakpoints || {};

  const maxWidth = (() => {
    if (breakpoints?.maxWidth) return breakpoints.maxWidth;

    if (imageWidth > 2880) {
      console.log(
        "\x1b[48m%s\x1b[0m",
        " warning ",
        "\x1b[33mThe width of the source image is greater than 2880px. The generated breakpoints will be capped at 2880px. If you need breakpoints larger than this, please pass the maxWidth option to the breakpoints property.\x1b[0m",
        `\x1b[2m${Error().stack.slice(5)}\x1b[0m`
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
