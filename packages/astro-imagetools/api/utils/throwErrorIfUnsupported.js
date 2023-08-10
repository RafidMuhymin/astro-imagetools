// @ts-check
import { supportedImageTypes } from "../../utils/runtimeChecks.js";

export default function throwErrorIfUnsupported(src, ext) {
  if (!ext && typeof ext !== "string") {
    throw new Error(`Failed to load ${src}; Invalid image format`);
  }

  if (ext && !supportedImageTypes.includes(ext.toLowerCase())) {
    throw new Error(
      `Failed to load ${src}; Invalid image format ${ext} or the format is not supported by astro-imagetools`
    );
  }
}
