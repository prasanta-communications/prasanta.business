import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const authors = defineCollection({
  loader: glob({ base: "./src/content/authors", pattern: "**/*.json" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Drafts are previewable in `astro dev` but excluded from production builds. */
    draft: z.boolean().default(false),
    /** Id of an author file in src/content/authors */
    author: reference("authors"),
    /** Slug of a product in src/data/products.ts */
    product: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, authors };
