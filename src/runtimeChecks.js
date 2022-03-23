// @ts-check
import path from "path";
import findCacheDir from "find-cache-dir";

// CWD
export const cwd = process.cwd().split(path.sep).join(path.posix.sep);

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

// Resolve Astro ImageTools Config
// @ts-ignore
export const astroConfig = await import("/astro-imagetools.config").catch(() =>
  import(
    "file://" +
      process.cwd().replace(":\\", ":\\\\") +
      path.sep +
      "astro-imagetools.config.mjs"
  ).catch(() => ({}))
);
