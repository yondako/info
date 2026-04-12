import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const newsSchema = z.object({
  isDraft: z.boolean().default(false),
  title: z.string(),
  emoji: z.string(),
  tags: z.array(z.string()),
  publishedAt: z.date()
});

export type News = z.infer<typeof newsSchema>;

export const docsSchema = z.object({
  title: z.string(),
  updatedAt: z.date()
});

export type Docs = z.infer<typeof docsSchema>;

const news = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/data/news"
  }),
  schema: newsSchema
});

const docs = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/data/docs"
  }),
  schema: docsSchema
});

export const collections = {
  news,
  docs
};
