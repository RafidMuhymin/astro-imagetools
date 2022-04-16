// @ts-check
import getLink from "../utils/getLink.js";
import getImage from "../utils/getImage.js";
import getFilteredProps from "../utils/getFilteredProps.js";
import getBackgroundFallbackStyles from "../utils/getBackgroundFallbackStyles.js";

export default async function renderBackgroundImage(props) {
  const type = "BackgroundImage";

  const { filteredProps, transformConfigs } = getFilteredProps(type, props);

  const {
    src,
    tag,
    content,
    preload,
    placeholder,
    breakpoints,
    backgroundSize,
    backgroundPosition,
    format,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    artDirectives,
  } = filteredProps;

  const sizes = "";

  const { uuid, images } = await getImage({
    src,
    type,
    sizes,
    format,
    breakpoints,
    placeholder,
    artDirectives,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    transformConfigs,
  });

  const className = `astro-imagetools-background-image-${uuid}`;

  const { imagesizes } = images.at(-1);

  const fallbackStyles = getBackgroundFallbackStyles(
    images,
    className,
    backgroundSize,
    backgroundPosition,
    true
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

  const htmlElement = `<${tag} class="astro-imagetools-background-image ${className}">${content}</${tag}>`;

  return { link, style, htmlElement };
}
