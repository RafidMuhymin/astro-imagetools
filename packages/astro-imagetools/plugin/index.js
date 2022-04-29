// @ts-check
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { middleware } from "../ssr/index.js";
import { config, load, transform, closeBundle } from "./hooks/index.js";

export const store = new Map();

const filename = fileURLToPath(import.meta.url);

const astroViteConfigsPath = path.resolve(
  filename,
  "../../astroViteConfigs.js"
);

export default {
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

    if (!assetFileNames.startsWith("/")) assetFileNames = "/" + assetFileNames;

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

  async load(id) {
    if (this.load) {
      // @ts-ignore
      global.vitePluginContext = {
        load: this.load,
      };
    }

    return await load(id);
  },

  async transform(code, id) {
    return await transform(code, id);
  },

  configureServer(server) {
    server.middlewares.use(middleware);
  },

  async closeBundle() {
    return await closeBundle();
  },
};
