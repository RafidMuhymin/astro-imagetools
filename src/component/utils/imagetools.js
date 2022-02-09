// @ts-check

import {
  builtins,
  loadImage,
  applyTransforms,
  generateTransforms,
} from "imagetools-core";

export async function getImageDetails(path, width, height, aspect) {
  const { image, metadata } = await applyTransforms(
    generateTransforms({ width, height, aspect }, builtins).transforms,
    loadImage(`.${path}`)
  );

  const {
    width: imageWidth,
    height: imageHeight,
    format: imageFormat,
  } = metadata;

  return { image, imageWidth, imageHeight, imageFormat };
}
