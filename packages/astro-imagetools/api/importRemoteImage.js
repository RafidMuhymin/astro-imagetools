import load from "../plugin/hooks/load.js";
import getResolvedSrc from "./utils/getResolvedSrc.js";

export default async function importRemoteImage(url) {
  const { search, protocol, pathname } = new URL(url);

  const id = await getResolvedSrc(
    protocol === "data:" ? protocol + pathname : url
  );

  const src = (await load(id + search)).slice(16, -1);

  return src;
}
