// @ts-check
import { getSrcPath } from "./getSrcPath.js";

export default async function getSrcset(
  src,
  base,
  breakpoints,
  format,
  options
) {
  options = {
    format,
    w: breakpoints,
    ...options,
  };

  const keys = Object.keys(options);

  const params = keys.length
    ? keys
        .map((key) =>
          Array.isArray(options[key])
            ? `&${key}=${options[key].join(";")}`
            : `&${key}=${options[key]}`
        )
        .join("")
    : "";

  const id = `${src}?${params.slice(1)}`;

  const fullPath = await getSrcPath(id);

  const { default: load } = await import("../../plugin/hooks/load.js");

  // @ts-ignore
  const srcset = (await load(fullPath, base)).slice(16, -1);

  return srcset;
}
