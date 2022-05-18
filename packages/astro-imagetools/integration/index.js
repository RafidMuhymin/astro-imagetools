// @ts-check
import fs from "node:fs";
import { posix as path, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vitePluginAstroImageTools from "../plugin/index.js";

const filename = fileURLToPath(import.meta.url);

const astroViteConfigsPath = resolve(filename, "../../astroViteConfigs.js");

export default {
  name: "astro-imagetools",
  hooks: {
    "astro:config:setup": async function ({ config, command, updateConfig }) {
      const environment = command;

      const isSsrBuild = command === "build" && !!config.adapter;

      let projectBase = path.normalize(config.base);

      if (projectBase.startsWith("./")) projectBase = projectBase.slice(1);

      if (!projectBase.startsWith("/")) projectBase = "/" + projectBase;

      if (projectBase.endsWith("/")) projectBase = projectBase.slice(0, -1);

      const astroViteConfigs = {
        environment,
        isSsrBuild,
        projectBase,
        publicDir: fileURLToPath(config.publicDir.href),
        rootDir: fileURLToPath(config.root.href),
      };

      await fs.promises.writeFile(
        astroViteConfigsPath,
        `export default ${JSON.stringify(astroViteConfigs)}`
      );

      updateConfig({
        vite: {
          plugins: [vitePluginAstroImageTools],
        },
      });
    },
  },
};
