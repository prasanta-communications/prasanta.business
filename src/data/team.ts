export interface Person {
  name: string;
  role: string;
  bio: string;
  link?: { label: string; href: string };
  founder?: boolean;
}

export const team: Person[] = [
  {
    name: "Ravi Teja",
    role: "Co-founder",
    bio: "Co-founder of Prasanta Communications. Focused on product direction and shipping software that businesses rely on every day.",
    link: { label: "Blog → insidert.com", href: "https://insidert.com" },
    founder: true,
  },
  {
    name: "Hemanth",
    role: "Co-founder",
    bio: "Co-founder of Prasanta Communications. Engages with people, shapes our products, and builds and stewards the systems behind them.",
    link: {
      label: "Instagram → @hemanth.veligatla",
      href: "https://www.instagram.com/hemanth.veligatla/",
    },
    founder: true,
  },
  {
    name: "Nandini",
    role: "Head of Operations",
    bio: "Specialises in operations and internals — keeping day-to-day workflows, coordination, and behind-the-scenes systems running so the team can stay focused on shipping products.",
    link: {
      label: "Linked In → nandini-bashamoni",
      href: "https://www.linkedin.com/in/nandini-bashamoni-324985293",
    },
    // founder: false,
  },
];
