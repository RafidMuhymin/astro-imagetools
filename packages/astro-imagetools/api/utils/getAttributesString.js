// @ts-check

import printWarning from "../../utils/printWarning.js";

export default function getAttributesString({
  attributes,
  element = "",
  excludeArray = [],
}) {
  const attributesString = Object.keys(attributes)
    .filter((key) => {
      if (excludeArray.includes(key)) {
        printWarning({
          key,
          element,
        });

        return false;
      }

      return true;
    })
    .map((key) => `${key}="${attributes[key]}"`)
    .join(" ");

  return attributesString;
}
