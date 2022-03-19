// @ts-check
import crypto from "crypto";
import objectHash from "object-hash";
import getImageSources from "./getImageSources.js";
import getProcessedImage from "./getProcessedImage.js";
import getArtDirectedImages from "./getArtDirectedImages.js";

const imagesData = new Map();

export default async function (
  src,
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
  const hash = objectHash(Array.from(arguments));

  if (imagesData.has(hash)) {
    return imagesData.get(hash);
  }

  const { path, rest, image, imageWidth, imageHeight, imageFormat } =
    await getProcessedImage(src, configOptions, globalConfigOptions);

  src = path;

  rest.aspect = `${imageWidth / imageHeight}`;
  //fallbackFormat ||= imageFormat; 
  // use if statement for node 14 compatibillity
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

  return returnObject;
}
