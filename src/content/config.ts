import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const newsSchema = z.object({
  isDraft: z.boolean().default(false),
  title: z.string(),
  emoji: z.string(),
  tags: z.array(z.string()),
  publishedAt: z.date()
});

export const docsSchema = z.object({
  title: z.string(),
  updatedAt: z.date()
});

const news = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/data/news"
  }),
  schema: newsSchema
});

const docs = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/data/docs"
  }),
  schema: docsSchema
});

export const collections = {
  news,
  docs
};
