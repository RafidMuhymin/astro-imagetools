import load from "../plugin/hooks/load.js";
import getResolvedSrc from "./utils/getResolvedSrc.js";

export default async function importRemoteImage(url) {
  const id = await getResolvedSrc(url);

  const src = (await load(id)).slice(16, -1);

  return src;
}
