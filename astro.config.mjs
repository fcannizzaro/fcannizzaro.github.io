// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://fcannizzaro.com",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/drafts/"),
      changefreq: "daily",
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
  },
});
