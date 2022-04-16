// @ts-check
import getImg from "../utils/getImg.js";
import getLink from "../utils/getLink.js";
import getImage from "../utils/getImage.js";
import getBackgroundStyles from "../utils/getBackgroundStyles.js";
import getLayoutStyles from "../utils/getLayoutStyles.js";
import getFilteredProps from "../utils/getFilteredProps.js";

export default async function renderPicture(props) {
  const type = "Picture";

  const { filteredProps, transformConfigs } = getFilteredProps(type, props);

  const {
    src,
    alt,
    sizes,
    preload,
    loading,
    decoding,
    layout,
    placeholder,
    breakpoints,
    objectFit,
    objectPosition,
    format,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    fadeInTransition,
    artDirectives,
  } = filteredProps;

  const { uuid, images } = await getImage({
    src,
    type,
    sizes,
    format,
    breakpoints,
    placeholder,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    artDirectives,
    transformConfigs,
  });

  const className = `astro-imagetools-picture-${uuid}`;

  const { imagesizes } = images.at(-1);

  const style = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
    fadeInTransition
  );

  const link = getLink(images, preload, imagesizes);

  const layoutStyles = getLayoutStyles({ layout });

  const sources = images.flatMap(({ media, sources, sizes, imagesizes }) =>
    sources.map(({ format, src, srcset }) =>
      src
        ? getImg(
            src,
            alt,
            sizes,
            style,
            srcset,
            loading,
            decoding,
            imagesizes,
            fadeInTransition,
            layoutStyles
          )
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

  const picture = `<picture
    class="astro-imagetools-picture ${style ? className : ""}"
    style="position: relative; display: inline-block;${layoutStyles}"
    >${sources.join("\n")}
  </picture>`;

  return { link, style, picture };
}
