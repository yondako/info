import { formatDate } from "@/lib/date";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const allNews = await getCollection("news", ({ data }) => !data.isDraft);

  // 最近公開された順にソート
  allNews.sort((a, b) => {
    const dateA = a.data.publishedAt.getTime();
    const dateB = b.data.publishedAt.getTime();
    return dateB - dateA;
  });

  // 直近24件に絞る
  const recentNews = allNews.slice(0, 24).map(({ id, data }) => ({
    slug: id,
    title: data.title,
    emoji: data.emoji,
    tags: data.tags,
    publishedAt: formatDate(data.publishedAt)
  }));

  return new Response(JSON.stringify(recentNews));
};
