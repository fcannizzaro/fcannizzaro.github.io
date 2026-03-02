import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { entrySlug } from "../../lib/utils";

const allBlog = await getCollection("blog");
const blogEntries = import.meta.env.PROD ? allBlog.filter((p) => !p.data.draft) : allBlog;
const projectEntries = await getCollection("projects");

const pages = Object.fromEntries([
  ...blogEntries.map((it) => [
    `blog/${it.id}`,
    { title: it.data.title, description: it.data.description },
  ]),
  ...projectEntries.map((it) => [
    `projects/${entrySlug(it.id)}`,
    { title: it.data.name, description: it.data.description },
  ]),
]);

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages: pages,
  getImageOptions: (_, page: { title: string; description: string }) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: "./src/assets/og.png",
      size: [224, 224],
    },
    bgGradient: [
      [33, 33, 33],
      [14, 14, 14],
    ],
    bgImage: {
      path: "./src/assets/og-bg.png",
      fit: "cover",
    },
    fonts: [
      "./node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
    ],
    font: {
      title: {
        families: ["JetBrains Mono"],
      },
      description: {
        families: ["JetBrains Mono"],
        size: 24,
        color: [117.97, 117.97, 117.97],
      },
    },
  }),
});
