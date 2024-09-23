import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const allNews = await getCollection("news", ({ data }) => !data.isDraft);

  allNews.sort((a, b) => {
    const dateA = a.data.publishedAt.getTime();
    const dateB = b.data.publishedAt.getTime();
    return dateB - dateA;
  });

  const latestTimestamp = new Date(allNews[0].data.publishedAt).getTime();

  return new Response(
    JSON.stringify({
      timestamp: latestTimestamp
    })
  );
};
