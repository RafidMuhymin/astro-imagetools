// @ts-check

import getBreakpoints from "./getBreakpoints";

export default function getConfigOptions(
  imageWidth,
  breakpoints,
  format,
  imageFormat,
  fallbackFormat,
  includeSourceFormat
) {
  const formats = [
    ...new Set(
      [format, includeSourceFormat && imageFormat]
        .flat()
        .filter((f) => f && f !== fallbackFormat)
    ),
    fallbackFormat,
  ];

  const requiredBreakpoints = getBreakpoints(breakpoints, imageWidth);

  return {
    formats,
    requiredBreakpoints,
  };
}
