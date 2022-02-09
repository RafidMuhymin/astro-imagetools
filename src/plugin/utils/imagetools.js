// @ts-check
import {
  builtins,
  loadImage,
  applyTransforms,
  generateTransforms,
} from "imagetools-core";

export const getLoadedImage = async (src) => {
  const image = loadImage(src);

  const { width } = await image.metadata();

  return { image, width };
};

export const getTransformedImage = async (
  src,
  image,
  config,
  type,
  dataUri
) => {
  const { transforms } = generateTransforms(config, builtins);

  const { image: encodedImage } = await applyTransforms(
    transforms,
    image.clone()
  );

  if (dataUri) {
    return {
      dataUri: `data:${type};base64,${(
        await encodedImage.clone().toBuffer()
      ).toString("base64")}`,
    };
  }

  return encodedImage;
};
