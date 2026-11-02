import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;
export type Author = CollectionEntry<"authors">;

export interface Tag {
  name: string;
  slug: string;
  count: number;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort(
    (a, b) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf() ||
      a.data.title.localeCompare(b.data.title),
  );
}

export async function getAuthor(post: Post): Promise<Author> {
  const author = await getEntry(post.data.author);
  if (!author) throw new Error(`Unknown author "${post.data.author.id}" in post "${post.id}"`);
  return author;
}

export const postUrl = (post: Post) => `/blog/${post.id}/`;
export const postMarkdownUrl = (post: Post) => `/blog/${post.id}.md`;

export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const tagUrl = (tag: string) => `/blog/tags/${tagSlug(tag)}/`;

export function getTags(posts: Post[]): Tag[] {
  const tags = new Map<string, Tag>();
  for (const post of posts) {
    for (const name of post.data.tags) {
      const slug = tagSlug(name);
      const tag = tags.get(slug) ?? { name, slug, count: 0 };
      tag.count += 1;
      tags.set(slug, tag);
    }
  }
  return [...tags.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
