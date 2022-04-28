// @ts-check
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vitePluginAstroImageTools from "../plugin/index.js";

const filename = fileURLToPath(import.meta.url);

const astroViteConfigsPath = path.resolve(
  filename,
  "../../astroViteConfigs.json"
);

export default {
  name: "astro-imagetools",
  hooks: {
    "astro:config:setup": async function ({ config, command, updateConfig }) {
      const environment = command;

      let projectBase = path.normalize(config.base);

      if (projectBase.startsWith("./")) projectBase = projectBase.slice(1);

      if (!projectBase.startsWith("/")) projectBase = "/" + projectBase;

      if (projectBase.endsWith("/")) projectBase = projectBase.slice(0, -1);

      await fs.promises.writeFile(
        astroViteConfigsPath,
        JSON.stringify({
          environment,
          projectBase,
        })
      );

      updateConfig({
        vite: {
          plugins: [vitePluginAstroImageTools],
        },
      });
    },
  },
};
