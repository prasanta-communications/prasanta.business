import { site } from "../data/site";
import { getPublishedPosts } from "../lib/posts";
import {
  companySection,
  pagesSection,
  postToMarkdown,
  productsSection,
  teamSection,
  textResponse,
  withAuthors,
} from "../lib/llms";

export async function GET() {
  const posts = await withAuthors(await getPublishedPosts());
  const contact = [
    "## Contact",
    "",
    "Reach us directly. No forms, no wait — just email, phone, or LinkedIn.",
    "",
    `- Email: ${site.email}`,
    `- Phone: ${site.phoneDisplay}`,
    `- LinkedIn: ${site.linkedin}`,
  ].join("\n");

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    site.tagline,
    "",
    companySection(),
    "",
    productsSection(),
    "",
    teamSection(),
    "",
    contact,
    "",
    pagesSection(),
    "",
    ...(posts.length > 0
      ? ["# Blog posts", "", ...posts.map(({ post, author }) =>
            postToMarkdown(post, author).replace(/^(#{1,5}) /gm, "#$1 "),
          ),
        ]
      : []),
  ].join("\n");

  return textResponse(body);
}
