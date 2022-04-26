// @ts-check
import getAttributesString from "./getAttributesString.js";

export default function getStyleElement({
  styleAttributes,
  backgroundStyles = "",
}) {
  const attributesString = getAttributesString({
    attributes: styleAttributes,
  });

  const styleElement = `<style ${attributesString}>${backgroundStyles}</style>`;

  return styleElement;
}
