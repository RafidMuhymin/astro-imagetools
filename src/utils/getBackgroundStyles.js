// @ts-check

export default function getBackgroundStyles(
  images,
  className,
  objectFit,
  objectPosition,
  fadeInTransition
) {
  const sourcesWithFallback = images.filter(({ fallback }) => fallback);

  if (sourcesWithFallback.length === 0) return "";

  const staticStyles = !fadeInTransition
    ? ""
    : `
    .${className} {
      --opacity: 1;
      --z-index: 0;
    }

    .${className}::after {
      inset: 0;
      z-index: -1;
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      transition: opacity ${
        typeof fadeInTransition !== "object"
          ? "1s"
          : (() => {
              const {
                delay = "0s",
                duration = "1s",
                timingFunction = "ease",
              } = fadeInTransition;

              return `${duration} ${timingFunction} ${delay}`;
            })()
      };
      opacity: var(--opacity);
      z-index: var(--z-index);
    }
  `;

  const dynamicStyles = images
    .map(({ media, fallback, object }) => {
      const style = `
        .${className} img {
          object-fit: ${object?.fit || objectFit};
          object-position: ${object?.position || objectPosition};
        }

        .${className}::after {
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
