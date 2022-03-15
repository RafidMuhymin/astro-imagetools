// @ts-check
import path from "path";
import stream from "stream";
import objectHash from "object-hash";
import { getConfigOptions, getAssetPath } from "./utils/shared.js";
import { sharp, supportedImageTypes } from "../runtimeChecks.js";
import { saveAndCopyAsset, getCachedBuffer } from "./utils/cache.js";

const { getLoadedImage, getTransformedImage } = await (sharp
  ? import("./utils/imagetools.js")
  : import("./utils/codecs.js"));

let viteConfig;
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
      external: [
        "sharp",
        "potrace",
        "file-type",
        "object-hash",
        "find-cache-dir",
        "@astropub/codecs",
      ],
    },
  }),

  configResolved(config) {
    viteConfig = config;

    ({ base: projectBase } = viteConfig);

    ({ outDir, assetsDir } = viteConfig.build);

    assetFileNames =
      viteConfig.build.rollupOptions.output?.assetFileNames ||
      `/${assetsDir}/[name].[hash][extname]`;

    assetFileNames.startsWith(projectBase) ||
      (assetFileNames = projectBase + assetFileNames);
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

        const hash = objectHash([src, width, options]);

        if (store.has(hash)) {
          return `export default "${store.get(hash)}"`;
        } else {
          const config = { width, ...options };

          const params = [src, loadedImage, config, type];

          const { image, buffer } = await getTransformedImage(...params);

          const dataUri = `data:${type};base64,${(
            buffer || (await getCachedBuffer(hash, image))
          ).toString("base64")}`;

          store.set(hash, dataUri);

          return `export default "${dataUri}"`;
        }
      } else {
        const sources = await Promise.all(
          widths.map(async (width) => {
            const hash = objectHash([src, width, options]);

            const assetPath = getAssetPath(
              base,
              assetFileNames,
              extension,
              width,
              hash
            );

            if (!store.has(assetPath)) {
              const config = { width, ...options };

              const params = [src, loadedImage, config, type];

              const { image, buffer } = await getTransformedImage(...params);

              const imageObject = { hash, type, image, buffer };

              store.set(assetPath, imageObject);
            }

            return { width, assetPath };
          })
        );

        const srcset =
          sources.length > 1
            ? sources
                .map(({ width, assetPath }) => `${assetPath} ${width}w`)
                .join(", ")
            : sources[0].assetPath;

        return `export default "${srcset}"`;
      }
    }
  },

  async configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const imageObject = store.get(request.url);

      if (imageObject) {
        const { hash, type, image, buffer } = imageObject;

        response.setHeader("Content-Type", type);
        response.setHeader("Cache-Control", "no-cache");

        return stream.Readable.from(
          buffer || (await getCachedBuffer(hash, image))
        ).pipe(response);
      }

      next();
    });
  },

  async closeBundle() {
    if (viteConfig.mode === "production") {
      await Promise.all(
        [...store.entries()]
          .filter(([assetPath]) =>
            assetPath.startsWith(projectBase + assetsDir + "/")
          )
          .map(
            async ([assetPath, { hash, image, buffer }]) =>
              await saveAndCopyAsset(
                hash,
                image,
                buffer,
                outDir,
                assetsDir,
                assetPath
              )
          )
      );
    }
  },
};
