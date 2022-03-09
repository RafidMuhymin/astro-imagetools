// @ts-check
import fs from "fs";
import path from "path";
import stream from "stream";
import objectHash from "object-hash";
import { getConfigOptions, getImagePath } from "./utils/shared.js";
import {
  fsCachePath,
  getLoadedImage,
  getTransformedImage,
  supportedImageTypes,
} from "./utils/runtimeChecks.js";

let viteConfig;
const bundled = [];
const store = new Map();

let projectBase, outDir, assetsDir, assetFileNames;

export default {
  name: "vite-plugin-astro-imagetools",
  enforce: "pre",
  config: () => ({
    optimizeDeps: {
      exclude: ["@astropub/codecs", "imagetools-core", "sharp"],
    },
    ssr: {
      external: ["sharp", "potrace", "object-hash", "@astropub/codecs"],
    },
  }),

  configResolved(config) {
    viteConfig = config;

    ({ base: projectBase } = viteConfig);

    ({ outDir, assetsDir } = viteConfig.build);

    assetFileNames =
      viteConfig.build.rollupOptions.output?.assetFileNames ||
      `/${assetsDir}/[name].[hash][extname]`;
  },

  async load(id) {
    if (this.load) {
      global.vitePluginContext = {
        load: this.load,
      };
    }

    try {
      var fileURL = new URL(`file://${id}`);
    } catch (error) {
      return null;
    }

    const { search, searchParams } = fileURL;

    const src = id.replace(search, "");

    const ext = path.extname(src).slice(1);

    if (supportedImageTypes.includes(ext)) {
      const base = path.basename(src, path.extname(src));

      const config = Object.fromEntries(searchParams);

      const { image: loadedImage, width: imageWidth } =
        store.get(src) ||
        store.set(src, await getLoadedImage(src, ext)).get(src);

      const { type, widths, options, extension, inline } = getConfigOptions(
        config,
        ext,
        imageWidth
      );

      if (inline) {
        if (widths.length > 1) {
          throw new Error(
            `Cannot use base64 or raw or inline with multiple widths`
          );
        }

        const [width] = widths;

        const config = { width, ...options };

        if (store.has(id)) {
          return `export default "${store.get(id)}"`;
        } else {
          const params = [src, loadedImage, config, type];

          const { image, buffer } = await getTransformedImage(...params);

          const dataUri = `data:${type};base64,${(
            buffer || (await image.clone().toBuffer())
          ).toString("base64")}`;

          store.set(id, dataUri);

          return `export default "${dataUri}"`;
        }
      } else {
        const sources = await Promise.all(
          widths.map(async (width) => {
            const config = { width, ...options };

            const hash = objectHash(config).slice(0, 8);

            const { name, path } = getImagePath(
              base,
              { projectBase, assetsDir },
              extension,
              width,
              hash
            );

            if (!store.has(path)) {
              const params = [src, loadedImage, config, type];

              const { image, buffer } = await getTransformedImage(...params);

              const imageObject = { type, name, buffer, extension, image };

              store.set(path, imageObject);
            }

            return { width, path };
          })
        );

        const path =
          sources.length > 1
            ? sources.map(({ width, path }) => `${path} ${width}w`).join(", ")
            : sources[0].path;

        return `export default "${path}"`;
      }
    }
  },

  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const imageObject = store.get(request.url);

      if (imageObject) {
        const { type, buffer, image } = imageObject;

        response.setHeader("Content-Type", type);
        response.setHeader("Cache-Control", "no-cache");

        if (buffer) {
          return stream.Readable.from(buffer).pipe(response);
        }

        return image.clone().pipe(response);
      }

      next();
    });
  },

  async closeBundle() {
    if (viteConfig.mode === "production") {
      const assetNames = Object.keys(Object.fromEntries(store)).filter(
        (item) => item.startsWith("/assets/") && !bundled.includes(item)
      );

      const assetsDirPath = `${outDir}${assetsDir}`;

      fs.existsSync(assetsDirPath) ||
        fs.mkdirSync(assetsDirPath, { recursive: true });

      await Promise.all(
        assetNames.map(async (assetName) => {
          const { buffer, image, extension: ext } = store.get(assetName);

          const extname = `.${ext}`;

          const base = path.basename(assetName, extname);

          const name = base.slice(0, base.lastIndexOf("."));

          const hash = base.slice(base.lastIndexOf(".") + 1);

          const assetFileName = assetFileNames
            .replace("[name]", name)
            .replace("[hash]", hash)
            .replace("[ext]", ext)
            .replace("[extname]", extname);

          const cacheFilePath = fsCachePath + base + extname;

          const assetFilePath = `${outDir}${assetFileName}`;

          await fs.promises
            .copyFile(cacheFilePath, assetFilePath)
            .catch(async (error) => {
              if (error.code === "ENOENT") {
                const imageBuffer = buffer || (await image.toBuffer());

                await Promise.all(
                  [cacheFilePath, assetFilePath].map(async (dir) => {
                    await fs.promises.writeFile(dir, imageBuffer);
                  })
                );
              } else {
                throw error;
              }
            });

          bundled.push(assetName);
        })
      );
    }
  },
};
