// @ts-check

export default function getAttributesString(attributes, excludeArray = []) {
  return Object.keys(attributes)
    .filter((key) => !excludeArray.includes(key))
    .map((key) => `${key}="${attributes[key]}"`)
    .join(" ");
}
