// @ts-check

export default function getBackgroundStyles(
  images,
  className,
  objectFit,
  objectPosition
) {
  const bgStyles = images
    .map(({ media, fallback, object }) =>
      fallback
        ? media
          ? `@media ${media} {
  .${className} {
    object-fit: ${object?.fit || objectFit};
    object-position: ${object?.position || objectPosition};
    background-image: url('${encodeURI(fallback)}');
    background-size: ${object?.fit || objectFit};
    background-position: ${object?.position || objectPosition};
  }
}`
          : `.${className} {
  object-fit: ${objectFit};
  object-position: ${objectPosition};
  background-image: url('${encodeURI(fallback)}');
  background-size: ${objectFit};
  background-position: ${objectPosition};
}`
        : null
    )
    .filter(Boolean)
    .reverse();

  return bgStyles;
}
