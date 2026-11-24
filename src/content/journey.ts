/**
 * Journey entries, oldest first. Every date and fact comes from the CV.
 * kind decides the paper object it is printed on: index card, ticket, stamp (certificate) or polaroid.
 */

import type { PhotoId } from "./photos";

export type EntryKind = "card" | "ticket" | "stamp" | "polaroid";

export interface JourneyEntry {
  id: string;
  year: string;
  when: string;
  title: string;
  where?: string;
  body?: string;
  kind: EntryKind;
  photo?: PhotoId;
  world: "eng" | "media" | "both";
}

export const journey: JourneyEntry[] = [
  {
    id: "nightmare",
    year: "2021",
    when: "Jun 2021 – present",
    title: "Opened Nightmare Online Store",
    where: "Founder",
    body: "My first business: marketing, customer messages, inventory and logistics, all on my plate.",
    kind: "card",
    world: "media",
  },
  {
    id: "branders",
    year: "2022",
    when: "2022",
    title: "Branders",
    where: "GDG on Campus",
    kind: "stamp",
    world: "media",
  },
  {
    id: "limu",
    year: "2023",
    when: "2023 – present",
    title: "Started Software Engineering at LIMU",
    where: "BSc in Information Technology",
    body: "Current cumulative average: 3.83.",
    kind: "card",
    world: "eng",
  },
  {
    id: "supernova",
    year: "2023",
    when: "Sep 2023 – Jun 2024",
    title: "Supernova robotics team",
    where: "Team member",
    body: "Built and programmed competitive robots for local and regional competitions, and handled the team's digital media too.",
    kind: "ticket",
    world: "both",
  },
  {
    id: "trainer",
    year: "2024",
    when: "2024",
    title: "Robotics trainer",
    where: "Al Salam Permanent Foundation",
    body: "Taught 60 preparatory school students Java, sensor integration, robot construction and autonomous movement.",
    kind: "card",
    world: "eng",
  },
  {
    id: "grids",
    year: "2025",
    when: "2025 – present",
    title: "Social media specialist",
    where: "Grids Company, part-time",
    kind: "ticket",
    world: "media",
  },
  {
    id: "mtg7",
    year: "2025",
    when: "Jun – Sep 2025",
    title: "Media team, MTG7 Robotics",
    body: "Covered robotics events and workshops: photography, video editing, documentation.",
    kind: "card",
    world: "media",
  },
  {
    id: "nvidia",
    year: "2025",
    when: "Sep 2025",
    title: "Fundamentals of Deep Learning",
    where: "NVIDIA Deep Learning Institute",
    kind: "stamp",
    world: "eng",
  },
  {
    id: "gdg",
    year: "2025",
    when: "Sep 2025 – present",
    title: "Media lead, GDG on Campus LIMU",
    body: "Media planning, branding and campaigns for the chapter's technical events.",
    kind: "card",
    world: "both",
  },
  {
    id: "talk",
    year: "2025",
    when: "26 Nov 2025",
    title: "“What It Means to Be a Developer”",
    where: "Technical speaker",
    body: "An introductory talk on front-end development for new university students: the role, the technologies and how to start learning.",
    kind: "ticket",
    world: "eng",
  },
  {
    id: "datacamp",
    year: "2026",
    when: "Feb 2026",
    title: "Preprocessing for ML & Importing Data in Python",
    where: "DataCamp",
    kind: "stamp",
    world: "eng",
  },
  {
    id: "techzaar",
    year: "2026",
    when: "12 Mar 2026",
    title: "Techzaar Technology Bazaar",
    where: "Event organizer",
    body: "Planning, participant coordination, promotion and on-site media coverage.",
    kind: "ticket",
    world: "both",
  },
  {
    id: "stage",
    year: "2026",
    when: "2026",
    title: "A year of shipping",
    body: "Nona AI and the flight reservation system built solo, CloudScale deployed with my team in June, ARCH in progress at GDG.",
    kind: "card",
    world: "eng",
  },
];
