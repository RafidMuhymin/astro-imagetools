// @ts-check
import getImg from "../utils/getImg.js";
import getLinkElement from "../utils/getLinkElement.js";
import getImage from "../utils/getImage.js";
import getLayoutStyles from "../utils/getLayoutStyles.js";
import getFilteredProps from "../utils/getFilteredProps.js";
import getBackgroundStyles from "../utils/getBackgroundStyles.js";

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

  const { imagesizes } = images.at(-1);

  const style = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
    fadeInTransition
  );

  const link = getLinkElement(images, preload, imagesizes);

  const layoutStyles = getLayoutStyles({ layout });

  const sources = images.flatMap(({ sources, sizes, imagesizes }) =>
    sources.map(({ src, srcset }) =>
      getImg(
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
        { imgClassName: className }
      )
    )
  );

  const [img] = sources;

  return { link, style, img };
}
