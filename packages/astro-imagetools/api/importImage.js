import load from "../plugin/hooks/load.js";
import { getSrcPath } from "./utils/getSrcPath.js";
import getResolvedSrc from "./utils/getResolvedSrc.js";

export default async function importImage(path) {
  try {
    const { search, protocol, pathname } = new URL(path);

    const { src: id, base } = await getResolvedSrc(
      protocol === "data:" ? protocol + pathname : path
    );

    const src = (await load(id + search, base)).slice(16, -1);

    return src;
  } catch (error) {
    const id = await getSrcPath(path);

    const src = (await load(id)).slice(16, -1);

    return src;
  }
}
