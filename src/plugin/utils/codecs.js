// @ts-check
import * as codecs from "@astropub/codecs";
import { readFileSync } from "fs";

const resizedImages = new Map();

export const getLoadedImage = async (src, ext) => {
  const buffer = readFileSync(src);

  const image = await codecs[ext].decode(buffer);

  const { width } = image;

  const resizedImageKey = `${src}@${image.width}`;

  resizedImages.set(resizedImageKey, image);

  return { image, width };
};

export const getTransformedImage = async (
  src,
  image,
  config,
  type,
  dataUri
) => {
  const { width, format, quality } = config;

  const resizedImageKey = `${src}@${width}`;

  const resizedImage =
    resizedImages.get(resizedImageKey) ||
    resizedImages
      .set(resizedImageKey, await image.resize({ width }))
      .get(resizedImageKey);

  const encodedImage = quality
    ? await codecs[format].encode(resizedImage, {
        quality: parseInt(quality),
      })
    : await resizedImage.encode(type);

  const buffer = Buffer.from(encodedImage.data);

  if (dataUri) {
    return { dataUri: `data:${type};base64,${buffer.toString("base64")}` };
  }

  return { buffer };
};
