// @ts-check
import path from "path";
import crypto from "crypto";
import stream from "stream";
import objectHash from "object-hash";
import MagicString from "magic-string";
import { sharp, supportedImageTypes } from "../runtimeChecks.js";
import { getConfigOptions, getAssetPath } from "./utils/shared.js";
import { saveAndCopyAsset, getCachedBuffer } from "./utils/cache.js";

const { getLoadedImage, getTransformedImage } = await (sharp
  ? import("./utils/imagetools.js")
  : import("./utils/codecs.js"));

// @ts-ignore
const cwd = process.cwd().split(path.sep).join(path.posix.sep);

let viteConfig;
const store = new Map();

let projectBase, outDir, assetsDir, assetFileNames, sourcemap;

const regexTestPattern =
  /<img\s+src\s*=(?:"|')([^("|')]*)(?:"|')\s*alt\s*=\s*(?:"|')([^("|')]*)(?:"|')[^>]*>/g;

const regexExecPattern =
  /(?<=(?:\$\$render`.*))<img\s+src\s*=(?:"|')([^("|')]*)(?:"|')\s*alt\s*=\s*(?:"|')([^("|')]*)(?:"|')[^>]*>(?=.*`)/gs;

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

    ({ outDir, assetsDir, sourcemap } = viteConfig.build);

    assetFileNames =
      viteConfig.build.rollupOptions.output?.assetFileNames ||
      `/${assetsDir}/[name].[hash][extname]`;

    assetFileNames.startsWith(projectBase) ||
      (assetFileNames = projectBase + assetFileNames);
  },

  async load(id) {
    if (this.load) {
      // @ts-ignore
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

    id = id.replace(search, "");

    const ext = path.extname(id).slice(1);

    if (supportedImageTypes.includes(ext)) {
      const src = id.startsWith(cwd) ? id : cwd + id;

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

  async transform(code, id) {
    if (id.endsWith(".md") && regexTestPattern.test(code)) {
      let matches;

      if ((matches = code.matchAll(regexExecPattern)) !== null) {
        const s = new MagicString(code);

        const uuid = crypto.randomBytes(4).toString("hex");

        const Image = "Image" + uuid;

        const renderComponent = "renderComponent" + uuid;

        s.append(
          `import ${Image} from "astro-imagetools";\nimport { renderComponent as ${renderComponent} } from "${
            cwd + "/node_modules/astro/dist/runtime/server/index.js"
          }"`
        );

        for (const match of matches) {
          const src = path.resolve(path.dirname(id), match[1]).replace(cwd, "");

          s.overwrite(
            match.index,
            match.index + match[0].length,
            `\${${renderComponent}($$result, "${Image}", ${Image}, { "src": "${src}", "alt": "${match[2]}" })}`
          );
        }

        return {
          code: s.toString(),
          map: sourcemap ? s.generateMap({ hires: true }) : null,
        };
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
