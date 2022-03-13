// @ts-check
import fs from "fs";
import crypto from "crypto";
import { sharp } from "../../runtimeChecks.js";

// @ts-ignore
const { getImageDetails } = await import(
  sharp ? "./imagetools.js" : "./codecs.js"
);

const isStaticBuild =
  // @ts-ignore
  import.meta.env.PROD && process.argv.includes("--experimental-static-build");

export default async (src, configOptions, globalConfigOptions) => {
  const { search, searchParams } = new URL(src, "file://");

  const paramOptions = Object.fromEntries(searchParams);

  src = src.replace(search, "");

  if (src.match("(http://|https://|data:image/).*")) {
    const hash = crypto.createHash("sha256").update(src).digest("hex");
    const directory = "node_modules/.cache";
    const filepath = `${directory}/${hash}.jpeg`;
    fs.existsSync(directory) || fs.mkdirSync(directory);
    fs.existsSync(filepath) ||
      fs.writeFileSync(
        filepath,
        Buffer.from(await (await fetch(src)).arrayBuffer())
      );
    src = `/${filepath}`;
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

  const path = `./${src}`;

  const { image, imageWidth, imageHeight, imageFormat } = await getImageDetails(
    path,
    width,
    height,
    aspect
  );

  return {
    path: isStaticBuild ? `.${src}` : src,
    rest,
    image,
    imageWidth,
    imageHeight,
    imageFormat,
  };
};
