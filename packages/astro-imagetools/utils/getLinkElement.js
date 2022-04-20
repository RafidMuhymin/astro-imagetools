// @ts-check

export default function getLinkElement(images, preload, imagesizes) {
  const imagesrcset =
    preload &&
    images.at(-1).sources.find(({ format: fmt }) => fmt === preload)?.srcset;

  const link = preload
    ? `<link
        as="image"
        rel="preload"
        imagesizes="${imagesizes}"
        imagesrcset="${imagesrcset}"
      />`
    : "";

  return link;
}
