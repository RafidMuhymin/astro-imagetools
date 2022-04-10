import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import AutoImport from "unplugin-auto-import/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), react()],
  vite: {
    plugins: [
      AutoImport({
        include: [/\.astro$/, /\.md$/],

        imports: [
          {
            "astro/components": ["Markdown"],
            "/src/components/CodeBlock.astro": [["default", "CodeBlock"]],
          },
        ],

        dts: "./auto-imports.d.ts",
      }),
    ],
  },
});
