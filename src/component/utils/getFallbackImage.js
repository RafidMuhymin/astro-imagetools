// @ts-check

import util from "util";
import potrace from "potrace";
import stringifyParams from "./stringifyParams";
import { sharp } from "./sharpCheck";

export default async function getFallbackImage(
  src,
  placeholder,
  image,
  format,
  formatOptions,
  rest
) {
  switch (placeholder) {
    case "blurred":
      const params = stringifyParams({ ...rest, ...formatOptions[format] });

      const { default: dataUri } = await import(
        `${src}?inline&format=${format}&w=20${params}`
      );

      return dataUri;
    case "tracedSVG":
      const { function: fn, options } = formatOptions.tracedSVG;

      const traceSVG = util.promisify(potrace[fn]);

      const imageBuffer = sharp
        ? await image.toBuffer()
        : Buffer.from(
            (await image.encode(`image/${format === "jpg" ? "jpeg" : format}`))
              .data
          );

      const tracedSVG = await traceSVG(imageBuffer, options);

      return `data:image/svg+xml;utf8,${tracedSVG}`;
    case "dominantColor":
      if (sharp) {
        var { r, g, b } = (await image.stats()).dominant;
      } else {
        var [r, g, b] = image.color;
      }

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" style="background: rgb(${r},${g},${b})"></svg>`;

      return `data:image/svg+xml;utf8,${svg}`;
    default:
      return null;
  }
}
