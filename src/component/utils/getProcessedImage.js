// @ts-check
import fs from "fs";
import crypto from "crypto";
import { join, extname, relative } from "path";
import { fileTypeFromBuffer } from "file-type";
import {
  sharp,
  fsCachePath,
  supportedImageTypes,
} from "../../runtimeChecks.js";

const throwErrorIfUnsupported = (src, ext) => {
  if (!ext && typeof ext !== "string") {
    throw new Error(`Failed to load ${src}; Invalid image format`);
  }

  if (ext && !supportedImageTypes.includes(ext)) {
    throw new Error(
      `Failed to load ${src}; Invalid image format ${ext} or the format is not supported by astro-imagetools`
    );
  }
};

const { getImageDetails } = await (sharp
  ? import("./imagetools.js")
  : import("./codecs.js"));

export default async (src, configOptions, globalConfigOptions) => {
  const { search, searchParams } = new URL(src, "file://");

  src = src.replace(search, "");

  throwErrorIfUnsupported(src, extname(src).slice(1));

  const paramOptions = Object.fromEntries(searchParams);

  if (src.match("(http://|https://|data:image/).*")) {
    const hash = crypto.createHash("md5").update(src).digest("hex");

    let filepath = fsCachePath + hash;

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

    src = join("/", relative(process.cwd(), filepath));
  }

  configOptions = { ...globalConfigOptions, ...paramOptions, ...configOptions };

  configOptions.aspect &&= `${configOptions.aspect}`;
  configOptions.ar &&= `${configOptions.ar}`;

  const {
    w,
    h,
    ar,
    width = w,
    height = h,
    aspect = ar,
    ...rest
  } = configOptions;

  const path = join(process.cwd() + src);

  const { image, imageWidth, imageHeight, imageFormat } = await getImageDetails(
    path,
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
