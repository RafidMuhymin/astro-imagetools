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
  { imgClassName = "", layout = "constrained", isBackgroundImage = false }
) {
  return `<img
    src="${src}"
    alt="${alt}"
    srcset="${srcset}"
    sizes="${imagesizes}"
    width="${sizes.width}"
    height="${sizes.height}"
    ${loading ? `loading="${loading}"` : ""}
    ${decoding ? `decoding="${decoding}"` : ""}
    class="${imgClassName}"
    style="display: inline-block; overflow: hidden;${
      isBackgroundImage
        ? "width: 100%; height: 100%;"
        : layout === "fill"
        ? `width: 100%; height: 100%;`
        : layout === "fullWidth"
        ? `width: 100%; height: auto;`
        : layout === "constrained"
        ? "max-width: 100%; height: auto;"
        : ""
    }"
    ${
      !imgClassName && style
        ? `onerror="parentElement.style.setProperty('--z-index', ${
            isBackgroundImage ? "-2" : "-1"
          })"
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
