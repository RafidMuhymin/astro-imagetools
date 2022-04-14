// @ts-check
export default function getLayoutStyle({
  layout = null,
  isBackgroundImage = false,
}) {
  return isBackgroundImage
    ? "width: 100%; height: 100%;"
    : layout === "fill"
    ? `width: 100%; height: 100%;`
    : layout === "fullWidth"
    ? `width: 100%; height: auto;`
    : layout === "fixed"
    ? ""
    : "max-width: 100%; height: auto;";
}
