// @ts-check

import getAttributesString from "./getAttributes";

export default function getImgElement({
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
  imgClassName = "",
}) {
  const {
    class: customClasses = "",
    style: customInlineStyles = "",
    onload: customOnload = "",
    ...restImgAttributes
  } = imgAttributes;

  const attributesString = getAttributesString(restImgAttributes, [
    "src",
    "alt",
    "srcset",
    "sizes",
    "width",
    "height",
    "loading",
    "decoding",
  ]);

  const classAttribute = ["astro-imagetools-img", imgClassName, customClasses]
    .join(" ")
    .trim();

  const styleAttribute = [
    "display: inline-block; overflow: hidden;",
    customInlineStyles,
    layoutStyles,
  ]
    .join(" ")
    .trim();

  const onloadAttribute = [
    !imgClassName && style
      ? `onload="${
          fadeInTransition
            ? `parentElement.style.setProperty('--z-index', 1);parentElement.style.setProperty('--opacity', 0);`
            : ""
        }"
          `
      : "",
    customOnload,
  ]
    .join(" ")
    .trim();

  const imgElement = `<img
    ${attributesString}
    src="${src}"
    ${alt ? `alt="${alt}"` : ""}
    srcset="${srcset}"
    sizes="${imagesizes}"
    width="${sizes.width}"
    height="${sizes.height}"
    ${loading ? `loading="${loading}"` : ""}
    ${decoding ? `decoding="${decoding}"` : ""}
    class="${classAttribute}"
    style="${styleAttribute}"
    onload=${onloadAttribute}
  />`;

  return imgElement;
}
