import react from "@astrojs/react";
import preact from "@astrojs/preact";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import solid from "@astrojs/solid-js";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";
import astroImagePlugin from "astro-imagetools/plugin";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [astroImagePlugin]
  },
  integrations: [react(), preact(), svelte(), vue(), solid(), lit()]
});