// @ts-check
import fs from "fs";
import { extname } from "path";
import * as codecs from "@astropub/codecs";

export async function getImageDetails(path, width, height, aspect) {
  const extension = extname(path).slice(1);

  // @ts-ignore
  const imageFormat = extension === "jpeg" ? "jpg" : extension;

  const buffer = fs.readFileSync(`.${path}`);
  const decodedImage = await codecs.jpg.decode(buffer);

  let { width: imageWidth = width, height: imageHeight = height } =
    decodedImage;

  if (!(width && height) && aspect) {
    if (width) {
      imageHeight = width / aspect;
    } else if (height) {
      imageWidth = height * aspect;
    } else {
      imageHeight = decodedImage.width / aspect;
    }
  }

  const image =
    imageWidth || imageHeight
      ? await decodedImage.resize({ width: imageWidth, height: imageHeight })
      : decodedImage;

  return {
    image,
    imageWidth,
    imageHeight,
    imageFormat,
  };
}
