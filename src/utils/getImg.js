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
  fadeInTransition
) {
  return `<img
    src="${src}"
    alt="${alt}"
    srcset="${srcset}"
    sizes="${imagesizes}"
    width="${sizes.width}"
    height="${sizes.height}"
    class="astro-imagetools-img"
    ${loading ? `loading="${loading}"` : ""}
    ${decoding ? `decoding="${decoding}"` : ""}
    style="display: inline-block; overflow: hidden;${
      layout === "fill"
        ? `width: 100%; height: 100%;`
        : layout === "fullWidth"
        ? `width: 100%; height: auto;`
        : "max-width: 100%; height: auto;"
    }"
    ${
      style
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
