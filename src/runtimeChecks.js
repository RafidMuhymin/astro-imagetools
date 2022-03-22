// @ts-check
import findCacheDir from "find-cache-dir";

// FS Cache related checks
export const fsCachePath = findCacheDir({
  name: "astro-imagetools/",
  create: true,
});

// Sharp related checks
export const sharp = await (async () => {
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
