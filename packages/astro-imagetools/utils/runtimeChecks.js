// @ts-check
import fs from "fs";
import path from "path";
import findCacheDir from "find-cache-dir";
import filterConfigs from "./filterConfigs.js";

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

// prettier-ignore
export const supportedConfigs = [
  "src", "alt", "tag", "content", "sizes", "preload", "loading", "decoding", "attributes",
  "layout", "placeholder", "breakpoints", "objectFit", "objectPosition", "backgroundSize",
  "backgroundPosition", "format", "fallbackFormat", "includeSourceFormat", "formatOptions",
  "fadeInTransition", "artDirectives", "flip", "flop", "invert", "flatten", "normalize",
  "grayscale", "hue", "saturation", "brightness", "w", "h", "ar", "width", "height", "aspect",
  "background", "tint", "blur", "median", "rotate", "quality", "fit", "kernel", "position",
  "cacheDir"
];

const configFunction = Object.values(
  // @ts-ignore
  import.meta.glob("/astro-imagetools.config.(mjs|js)")
)[0];

const rawGlobalConfigOptions = configFunction
  ? (await configFunction()).default
  : {};

const NonGlobalConfigOptions = ["src", "alt", "content"];

const GlobalConfigs = supportedConfigs.filter(
  (key) => !NonGlobalConfigOptions.includes(key)
);

const GlobalConfigOptions = filterConfigs(
  "Global",
  rawGlobalConfigOptions,
  GlobalConfigs
);

export { GlobalConfigOptions };

// CWD
export const pwd = process.env.PWD.split(path.sep).join(path.posix.sep);

const { cacheDir } = GlobalConfigOptions;

// FS Cache related checks
const fsCachePath =
  (cacheDir
    ? pwd + cacheDir
    : findCacheDir({
        name: "astro-imagetools",
      })) + "/";

fs.existsSync(fsCachePath) || fs.mkdirSync(fsCachePath, { recursive: true });

export { fsCachePath };
