// @ts-check

export default function getBreakpoints(breakpoints, imageWidth) {
  if (Array.isArray(breakpoints)) {
    return breakpoints.sort((a, b) => a - b);
  }

  const { count, minWidth, maxWidth } = breakpoints || {};

  let current = minWidth || 320;
  const max = maxWidth || imageWidth;
  let n = count || (max < 400 ? 1 : max < 640 ? 2 : 3);

  const diff = max - current;
  const breakPoints = [];
  let steps = 0;

  for (let i = 1; i < n; i++) {
    steps += i;
  }

  const pixelsPerStep = diff / steps;

  n > 1 && breakPoints.push(current);

  for (let i = 1; i < n - 1; i++) {
    const next = pixelsPerStep * (n - i) + current;
    breakPoints.push(Math.round(next));
    current = next;
  }

  breakPoints.push(max);

  return [...new Set(breakPoints)];
}
