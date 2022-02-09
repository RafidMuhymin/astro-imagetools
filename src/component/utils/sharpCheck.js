export const sharp = await (async () => {
  try {
    if (await import("sharp")) {
      return true;
    }
  } catch (error) {
    return false;
  }
})();

export const { getImageDetails } = await import(
  `./${sharp ? "imagetools" : "codecs"}.js`
);
