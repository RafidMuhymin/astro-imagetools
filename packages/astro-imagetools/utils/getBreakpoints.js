// @ts-check

export default function getBreakpoints(breakpoints, imageWidth) {
  if (Array.isArray(breakpoints)) {
    return breakpoints.sort((a, b) => a - b);
  }

  const { count, minWidth = 320, maxWidth = imageWidth } = breakpoints || {};

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
