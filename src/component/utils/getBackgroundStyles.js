// @ts-check

export default function getBackgroundStyles(
	images,
	className,
	objectFit,
	objectPosition,
	style
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
    background-position: ${object?.position || objectPosition}; ${
							style ? "\n" + style : ""
					  }
  }
}`
					: `.${className} {
  object-fit: ${objectFit};
  object-position: ${objectPosition};
  background-image: url('${encodeURI(fallback)}');
  background-size: ${objectFit};
  background-position: ${objectPosition};
  ${style}
}`
				: null
		)
		.filter(Boolean)
		.reverse();

	return bgStyles;
}
