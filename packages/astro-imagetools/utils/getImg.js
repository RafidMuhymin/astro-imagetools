// @ts-check

export default function getImg(
  src,
  alt,
  sizes,
  style,
  srcset,
  loading,
  decoding,
  imagesizes,
  fadeInTransition,
  layoutStyle,
  { imgClassName = "", isBackgroundPicture = false } = {}
) {
  return `<img
    src="${src}"
    ${alt ? `alt="${alt}"` : ""}
    srcset="${srcset}"
    sizes="${imagesizes}"
    width="${sizes.width}"
    height="${sizes.height}"
    ${loading ? `loading="${loading}"` : ""}
    ${decoding ? `decoding="${decoding}"` : ""}
    class="${("astro-imagetools-img " + imgClassName).trim()}"
    style="display: inline-block; overflow: hidden;${layoutStyle}"
    ${
      !imgClassName && style
        ? `${
            !isBackgroundPicture
              ? `onerror="parentElement.style.setProperty('--z-index', -1)"`
              : ""
          }
          onload="${
            fadeInTransition
              ? `parentElement.style.setProperty('--opacity', 0)`
              : ""
          }"
          `
        : ""
    }
  />`;
}
