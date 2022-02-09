// @ts-check

import crypto from "crypto";
import getArtDirectedImages from "./getArtDirectedImages";
import getImageSources from "./getImageSources";
import getProcessedImage from "./getProcessedImage";

const imagesData = new Map();

export default async function (
  src,
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
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(arguments))
    .digest("hex");

  if (imagesData.has(hash)) {
    return imagesData.get(hash);
  }

  const { path, rest, image, imageWidth, imageHeight, imageFormat } =
    await getProcessedImage(src, configOptions, globalConfigOptions);

  src = path;

  // @ts-ignore
  rest.aspect = `${imageWidth / imageHeight}`;
  fallbackFormat ||= imageFormat;

  const [mainImage, artDirectedImages] = await Promise.all([
    getImageSources(
      src,
      image,
      format,
      imageWidth,
      breakpoints,
      placeholder,
      imageFormat,
      fallbackFormat,
      formatOptions,
      includeSourceFormat,
      rest
    ),
    getArtDirectedImages(
      artDirectives,
      placeholder,
      format,
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
