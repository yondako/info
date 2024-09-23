import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const allNews = await getCollection("news", ({ data }) => !data.isDraft);

  allNews.sort((a, b) => {
    const dateA = new Date(a.data.publishDate).getTime();
    const dateB = new Date(b.data.publishDate).getTime();
    return dateB - dateA;
  });

  const latestTimestamp = new Date(allNews[0].data.publishedAt).getTime();

  return new Response(
    JSON.stringify({
      timestamp: latestTimestamp
    })
  );
};
