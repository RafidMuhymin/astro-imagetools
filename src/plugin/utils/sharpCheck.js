export const sharp = await (async () => {
  try {
    if (await import("sharp")) {
      return true;
    }
  } catch (error) {
    return false;
  }
})();

// @ts-ignore
export const { getLoadedImage, getTransformedImage } = await import(
  `./${sharp ? "imagetools" : "codecs"}.mjs`
);

export const supportedFileTypes = [
  "avif",
  "jpeg",
  "jpg",
  "png",
  "webp",
  ...(sharp ? ["heic", "heif", "tiff", "gif"] : ["jxl", "wp2"]),
];
