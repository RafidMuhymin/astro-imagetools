// @ts-check
import crypto from "crypto";
import objectHash from "object-hash";
import getImageSources from "./getImageSources.js";
import getProcessedImage from "./getProcessedImage.js";
import getArtDirectedImages from "./getArtDirectedImages.js";

const imagesData = new Map();

export default async function (
  src,
  type,
  imagesizes,
  format,
  breakpoints,
  placeholder,
  artDirectives,
  fallbackFormat,
  includeSourceFormat,
  formatOptions,
  configOptions,
  globalConfigOptions
) {
  const args = Array.from(arguments);

  const hash = objectHash(args);

  if (imagesData.has(hash)) return imagesData.get(hash);

  const start = performance.now();

  const { path, rest, image, imageWidth, imageHeight, imageFormat } =
    await getProcessedImage(src, configOptions, globalConfigOptions);

  src = path;

  rest.aspect = `${imageWidth / imageHeight}`;

  if (!fallbackFormat) {
    fallbackFormat = imageFormat;
  }

  const [mainImage, artDirectedImages] = await Promise.all([
    getImageSources(
      src,
      image,
      format,
      imageWidth,
      imagesizes,
      breakpoints,
      placeholder,
      imageFormat,
      formatOptions,
      fallbackFormat,
      includeSourceFormat,
      rest
    ),
    getArtDirectedImages(
      artDirectives,
      placeholder,
      format,
      imagesizes,
      breakpoints,
      fallbackFormat,
      includeSourceFormat,
      formatOptions,
      rest
    ),
  ]);

  const images = [...artDirectedImages, mainImage];

  const uuid = crypto.randomBytes(4).toString("hex").toUpperCase();

  const returnObject = {
    uuid,
    images,
  };

  imagesData.set(hash, returnObject);

  const end = performance.now();

  console.log(
    `Responsive Image sets generated for ${type} at ${args[0]} in ${
      end - start
    }ms`
  );

  return returnObject;
}
