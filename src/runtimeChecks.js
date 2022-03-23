// @ts-check
import fs from "fs";
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

const posixPath = process.cwd() + "/astro-imagetools.config";

const win32Path =
  "file://" +
  process.cwd().replace(":\\", ":\\\\") +
  path.sep +
  "astro-imagetools.config";

const configPath = process.platform !== "win32" ? posixPath : win32Path;

// Resolve Astro ImageTools Config
export const { default: globalConfigOptions } = await (async () =>
  await import(configPath + ".js").catch(() =>
    import(configPath + ".mjs").catch(() => ({}))
  ))();
