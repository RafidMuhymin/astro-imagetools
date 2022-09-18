// @ts-check
import fs from "node:fs";
import stream from "node:stream";
import { fileURLToPath } from "node:url";
import { posix as path, resolve } from "node:path";
import load from "./hooks/load.js";
import config from "./hooks/config.js";
import transform from "./hooks/transform.js";
import { middleware } from "../ssr/index.js";

if (!globalThis.astroImageToolsStore)
  globalThis.astroImageToolsStore = new Map();

export const store = globalThis.astroImageToolsStore;

const filename = fileURLToPath(import.meta.url);

const astroViteConfigsPath = resolve(filename, "../../astroViteConfigs.js");

const vitePluginAstroImageTools = {
  name: "vite-plugin-astro-imagetools",
  enforce: "pre",

  config,

  async configResolved(config) {
    const { mode } = config;

    const { outDir, assetsDir, sourcemap } = config.build;

    let assetFileNames = path.normalize(
      config.build.rollupOptions.output?.assetFileNames ||
        `/${assetsDir}/[name].[hash][extname]`
    );

    if (!assetFileNames.startsWith("/"))
      assetFileNames = path.join("/", assetFileNames);

    const astroViteConfigs = JSON.parse(
      (await fs.promises.readFile(astroViteConfigsPath, "utf8")).slice(15)
    );

    const newAstroViteConfigs = {
      ...astroViteConfigs,
      mode,
      outDir,
      assetsDir,
      sourcemap,
      assetFileNames,
    };

    await fs.promises.writeFile(
      astroViteConfigsPath,
      `export default ${JSON.stringify(newAstroViteConfigs, null, 2)}`
    );
  },

  load,

  transform,

  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const buffer = await middleware(request, response);

      if (buffer) {
        return stream.Readable.from(buffer).pipe(response);
      }

      next();
    });
  },
};

export default vitePluginAstroImageTools;
