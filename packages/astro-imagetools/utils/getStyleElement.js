// @ts-check
import getAttributesString from "./getAttributes";

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
