import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const allNews = await getCollection("news", ({ data }) => !data.isDraft);

  // 最近公開された順にソート
  allNews.sort((a, b) => {
    const dateA = new Date(a.data.publishDate).getTime();
    const dateB = new Date(b.data.publishDate).getTime();
    return dateB - dateA;
  });

  // 直近24件に絞る
  const recentNews = allNews.slice(0, 24).map(({ slug, data }) => ({
    slug,
    title: data.title,
    emoji: data.emoji,
    tags: data.tags,
    publishedAt: data.publishedAt
  }));

  return new Response(JSON.stringify(recentNews));
};
