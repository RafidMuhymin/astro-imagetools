import { GlobalConfigOptions } from "../utils/runtimeChecks.js";
import { default as importRemoteImage } from "./importRemoteImage.js";

const { globalImportRemoteImage } = GlobalConfigOptions;

if (globalImportRemoteImage) {
  global.importRemoteImage = importRemoteImage;
}

export { importRemoteImage };

export { default as renderImg } from "./renderImg.js";
export { default as renderPicture } from "./renderPicture.js";
export { default as renderBackgroundImage } from "./renderBackgroundImage.js";
export { default as renderBackgroundPicture } from "./renderBackgroundPicture.js";
