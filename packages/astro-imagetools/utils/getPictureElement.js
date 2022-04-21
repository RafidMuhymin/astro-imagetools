// @ts-check

import getAttributesString from "./getAttributes";

export default function getPictureElement({
  sources,
  className,
  layoutStyles,
  pictureAttributes,
  isBackgroundPicture = false,
}) {
  const {
    class: customClasses = "",
    style: customInlineStyles = "",
    ...restPictureAttributes
  } = pictureAttributes;

  const attributesString = getAttributesString(restPictureAttributes);

  const classAttribute = ["astro-imagetools-picture", className, customClasses]
    .join(" ")
    .trim();

  const styleAttribute = [
    isBackgroundPicture
      ? `position: absolute; z-index: 0; width: 100%; height: 100%; display: inline-block;`
      : `position: relative; display: inline-block;`,
    customInlineStyles,
    layoutStyles,
  ]
    .join(" ")
    .trim();

  const pictureElement = `<picture
    ${attributesString}
    class="${classAttribute}"
    style="${styleAttribute}"
    >${sources.join("\n")}
  </picture>`;

  return pictureElement;
}
