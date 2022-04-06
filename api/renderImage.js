// @ts-check
import renderPicture from "./renderPicture";

export default async function renderImage(props) {
  const { link, style, picture } = await renderPicture(props);

  return { link, style, image: picture };
}
