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

export const { getImageDetails } = await (sharp
  ? import("./imagetools.js")
  : import("./codecs.js"));
