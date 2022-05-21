// @ts-check
import fs from "node:fs";
import crypto from "node:crypto";
import { join, basename, extname, relative, resolve } from "node:path";
import {
  cwd,
  sharp,
  fsCachePath,
  supportedImageTypes,
} from "../../utils/runtimeChecks.js";
import { fileURLToPath } from "node:url";
import { getSrcPath } from "./getSrcPath.js";

const { getImageDetails } = await (sharp
  ? import("./imagetools.js")
  : import("./codecs.js"));

// @ts-ignore
const { fileTypeFromBuffer } = await import("file-type");

const throwErrorIfUnsupported = (src, ext) => {
  if (!ext && typeof ext !== "string") {
    throw new Error(`Failed to load ${src}; Invalid image format`);
  }

  if (ext && !supportedImageTypes.includes(ext.toLowerCase())) {
    throw new Error(
      `Failed to load ${src}; Invalid image format ${ext} or the format is not supported by astro-imagetools`
    );
  }
};

export default async (src, transformConfigs) => {
  throwErrorIfUnsupported(src, extname(src).slice(1));

  if (src.match("(http://|https://|data:image/).*")) {
    const filename = src.startsWith("data:") ? "" : basename(src);

    const hash = crypto.createHash("md5").update(src).digest("hex");

    let filepath = `${fsCachePath}${filename}.${hash}`;

    const fileExists = (() => {
      for (const type of supportedImageTypes) {
        const fileExists = fs.existsSync(filepath + `.${type}`);

        if (fileExists) {
          filepath += `.${type}`;

          return true;
        }
      }
    })();

    if (!fileExists) {
      const buffer = Buffer.from(await (await fetch(src)).arrayBuffer());

      const { ext } = (await fileTypeFromBuffer(buffer)) || {};

      throwErrorIfUnsupported(src, ext);

      filepath += `.${ext}`;

      fs.writeFileSync(filepath, buffer);
    }

    src = join("/", relative(cwd, filepath));
  } else {
    const { default: astroViteConfigs } = await import(
      "../../astroViteConfigs.js"
    );

    const { isSsrBuild } = astroViteConfigs;

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
    rest,
    image,
    imageWidth,
    imageHeight,
    imageFormat,
  };
};
