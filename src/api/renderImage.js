// @ts-check
import renderPicture from "./renderPicture";

export default async function renderImage(props) {
  const { picture, link, style } = await renderPicture(props);

  return { link, style, image: picture };
}
