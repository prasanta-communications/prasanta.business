import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../data/site";
import { getAuthor, getPublishedPosts, postUrl } from "../lib/posts";

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const items = await Promise.all(
    posts.map(async (post) => {
      const author = await getAuthor(post);
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: postUrl(post),
        categories: post.data.tags,
        customData: `<dc:creator>${escapeXml(author.data.name)}</dc:creator>`,
      };
    }),
  );

  return rss({
    title: `${site.name} — Blog`,
    description: site.description,
    site: context.site ?? site.url,
    trailingSlash: true,
    xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
    items,
    customData: "<language>en</language>",
  });
}
