// @ts-check
import fs from "fs";
import findCacheDir from "find-cache-dir";

// Config related checks
const filepath = process.cwd() + "astro.config";

export const { astroImagetools: config } = fs.existsSync(`${filepath}.mjs`)
  ? // @ts-ignore
    (await import(`${filepath}.mjs`)).default
  : fs.existsSync(`${filepath}.js`)
  ? // @ts-ignore
    (await import(`${filepath}.js`)).default
  : { astroImagetools: {} };

// FS Cache related checks
const thunk = findCacheDir({
  name: "astro-imagetools",
  create: true,
  thunk: true,
});

export const fsCachePath = thunk();

const fsCacheStorePath = thunk("store.json");

fs.existsSync(fsCacheStorePath) ||
  // @ts-ignore
  (await fs.promises.writeFile(fsCacheStorePath, "{}"));

export const fsCacheIndex = JSON.parse(
  // @ts-ignore
  await fs.promises.readFile(fsCacheStorePath, "utf8")
);

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
