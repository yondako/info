import { defineCollection, z } from "astro:content";

export const newsSchema = z.object({
  isDraft: z.boolean().default(false),
  title: z.string(),
  emoji: z.string(),
  publishDate: z.string()
});

const newsCollenction = defineCollection({
  type: "content",
  schema: newsSchema
});

export const collenctions = {
  news: newsCollenction
};
