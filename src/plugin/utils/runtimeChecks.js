// @ts-check
import findCacheDir from "find-cache-dir";

// FS Cache related checks
export const fsCachePath = findCacheDir({
  name: "astro-imagetools/",
  create: true,
});

// Sharp related checks
const sharp = await (async () => {
  try {
    if (await import("sharp")) {
      return true;
    }
  } catch (error) {
    return false;
  }
})();

export const supportedImageTypes = [
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
