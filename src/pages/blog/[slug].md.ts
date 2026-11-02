import type { APIContext } from "astro";
import { getAuthor, getPublishedPosts, type Post } from "../../lib/posts";
import { postToMarkdown, textResponse } from "../../lib/llms";

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function GET({ props }: APIContext<{ post: Post }>) {
  const author = await getAuthor(props.post);
  return textResponse(postToMarkdown(props.post, author), "text/markdown");
}
