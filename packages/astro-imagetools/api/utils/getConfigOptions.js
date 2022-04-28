// @ts-check
import getBreakpoints from "./getBreakpoints.js";

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
      : imagesizes(requiredBreakpoints);

  return {
    formats,
    imagesizes,
    requiredBreakpoints,
  };
}
