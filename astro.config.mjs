// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import favicons from "astro-favicons";



// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://github.com/ARM508W",
  integrations: [mdx(), favicons(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: "github-dark-high-contrast",
    },
  },
});