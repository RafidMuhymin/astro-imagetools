// @ts-check

export default function getBackgroundFallbackStyles(
  images,
  className,
  backgroundSize,
  backgroundPosition,
  fadeInTransition
) {
  const sourcesWithFallback = images.filter(({ fallback }) => fallback);

  if (sourcesWithFallback.length === 0) return "";

  const staticStyles = !fadeInTransition
    ? ""
    : `
        .${className}::after {
          inset: 0;
          z-index: -1;
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
        }
      `;

  const dynamicStyles = images
    .map(({ media, fallback, background }) => {
      const style = `
        .${className}::after {
          background-size: ${background?.size || backgroundSize};
          background-image: url("${encodeURI(fallback)}");
          background-position: ${background?.position || backgroundPosition};
        }
      `;

      return media ? `@media ${media} { ${style} }` : style;
    })
    .reverse();

  const bgStyles = [staticStyles, ...dynamicStyles].join("");

  return bgStyles;
}
