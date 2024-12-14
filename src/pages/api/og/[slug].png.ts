import { getOgImage } from "@/lib/OgImage";
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export async function getStaticPaths() {
  const newsPosts = await getCollection("news");

  return newsPosts.map((post) => ({
    params: {
      slug: post.id
    }
  }));
}

export const GET: APIRoute = async (ctx) => {
  const slug = ctx.params.slug;

  // slugがない
  if (!slug) {
    return new Response(null, { status: 404 });
  }

  const newsPost = await getEntry("news", slug);

  // 該当記事がない
  if (!newsPost) {
    return new Response(null, { status: 404 });
  }

  const ogImage = await getOgImage({
    baseUrl: ctx.url.origin,
    title: newsPost.data.title,
    emoji: newsPost.data.emoji
  });

  return new Response(ogImage, {
    headers: {
      "Content-Type": "image/png"
    }
  });
};
