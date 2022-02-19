// @ts-check

import getBreakpoints from "./getBreakpoints";

export default function getConfigOptions(
  imageWidth,
  imagesizes,
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

  imagesizes =
    typeof imagesizes === "string"
      ? imagesizes
      : typeof imagesizes === "function"
      ? imagesizes(requiredBreakpoints)
      : (() => {
          const maxWidth = requiredBreakpoints.at(-1);
          return `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`;
        })();

  return {
    formats,
    imagesizes,
    requiredBreakpoints,
  };
}
