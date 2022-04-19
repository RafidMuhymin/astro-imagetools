// @ts-check
import path from "path";
import findCacheDir from "find-cache-dir";
import filterConfigs from "./utils/filterConfigs.js";

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

// prettier-ignore
export const supportedConfigs = [
  "src", "alt", "tag", "content", "sizes", "preload", "loading", "decoding", "layout",
  "placeholder", "breakpoints", "objectFit", "objectPosition", "backgroundSize",
  "backgroundPosition", "format", "fallbackFormat", "includeSourceFormat", "formatOptions",
  "fadeInTransition", "artDirectives", "flip", "flop", "invert", "flatten", "normalize",
  "grayscale", "hue", "saturation", "brightness", "w", "h", "ar", "width", "height", "aspect",
  "background", "tint", "blur", "median", "rotate", "quality", "fit", "kernel", "position",
];

// prettier-ignore
export const ImageToolsDirectives = [
  "flip", "flop", "invert", "flatten", "normalize",  "grayscale", "hue", "saturation",
  "brightness", "w", "h", "ar", "width", "height", "aspect", "background", "tint", "blur",
  "median", "rotate", "quality", "fit", "kernel", "position"
]

const posixPath = process.cwd() + "/astro-imagetools.config";

const win32Path =
  "file://" +
  process.cwd().replace(":\\", ":\\\\") +
  path.sep +
  "astro-imagetools.config";

const configPath = process.platform !== "win32" ? posixPath : win32Path;

// Resolve Astro ImageTools Config
const { default: rawGlobalConfigOptions } = await (async () =>
  await import(configPath + ".js").catch(() =>
    import(configPath + ".mjs").catch(() => ({}))
  ))();

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
