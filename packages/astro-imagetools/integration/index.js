import vitePlugin from "../plugin/index.js";

export default {
  name: "astro-imagetools",
  hooks: {
    "astro:config:setup": function ({ config, command, updateConfig }) {
      updateConfig({
        vite: {
          plugins: [
            vitePlugin({
              config,
              command,
            }),
          ],
        },
      });
    },
  },
};
