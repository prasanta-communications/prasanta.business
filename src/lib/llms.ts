import { site } from "../data/site";
import { products } from "../data/products";
import { team } from "../data/team";
import type { Author, Post } from "./posts";
import { getAuthor, postMarkdownUrl, postUrl, tagUrl } from "./posts";

const abs = (path: string) => new URL(path, site.url).href;

export interface PostWithAuthor {
  post: Post;
  author: Author;
}

export const withAuthors = (posts: Post[]): Promise<PostWithAuthor[]> =>
  Promise.all(posts.map(async (post) => ({ post, author: await getAuthor(post) })));

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export function companySection(): string {
  return [
    "## Company",
    "",
    site.about,
    "",
    `- Website: ${site.url}/`,
    `- Location: ${site.location}`,
    `- Email: ${site.email}`,
    `- Phone: ${site.phoneDisplay}`,
    `- LinkedIn: ${site.linkedin}`,
  ].join("\n");
}

export function productsSection(): string {
  return [
    "## Products",
    "",
    ...products.map((p) => `- [${p.name}](${p.url}) (${p.category}): ${p.summary}`),
  ].join("\n");
}

export function teamSection(): string {
  return [
    "## Team",
    "",
    ...team.map(
      (p) => `- ${p.name}, ${p.role}: ${p.bio}${p.link ? ` Link: ${p.link.href}` : ""}`,
    ),
  ].join("\n");
}

export function pagesSection(): string {
  return [
    "## Pages",
    "",
    `- [Home](${abs("/")}): Company overview and product index`,
    `- [Team](${abs("/team/")}): Founders and team`,
    `- [Contact](${abs("/contact/")}): Email, phone, and LinkedIn`,
    `- [Blog](${abs("/blog/")}): Product overviews and notes`,
    `- [Tags](${abs("/blog/tags/")}): Blog posts grouped by tag`,
    `- [RSS feed](${abs("/rss.xml")})`,
    `- [Full content for LLMs](${abs("/llms-full.txt")})`,
  ].join("\n");
}

export function postsIndexSection(entries: PostWithAuthor[]): string {
  if (entries.length === 0) return "## Blog posts\n\nNo posts published yet.";
  return [
    "## Blog posts",
    "",
    ...entries.map(
      ({ post, author }) =>
        `- [${post.data.title}](${abs(postMarkdownUrl(post))}) (${isoDate(post.data.pubDate)}, by ${author.data.name}): ${post.data.description}`,
    ),
  ].join("\n");
}

export function postToMarkdown(post: Post, author: Author): string {
  const { title, description, pubDate, updatedDate, tags } = post.data;
  const meta = [
    `- URL: ${abs(postUrl(post))}`,
    `- Author: ${author.data.name} — ${author.data.description}`,
    `- Published: ${isoDate(pubDate)}`,
    updatedDate ? `- Updated: ${isoDate(updatedDate)}` : null,
    tags.length ? `- Tags: ${tags.map((tag) => `[${tag}](${abs(tagUrl(tag))})`).join(", ")}` : null,
    `- Publisher: ${site.name}`,
  ].filter(Boolean);

  return [`# ${title}`, "", `> ${description}`, "", ...meta, "", (post.body ?? "").trim(), ""].join(
    "\n",
  );
}

export const textResponse = (body: string, type = "text/plain") =>
  new Response(body, { headers: { "Content-Type": `${type}; charset=utf-8` } });
