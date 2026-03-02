import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // draft flag: excluded from production listings when true
      draft: z.boolean().default(false),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
    generateId: ({ entry }) => `proj::${entry.replace(/\.md$/, "")}`,
  }),
  schema: () =>
    z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().url(),
      repo: z.string(),
      language: z.string(),
      featured: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      order: z.number().default(0),
      status: z.enum(["alpha", "beta"]).optional(),
    }),
});

export const collections = { blog, projects };
