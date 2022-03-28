// @ts-check

export default function getBackgroundStyles(
  images,
  className,
  objectFit,
  objectPosition
) {
  const sourcesWithFallback = images.filter(({ fallback }) => fallback);

  if (sourcesWithFallback.length === 0) {
    return "";
  }

  const staticStyles = `
    .${className} span {
      inset: 0;
      content: "";
      position: absolute;
    }
  `;

  const dynamicStyles = images
    .map(({ media, fallback, object }) => {
      const style = `
        .${className} img {
          object-fit: ${object?.fit || objectFit};
          object-position: ${object?.position || objectPosition};
        }

        .${className} span {
          background-size: ${object?.fit || objectFit};
          background-image: url("${encodeURI(fallback)}");
          background-position: ${object?.position || objectPosition};
        }
      `;

      return media ? `@media ${media} { ${style} }` : style;
    })
    .reverse();

  const bgStyles = `<style>
    ${[staticStyles, ...dynamicStyles].join("")}
  </style>`;

  return bgStyles;
}
