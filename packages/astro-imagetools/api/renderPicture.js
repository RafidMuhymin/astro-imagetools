// @ts-check
import getImage from "./utils/getImage.js";
import getImgElement from "./utils/getImgElement.js";
import getLinkElement from "./utils/getLinkElement.js";
import getStyleElement from "./utils/getStyleElement.js";
import getLayoutStyles from "./utils/getLayoutStyles.js";
import getFilteredProps from "./utils/getFilteredProps.js";
import getPictureElement from "./utils/getPictureElement.js";
import getBackgroundStyles from "./utils/getBackgroundStyles.js";

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
    attributes,
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

  const {
    img: imgAttributes = {},
    link: linkAttributes = {},
    style: styleAttributes = {},
    picture: pictureAttributes = {},
  } = attributes;

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

  const { imagesizes } = images[images.length - 1];

  const backgroundStyles = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
    fadeInTransition
  );

  const style = getStyleElement({ styleAttributes, backgroundStyles });

  const link = getLinkElement({ images, preload, imagesizes, linkAttributes });

  const layoutStyles = getLayoutStyles({ layout });

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
  });

  return { link, style, picture };
}
