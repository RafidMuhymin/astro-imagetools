// @ts-check

export default function getImg(
  src,
  alt,
  sizes,
  style,
  srcset,
  layout,
  loading,
  decoding,
  imagesizes,
  fadeInTransition,
  imgClassName
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
    class="${imgClassName || "astro-imagetools-img"}"
    style="display: inline-block; overflow: hidden;${
      layout === "fill"
        ? `width: 100%; height: 100%;`
        : layout === "fullWidth"
        ? `width: 100%; height: auto;`
        : "max-width: 100%; height: auto;"
    }"
    ${
      !imgClassName && style
        ? `onerror="parentElement.style.setProperty('--z-index', -1)"
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
