// @ts-check
import getImage from "./getImage.js";
// @ts-ignore
import astroConfig from "/astro.config";
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
    fadeInTransition = true,
    fallbackFormat,
    includeSourceFormat = true,
    style,
    imgStyle,
    className,
    imgClassName,
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

  const defaultClassName = `astro-imagetools-picture-${uuid}`;

  const imagesrcset =
    preload &&
    images.at(-1).sources.find(({ format: fmt }) => fmt === preload)?.srcset;

  const { imagesizes } = images.at(-1);

  const styling = getBackgroundStyles(
    images,
    defaultClassName,
    objectFit,
    objectPosition,
    imgStyle,
  );

  const link = preload
    ? `<link
        as="image"
        rel="preload"
        imagesizes="${imagesizes}"
        imagesrcset="${imagesrcset}"
      />`
    : "";

  const sources = images.flatMap(({ media, sources, sizes, imagesizes }) =>
    sources.map(({ format, src, srcset, imgClass }) =>
      src
        ? `<img
            src="${src}"
            alt="${alt}"
            srcset="${srcset}"
            sizes="${imagesizes}"
            width="${sizes.width}"
            height="${sizes.height}"
            class="astro-imagetools-img${imgClass ? ' ' + imgClass: ''}"
            ${loading ? `loading="${loading}"` : ""}
            ${decoding ? `decoding="${decoding}"` : ""}
            style="display: inline-block; overflow: hidden;${
              layout === "fill"
                ? `width: 100%; height: 100%;`
                : layout === "fullWidth"
                ? `width: 100%; height: auto;`
                : "max-width: 100%; height: auto;"
            }"
            ${
              styling
                ? `onerror="nextElementSibling.style.zIndex='-1'"
                  onload="${
                    fadeInTransition
                      ? `nextElementSibling.animate({opacity:[1,0]},${
                          typeof fadeInTransition === "number"
                            ? fadeInTransition
                            : fadeInTransition.duration &&
                              Object.keys(fadeInTransition).length === 1
                            ? fadeInTransition.duration
                            : typeof fadeInTransition === "object"
                            ? // @ts-ignore
                              JSON.stringify(fadeInTransition).replaceAll(
                                '"',
                                `'`
                              )
                            : 1000
                        }).onfinish=()=>{nextElementSibling.remove()}`
                      : "nextElementSibling.remove()"
                  }"
                  `
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

  const image = `<picture
    class="astro-imagetools-picture ${styling ? defaultClassName : ""}${className ? ' ' + className: ''}"
    ${style ? `style="position: relative; display: inline-block${style ? ' ' + style : ''}"` : ""}
    >${sources.join("\n")} ${styling ? "<span></span>" : ""}
  </picture>`;

  return { link, styling, image };
}
