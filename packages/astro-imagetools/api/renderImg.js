// @ts-check
import getImage from "./utils/getImage.js";
import getImgElement from "./utils/getImgElement.js";
import getLinkElement from "./utils/getLinkElement.js";
import getStyleElement from "./utils/getStyleElement.js";
import getLayoutStyles from "./utils/getLayoutStyles.js";
import getFilteredProps from "./utils/getFilteredProps.js";
import getBackgroundStyles from "./utils/getBackgroundStyles.js";

export default async function renderImg(props) {
  const type = "Img";

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
    breakpoints,
    placeholder,
    objectFit,
    objectPosition,
    format,
    formatOptions,
  } = filteredProps;

  const artDirectives = [],
    fallbackFormat = format,
    fadeInTransition = false,
    includeSourceFormat = false;

  const {
    img: imgAttributes = {},
    link: linkAttributes = {},
    style: styleAttributes = {},
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

  const className = `astro-imagetools-img-${uuid}`;

  const { imagesizes } = images[images.length - 1];

  const backgroundStyles = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
    fadeInTransition,
    { isImg: true }
  );

  const style = getStyleElement({ styleAttributes, backgroundStyles });

  const link = getLinkElement({ images, preload, imagesizes, linkAttributes });

  const layoutStyles = getLayoutStyles({ layout });

  const sources = images.flatMap(({ sources, sizes, imagesizes }) =>
    sources.map(({ src, srcset }) =>
      getImgElement({
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
        imgClassName: className,
      })
    )
  );

  const [img] = sources;

  return { link, style, img };
}
