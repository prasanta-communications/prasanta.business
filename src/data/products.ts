export interface Product {
  slug: string;
  name: string;
  category: string;
  summary: string;
  url: string;
  domain: string;
}

export const products: Product[] = [
  {
    slug: "mf7",
    name: "MF7",
    category: "Fitness",
    summary:
      "Mind and Fitness 7 is SaaS for gyms and fitness centres. Manage clients, subscriptions, payments, and sales, nurture members with training histories and goals, and get clear signals on client fitness and business progress — with mobile apps for owners and their clients.",
    url: "https://mf7.in/",
    domain: "mf7.in",
  },
  {
    slug: "bolty",
    name: "Bolty",
    category: "Automotive",
    summary:
      "Dents and scratches are inevitable. Bolty restores them with precise color matching so every car gets a clean second life.",
    url: "https://bolty.in",
    domain: "bolty.in",
  },
  {
    slug: "roomr",
    name: "Roomr",
    category: "Rentals",
    summary:
      "The simplest way to rent without the noise. Roomr covers the full renting lifecycle and removes the headaches you never asked for.",
    url: "https://roomr.in",
    domain: "roomr.in",
  },
  {
    slug: "workbase-hq",
    name: "Workbase HQ",
    category: "Operations",
    summary:
      "A suite of tools for everyday business operations — starting with CRM for co-working spaces.",
    url: "https://workbasehq.com",
    domain: "workbasehq.com",
  },
  {
    slug: "zone-out",
    name: "Zone Out",
    category: "Fragrance",
    summary:
      "A calm luxury fragrance house — Extrait de Parfum compositions for the moments you choose to leave the noise behind.",
    url: "https://zoneoutparfum.com/",
    domain: "zoneoutparfum.com",
  },
];

export const getProduct = (slug: string | undefined) =>
  slug ? products.find((p) => p.slug === slug) : undefined;
