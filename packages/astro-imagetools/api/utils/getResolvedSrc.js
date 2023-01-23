// @ts-check
import fs from "node:fs";
import crypto from "node:crypto";
import { join, parse, relative } from "node:path";
import throwErrorIfUnsupported from "./throwErrorIfUnsupported.js";
import {
  cwd,
  fsCachePath,
  supportedImageTypes,
} from "../../utils/runtimeChecks.js";

const { fileTypeFromBuffer } = await import("file-type");

export default async function getResolvedSrc(src) {
  const token = crypto.createHash("md5").update(src).digest("hex");

  let filepath = fsCachePath + token;

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

  const base = /^https?:/.test(src)
    ? parse(new URL(src).pathname).name
    : undefined;

  src = join("/", relative(cwd, filepath));

  return { src, base };
}
