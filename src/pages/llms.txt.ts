import { site } from "../data/site";
import { getPublishedPosts } from "../lib/posts";
import {
  companySection,
  pagesSection,
  postsIndexSection,
  productsSection,
  teamSection,
  textResponse,
  withAuthors,
} from "../lib/llms";

export async function GET() {
  const posts = await withAuthors(await getPublishedPosts());
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    companySection(),
    "",
    productsSection(),
    "",
    teamSection(),
    "",
    postsIndexSection(posts),
    "",
    pagesSection(),
    "",
  ].join("\n");

  return textResponse(body);
}
