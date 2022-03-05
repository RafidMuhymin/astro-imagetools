// @ts-check

import getImage from "./getImage.js";
// @ts-ignore
import astroConfig from "/astro.config.mjs";
import getBackgroundStyles from "./getBackgroundStyles.js";

export default async function renderImage(props) {
  const {
    src,
    alt,
    sizes = (breakpoints) => {
      const maxWidth = breakpoints.at(-1);
      return `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`;
    },
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
  } = props;

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
    astroConfig.image
  );
  const end = performance.now();

  console.log(`Image at ${src} optimized in ${end - start}ms`);

  const className = `astro-imagetools-${uuid}`;

  const imagesrcset =
    preload &&
    images.at(-1).sources.find(({ format: fmt }) => fmt === preload)?.srcset;

  const { imagesizes } = images.at(-1);

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

  const sources = images.flatMap(({ media, sources, sizes, imagesizes }) =>
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
  );

  const image =
    sources.length > 1 ? `<picture>${sources.join("\n")}</picture>` : sources;

  return {
    link,
    style,
    image,
  };
}
