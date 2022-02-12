// @ts-check
import crypto from "crypto";

export function getConfigOptions(config, ext, imageWidth) {
  const { w, width = w, format = ext, base64, raw, inline, ...rest } = config;

  const imageFormat = format === "jpeg" ? "jpg" : format;

  const widths = width
    ? width.split(";").map((w) => parseInt(w))
    : [imageWidth];

  const extension = format === "jpg" ? "jpeg" : format;
  const type = `image/${extension}`;

  const options = {
    format: imageFormat,
    ...rest,
  };

  const hash = crypto
    .createHash("md5")
    .update(JSON.stringify(options))
    .digest("hex")
    .substring(0, 8);

  return {
    type,
    hash,
    widths,
    options,
    extension,
    inline:
      typeof base64 === "string" ||
      typeof raw === "string" ||
      typeof inline === "string",
  };
}

export function getImagePath(base, projectBase, extension, width, hash) {
  const name = `${base}@${width}w.${extension}`;

  const assetName = `${base}@${width}w.${hash}.${extension}`;

  const path = `${projectBase}assets/${assetName}`;

  return { name, assetName, path };
}
