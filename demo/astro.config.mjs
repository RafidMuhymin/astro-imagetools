import { defineConfig } from "astro/config";
import astroImagePlugin from "astro-imagetools/plugin";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [astroImagePlugin],
  },
});
