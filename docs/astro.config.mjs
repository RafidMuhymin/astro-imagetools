import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";
import AutoImport from "unplugin-auto-import/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-imagetools-docs.vercel.app/",
  integrations: [preact(), react(), mdx()],
  vite: {
    plugins: [
      AutoImport({
        include: [/\.astro$/, /\.mdx$/],
        imports: [
          {
            "@astrojs/markdown-component": [["default", "Markdown"]],
            "/src/components/CodeExample.astro": [["default", "CodeExample"]],
          },
        ],
        dts: "./auto-imports.d.ts",
      }),
    ],
  },
});
