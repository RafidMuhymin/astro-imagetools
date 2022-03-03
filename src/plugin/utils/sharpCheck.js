// @ts-check

export const sharp = await (async () => {
  try {
    if (await import("sharp")) {
      return true;
    }
  } catch (error) {
    return false;
  }
})();

export const supportedFileTypes = [
  "avif",
  "jpeg",
  "jpg",
  "png",
  "webp",
  ...(sharp ? ["heic", "heif", "tiff", "gif"] : ["jxl", "wp2"]),
];

export const { getLoadedImage, getTransformedImage } = await (sharp
  ? import("./imagetools.js")
  : import("./codecs.js"));
