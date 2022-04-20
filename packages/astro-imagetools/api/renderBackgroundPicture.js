// @ts-check
import getImg from "../utils/getImg.js";
import getLinkElement from "../utils/getLinkElement.js";
import getImage from "../utils/getImage.js";
import getLayoutStyles from "../utils/getLayoutStyles.js";
import getFilteredProps from "../utils/getFilteredProps.js";
import getBackgroundStyles from "../utils/getBackgroundStyles.js";

export default async function renderBackgroundPicture(props) {
  const type = "BackgroundPicture";

  const { filteredProps, transformConfigs } = getFilteredProps(type, props);

  const {
    src,
    tag,
    content,
    sizes,
    preload,
    loading,
    decoding,
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
    artDirectives,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    transformConfigs,
  });

  const className = `astro-imagetools-picture-${uuid}`;

  const { imagesizes } = images.at(-1);

  const style = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
    fadeInTransition,
    { isBackgroundPicture: true }
  );

  const link = getLinkElement(images, preload, imagesizes);

  const layoutStyles = getLayoutStyles({ isBackgroundImage: true });

  // Background Images shouldn't convey important information
  const alt = "";

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
    style="z-index: 0; position: absolute; width: 100%; height: 100%; display: inline-block;${layoutStyles}"
    >${sources.join("\n")}
  </picture>`;

  const htmlElement = `<${tag} class="astro-imagetools-background-picture" style="position: relative;">${
    picture + content
  }</${tag}>`;

  return { link, style, htmlElement };
}
