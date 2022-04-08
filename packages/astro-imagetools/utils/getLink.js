// @ts-check

export default function getLink(preload, imagesizes, imagesrcset) {
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
