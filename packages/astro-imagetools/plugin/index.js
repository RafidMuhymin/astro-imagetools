// @ts-check
import path from "path";
import {
  config,
  load,
  transform,
  configureServer,
  closeBundle,
} from "./hooks/index.js";

export const store = new Map();

let viteConfig;

let environment, projectBase, outDir, assetsDir, assetFileNames, sourcemap;

export default function vitePlugin({ config, command }) {
  projectBase = path.normalize(config.base);

  environment = command;

  if (projectBase.startsWith("./")) projectBase = projectBase.slice(1);

  if (!projectBase.startsWith("/")) projectBase = "/" + projectBase;

  if (projectBase.endsWith("/")) projectBase = projectBase.slice(0, -1);

  return plugin;
}

const plugin = {
  name: "vite-plugin-astro-imagetools",
  enforce: "pre",

  config,

  configResolved(config) {
    viteConfig = config;

    ({ outDir, assetsDir, sourcemap } = viteConfig.build);

    assetFileNames = path.normalize(
      viteConfig.build.rollupOptions.output?.assetFileNames ||
        `/${assetsDir}/[name].[hash][extname]`
    );

    if (!assetFileNames.startsWith("/")) assetFileNames = "/" + assetFileNames;
  },

  async load(id) {
    if (this.load) {
      // @ts-ignore
      global.vitePluginContext = {
        load: this.load,
      };
    }

    return await load(id, {
      environment,
      projectBase,
      assetFileNames,
    });
  },

  async transform(code, id) {
    return await transform(code, id, {
      sourcemap,
    });
  },

  async configureServer(server) {
    return await configureServer(server);
  },

  async closeBundle() {
    return await closeBundle({
      outDir,
      assetsDir,
      viteConfig,
    });
  },
};
