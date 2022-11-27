// @ts-check
import getImage from "./utils/getImage.js";
import getImgElement from "./utils/getImgElement.js";
import getLinkElement from "./utils/getLinkElement.js";
import getStyleElement from "./utils/getStyleElement.js";
import getLayoutStyles from "./utils/getLayoutStyles.js";
import getFilteredProps from "./utils/getFilteredProps.js";
import getPictureElement from "./utils/getPictureElement.js";
import getBackgroundStyles from "./utils/getBackgroundStyles.js";
import getContainerElement from "./utils/getContainerElement.js";

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
    attributes,
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

  const {
    img: imgAttributes = {},
    link: linkAttributes = {},
    style: styleAttributes = {},
    picture: pictureAttributes = {},
    container: containerAttributes = {},
  } = attributes;

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

  const className = `astro-imagetools-picture-${uuid}`,
    containerClassName = `astro-imagetools-background-picture-${uuid}`;

  const { imagesizes } = images[images.length - 1];

  const backgroundStyles = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
    fadeInTransition,
    { isBackgroundPicture: true, containerClassName }
  );

  const style = getStyleElement({ styleAttributes, backgroundStyles });

  const link = getLinkElement({ images, preload, imagesizes, linkAttributes });

  const layoutStyles = getLayoutStyles({ isBackgroundImage: true });

  // Background Images shouldn't convey important information
  const alt = "";

  const sources = images.flatMap(({ media, sources, sizes, imagesizes }) =>
    sources.map(({ format, src, srcset }) =>
      src
        ? getImgElement({
            src,
            alt,
            sizes,
            style,
            srcset,
            loading,
            decoding,
            imagesizes,
            fadeInTransition,
            layoutStyles,
            imgAttributes,
          })
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

  const picture = getPictureElement({
    sources,
    className,
    layoutStyles,
    pictureAttributes,
    isBackgroundPicture: true,
  });

  const htmlElement = getContainerElement({
    tag,
    content: picture + content,
    containerAttributes,
    isBackgroundPicture: true,
    containerClassName,
  });

  return { link, style, htmlElement };
}
