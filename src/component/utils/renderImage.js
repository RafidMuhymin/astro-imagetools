import getImage from "./getImage";

/**
 * @typedef ImageHTMLData
 * @property {string} imageTag The rendered HTML for the image
 * @property {string} linkTag The preload link tag to be injected into the page head.
 * @property {string} css The css to be injected for this image.
 */

/**
 * Renders an image given properties.
 *
 * Exposes the same API as the <Image /> component,
 * but is able to be used in contexts where the astro component cannot,
 * such as rendering CMS content.
 *
 * @returns {Promise<ImageHTMLData>}
 */
export default async function renderImage(
  src,
  alt,
  preload,
  loading = preload ? "eager" : "lazy",
  decoding = "async",
  breakpoints,
  objectFit = "cover",
  objectPosition = "50% 50%",
  layout = "constrained",
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
  ...configOptions
) {
  const label = `Image at ${src} optimized in`;
  console.time(label);

  const { uuid, images } = await getImage(
    src,
    format,
    breakpoints,
    placeholder,
    artDirectives,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    configOptions,
    astroConfig.image,
  );
  console.timeEnd(label);

  const { width } = images.at(-1).sizes;

  const className = `astro-imagetools-${uuid}`;

  const imagesrcset =
    preload &&
    images.at(-1).sources.find(({ format: fmt }) => fmt === preload)?.srcset;

  const imagesizes = `(min-width: ${width}px) ${width}px, 100vw`;

  const bgStyles = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
  );

  const imageTag = (() => {
    const sources = images.map(({ media, sources, sizes }) =>
      sources.map(({ format, src, srcset }) => {
        console.log(sizes);
        const renderedSizes = Object.entries(sizes)
          .map((size) => size)
          .join("\n");
        return src
          ? `<img
class="${className}"
src="${src}"
alt="${alt}"
${renderedSizes}
srcset="${srcset}"
loading="${loading}"
sizes="${imagesizes}"
decoding="${decoding}"
onload="style.backgroundImage = 'none'"
style="${
              layout === "fill"
                ? `width: 100%; height: 100%;`
                : layout === "fullWidth"
                ? `width: 100%; height: auto;`
                : layout === "constrained"
                ? "max-width: 100%; height: auto;"
                : null
            }"
/>`
          : `<source
${renderedSizes}
media="${media}"
type="${`image/${format}`}"
srcset="${srcset}"
sizes="${imagesizes}"
/>`;
      }),
    );

    const renderedSources = sources.join("\n");

    return images.length > 1
      ? `<picture>${renderedSources}</picture>`
      : renderedSources;
  })();

  const linkTag = `<link
  rel="preload"
  as="image"
  imagesrcset="${imagesrcset}"
  imagesizes="${imagesizes}"
/>`;

  const css = bgStyles.join("\n\n");

  return {
    imageTag,
    linkTag,
    css,
  };
}
