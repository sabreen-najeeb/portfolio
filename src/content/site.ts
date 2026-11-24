/**
 * Everything personal lives here. Edit this file to change copy, links or contact details.
 * Source of truth: Sabreen's CV (2026). Nothing here is invented — if a field is empty,
 * the UI simply doesn't render it.
 */

export const profile = {
  firstName: "Sabreen",
  lastName: "Najeeb",
  role: "Software engineering student",
  roleLong: "Software engineering student & full-stack developer",
  university: "Libyan International Medical University",
  universityShort: "LIMU",
  degree: "BSc in Information Technology, Software Engineering",
  studyYears: "2023 – present",
  average: "3.83",
  city: "Benghazi",
  country: "Libya",
  timezone: "Africa/Tripoli",
};

/** Public links. The phone number from the CV is intentionally NOT included. */
export const links = {
  email: "sabreen.a.najeeb.9@gmail.com",
  linkedin: "https://www.linkedin.com/in/sabreen-najeeb-589783387",
  github: "https://github.com/sabreennajeeb-commits",
  /**
   * Public CV for download. Leave empty until a public version (without phone number)
   * is approved — the download button only appears when this is set.
   * Example: "/sabreen-najeeb-cv.pdf" (put the file in /public).
   */
  cv: "",
};

export const copy = {
  meta: {
    title: "Sabreen Najeeb — Software engineer, beyond the code",
    description:
      "Portfolio of Sabreen Najeeb, a software engineering student in Benghazi, Libya, building full-stack, AI-integrated web apps with a media lead's eye for people.",
  },
  hero: {
    noteTop: "Hi! you found my little universe.",
    noteSide: "pull up a chair, I'll show you around",
    sticker: "Beyond the code",
  },
  human: {
    hello: "Hello!",
    // Scroll-filled paragraph. Facts: LIMU, Benghazi, full-stack + AI (CV), store since 2021 (CV), media work (CV).
    intro:
      "I'm Sabreen, a software engineering student at LIMU in Benghazi. I build full-stack web apps, from the database schema to the last pixel of the interface, and lately I've been teaching them to think with AI. I've also run a small online store since 2021 and spent a lot of time behind a camera at tech events, so I learned early that people don't use code. They use experiences. That's the part I care about most.",
    photoNote: "caught holding the camera, for once",
  },
  worlds: {
    left: "Engineering by discipline.",
    right: "Creative by nature.",
    merged: "Between logic and imagination.",
  },
  connect: {
    headlineA: "and that's",
    headlineB: "a wrap.",
    letter: [
      "Thank you for scrolling all the way down here.",
      "If you're building something that needs a careful engineer who also thinks about the people on the other side of the screen, I'd love to hear about it.",
      "— Sabreen",
    ],
    marquee: ["Built with logic", "Driven by curiosity", "Engineering by discipline", "Creative by nature"],
  },
};

export const chapters = [
  { id: "hello", file: "index.tsx", label: "Hello" },
  { id: "human", file: "human.md", label: "The human behind the code" },
  { id: "worlds", file: "worlds.ts", label: "Two worlds, one identity" },
  { id: "universe", file: "stack.json", label: "My technical universe" },
  { id: "built", file: "projects/", label: "Things I have built" },
  { id: "media", file: "media.psd", label: "Marketing, media & creativity" },
  { id: "journey", file: "journey.log", label: "Beyond the classroom" },
  { id: "life", file: "life.txt", label: "Life outside the screen" },
  { id: "playground", file: "playground.canvas", label: "Digital playground" },
  { id: "connect", file: "contact.eml", label: "Let's connect" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
