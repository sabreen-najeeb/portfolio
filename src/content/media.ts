/**
 * Marketing & media roles (CV). `samples` is where real work goes later:
 * add { src, alt, caption } items with files in /public/media — the gallery appears automatically.
 */

export interface MediaRole {
  id: string;
  org: string;
  role: string;
  when: string;
  points: string[];
}

export const mediaRoles: MediaRole[] = [
  {
    id: "gdg",
    org: "GDG on Campus LIMU",
    role: "Media lead",
    when: "Sep 2025 – present",
    points: [
      "Lead media planning, branding and content for technical events",
      "Run social campaigns and keep the chapter's visual identity consistent",
      "Coordinate promotion and coverage with the technical and organising teams",
    ],
  },
  {
    id: "grids",
    org: "Grids Company",
    role: "Social media specialist, part-time",
    when: "2025 – present",
    points: [
      "Manage accounts and produce content in each brand's identity",
      "Plan marketing for digital products and chatbot services",
      "Make posts and reels, adjusted to what engagement data shows",
    ],
  },
  {
    id: "mtg7",
    org: "MTG7 Robotics Team",
    role: "Media team member",
    when: "Jun – Sep 2025",
    points: ["Content and coverage for robotics events and workshops", "Photography, video editing and documentation"],
  },
  {
    id: "nightmare",
    org: "Nightmare Online Store",
    role: "Founder",
    when: "Jun 2021 – present",
    points: ["Marketing, customer communication, inventory and logistics"],
  },
];

/** How the media side feeds the engineering side — phrased as Sabreen's own view. */
export const crossover = [
  { from: "Reading engagement data", to: "Designing for real users" },
  { from: "Keeping a brand consistent", to: "Building consistent design systems" },
  { from: "Explaining tech events to everyone", to: "Writing interfaces people understand" },
];

export const mediaSamples: { src: string; alt: string; caption?: string }[] = [];
