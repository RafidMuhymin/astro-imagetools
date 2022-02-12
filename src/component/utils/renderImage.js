import getImage from "./getImage";
import astroConfig from "/astro.config.mjs";
import getBackgroundStyles from "./getBackgroundStyles";

/**
 * @typedef ImageHTMLData
 * @property {string} image The rendered HTML for the image
 * @property {string} link The preload link tag to be injected into the page head.
 * @property {string} style The css to be injected for this image.
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
export default async function renderImage({
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
}) {
  const start = performance.now();
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
    astroConfig.image
  );
  const end = performance.now();

  console.log(`Image at ${src} optimized in ${end - start}ms`);

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
    objectPosition
  );

  const style =
    bgStyles.length > 0 ? `<style>${bgStyles.join("\n\n")}</style>` : "";

  const link = preload
    ? `<link
        as="image"
        rel="preload"
        imagesizes="${imagesizes}"
        imagesrcset="${imagesrcset}"
      />`
    : "";

  const sources = images
    .map(({ media, sources, sizes }) =>
      sources.map(({ format, src, srcset }) =>
        src
          ? `<img
              src="${src}"
              alt="${alt}"
              srcset="${srcset}"
              class="${className}"
              sizes="${imagesizes}"
              width="${sizes.width}"
              height="${sizes.height}"
              onload="style.backgroundImage = 'none'"
              ${loading ? `loading="${loading}"` : ""}
              ${decoding ? `decoding="${decoding}"` : ""}
              ${
                style
                  ? `style="${
                      layout === "fill"
                        ? `width: 100%; height: 100%;`
                        : layout === "fullWidth"
                        ? `width: 100%; height: auto;`
                        : "max-width: 100%; height: auto;"
                    }"`
                  : ""
              }
            />`
          : `<source
              srcset="${srcset}"
              sizes="${imagesizes}"
              width="${sizes.width}"
              height="${sizes.height}"
              type="${`image/${format}`}"
              ${media ? `media="${media}"` : ""}
            />`
      )
    )
    .flat()
    .join("\n");

  const image = images.length > 1 ? `<picture>${sources}</picture>` : sources;

  return {
    link,
    style,
    image,
  };
}
