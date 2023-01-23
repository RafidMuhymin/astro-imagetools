// @ts-check
import { fileURLToPath } from "node:url";
import { extname, relative, resolve } from "node:path";

import { getSrcPath } from "./getSrcPath.js";
import getResolvedSrc from "./getResolvedSrc.js";
import { cwd, sharp } from "../../utils/runtimeChecks.js";
import throwErrorIfUnsupported from "./throwErrorIfUnsupported.js";

const { getImageDetails } = await (sharp
  ? import("./imagetools.js")
  : import("./codecs.js"));

export default async function getProcessedImage(src, transformConfigs) {
  throwErrorIfUnsupported(src, extname(src).slice(1));

  let base;

  if (src.match("(http://|https://|data:image/).*")) {
    ({ src, base } = await getResolvedSrc(src));
  } else {
    const {
      default: { isSsrBuild },
    } = await import("../../astroViteConfigs.js");

    if (isSsrBuild) {
      const filename = fileURLToPath(import.meta.url);

      const assetPath = resolve(filename, "../../client") + src;

      src = "/" + relative(cwd, assetPath);
    }
  }

  const {
    w,
    h,
    ar,
    width = w,
    height = h,
    aspect = ar,
    ...rest
  } = transformConfigs;

  const path = src.replace(/\\/g, `/`);

  const { image, imageWidth, imageHeight, imageFormat } = await getImageDetails(
    await getSrcPath(src),
    width,
    height,
    aspect
  );

  return {
    path,
    base,
    rest,
    image,
    imageWidth,
    imageHeight,
    imageFormat,
  };
}
