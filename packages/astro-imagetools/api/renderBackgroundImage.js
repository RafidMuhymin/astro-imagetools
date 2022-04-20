// @ts-check
import crypto from "crypto";
import getLink from "../utils/getLink.js";
import getImage from "../utils/getImage.js";
import getFilteredProps from "../utils/getFilteredProps.js";

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

  const link = getLink(images, preload, imagesizes);

  const backgroundImageStyles = images.map(({ media, sources }) => {
    const uuid = crypto.randomBytes(4).toString("hex").toUpperCase();

    const fallbackUrlCustomVariable = `--astro-imagetools-background-image-fallback-url${uuid}`;

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
                background-image: url(${path}), var(${fallbackUrlCustomVariable});
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

    return {
      fallbackUrlCustomVariable,
      styles: media
        ? `
              @media ${media} {
                ${styles}
              }
            `
        : styles,
    };
  });

  const containerStyles = `
    .${className} {
      position: relative;
      ${images
        .map(({ fallback }, i) => {
          const fallbackUrlCustomVariable =
            backgroundImageStyles[i].fallbackUrlCustomVariable;

          return `${fallbackUrlCustomVariable}: url("${encodeURI(fallback)}");`;
        })
        .join("\n")}
    }
  `;

  const style = `<style>${
    backgroundImageStyles.map(({ styles }) => styles).join("\n") +
    containerStyles
  }</style>`;

  const htmlElement = `<${tag} class="astro-imagetools-background-image ${className}">${content}</${tag}>`;

  return { link, style, htmlElement };
}
