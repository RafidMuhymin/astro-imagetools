// @ts-check
import getLink from "../utils/getLink.js";
import getImage from "../utils/getImage.js";
import { globalConfigOptions } from "../runtimeChecks.js";
import getBackgroundFallbackStyles from "../utils/getBackgroundFallbackStyles.js";

export default async function renderBackgroundImage(props) {
  const {
    src,
    tag = "section",
    content,
    sizes = (breakpoints) => {
      const maxWidth = breakpoints.at(-1);
      return `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`;
    },
    preload,
    breakpoints,
    placeholder = "blurred",
    artDirectives,
    format = ["avif", "webp"],
    formatOptions = {
      tracedSVG: {
        function: "trace",
      },
    },
    fallbackFormat,
    includeSourceFormat = true,
    fadeInTransition = true,
    backgroundStyles = {},
    ...configOptions
  } = props;

  const { backgroundSize = "cover", backgroundPosition = "50% 50%" } =
    backgroundStyles;

  const start = performance.now();
  const { uuid, images } = await getImage(
    src,
    sizes,
    format,
    breakpoints,
    placeholder,
    artDirectives,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    configOptions,
    globalConfigOptions
  );
  const end = performance.now();

  console.log(`Image at ${src} optimized in ${end - start}ms`);

  const className = `astro-imagetools-background-${uuid}`;

  const { imagesizes } = images.at(-1);

  const fallbackStyles = getBackgroundFallbackStyles(
    images,
    className,
    backgroundSize,
    backgroundPosition,
    fadeInTransition
  );

  const link = getLink(images, preload, imagesizes);

  const styles =
    `
      .${className} {
        position: relative;
      }
    ` +
    images
      .map(({ media, sources }) => {
        const newSources = {};

        sources.forEach(({ src, format, srcset }) => {
          const sources = srcset
            .split(", ")
            .map((source) => [
              source.slice(0, source.lastIndexOf(" ")),
              source.slice(source.lastIndexOf(" ") + 1, -1),
            ]);

          sources.forEach(([path, width]) => {
            if (!newSources[width]) {
              newSources[width] = [];
            }

            newSources[width].push({ src, format, path });
          });
        });

        const widths = Object.keys(newSources)
          .map((width) => parseInt(width))
          .reverse();

        const maxWidth = Math.max(...widths);

        const styles = widths
          .map((width) => {
            const sources = newSources[width];

            const styles = sources
              .map(
                ({ format, path }) => `
                  .${format} .${className} {
                    background-repeat: no-repeat;
                    background-image: url(${path});
                    background-size: ${backgroundSize};
                    background-position: ${backgroundPosition};
                  }
                `
              )
              .reverse()
              .join("");

            return width === maxWidth
              ? styles
              : `
                  @media screen and (max-width: ${width}px) {
                    ${styles}
                  }
                `;
          })
          .join("");

        return media
          ? `
              @media ${media} {
                ${styles}
              }
            `
          : styles;
      })
      .join("");

  const style = `<style>${fallbackStyles + styles}</style>`;

  const htmlElement = `<${tag} class="${className}">${content}</${tag}>`;

  return { link, style, htmlElement };
}
