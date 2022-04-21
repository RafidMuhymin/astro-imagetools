// @ts-check
import getAttributesString from "./getAttributes";

export default function getLinkElement({
  images = [],
  preload = "",
  imagesizes = "",
  linkAttributes,
}) {
  const imagesrcset =
    preload &&
    images.at(-1).sources.find(({ format: fmt }) => fmt === preload)?.srcset;

  const attributesString = getAttributesString(linkAttributes, [
    "as",
    "rel",
    "imagesizes",
    "imagesrcset",
  ]);

  const linkElement = preload
    ? `<link
        ${attributesString}
        as="image"
        rel="preload"
        imagesizes="${imagesizes}"
        imagesrcset="${imagesrcset}"
      />`
    : "";

  return linkElement;
}
