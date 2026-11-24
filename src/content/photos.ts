/**
 * Photography registry. Originals are kept untouched in /public/photos at several widths;
 * the editorial treatment (grain, halftone, monochrome, colour reveal) is applied in CSS
 * so it can be changed without re-exporting anything.
 */

export type PhotoId = "studio" | "cutout" | "candid" | "eventTalk" | "eventHall";

export interface PhotoAsset {
  base: string;
  widths: number[];
  w: number;
  h: number;
  alt: string;
}

export const photos: Record<PhotoId, PhotoAsset> = {
  studio: {
    base: "/photos/portrait-studio",
    widths: [640, 1280, 1920],
    w: 2576,
    h: 1717,
    alt: "Studio portrait of Sabreen Najeeb wearing glasses, a patterned wine-red headscarf and a black trench coat",
  },
  cutout: {
    base: "/photos/portrait-cutout",
    widths: [700, 1300],
    w: 1216,
    h: 1509,
    alt: "Sabreen Najeeb smiling, wearing glasses, a wine-red headscarf and a black trench coat",
  },
  candid: {
    base: "/photos/candid-camera",
    widths: [640, 1280],
    w: 960,
    h: 1280,
    alt: "Sabreen outdoors under the trees, smiling with a Canon camera in her hands",
  },
  eventTalk: {
    base: "/photos/event-talk",
    widths: [640, 1280, 1920],
    w: 4032,
    h: 2268,
    alt: "Sabreen speaking at a podium in front of an audience, with a presentation on screen",
  },
  eventHall: {
    base: "/photos/event-hall",
    widths: [640, 1280, 1920],
    w: 3024,
    h: 4032,
    alt: "Sabreen standing in an event hall, with a panel seated behind her",
  },
};

export const srcSet = (p: PhotoAsset) => p.widths.map((w) => `${p.base}-${w}.webp ${w}w`).join(", ");
export const src = (p: PhotoAsset, w?: number) => `${p.base}-${w ?? p.widths[p.widths.length - 1]}.webp`;
