import { defineCollection, z } from "astro:content";

export const newsSchema = z.object({
  isDraft: z.boolean().default(false),
  title: z.string(),
  emoji: z.string(),
  publishedAt: z.string()
});

export const docsSchema = z.object({
  title: z.string(),
  updatedAt: z.string()
});

const newsCollenction = defineCollection({
  type: "content",
  schema: newsSchema
});

const docsCollenction = defineCollection({
  type: "content",
  schema: docsSchema
});

export const collenctions = {
  news: newsCollenction,
  docs: docsCollenction
};
