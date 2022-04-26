import { defineConfig } from "astro/config";
import astroImageToolsIntegration from "astro-imagetools/integration";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      {
        name: "import.meta.url-transformer",
        transform: (code, id) => {
          if (id.endsWith(".astro"))
            return code.replace(/import.meta.url/g, `"${id}"`);
        },
      },
    ],
  },
  experimental: {
    integrations: true,
  },
  integrations: [astroImageToolsIntegration],
  base: "./",
});
