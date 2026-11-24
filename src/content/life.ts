/**
 * "Life outside the screen" — waiting for Sabreen's own answers.
 * The chapter renders only when there are at least 3 items, so nothing is ever invented.
 *
 * kinds:  note (sticky note) · tape (cassette, for music) · cartridge (games) · place (postcard) · photo
 * Example:
 *   { kind: "tape", title: "On repeat", lines: ["Artist — Song"] },
 *   { kind: "place", title: "Favourite place", lines: ["The Benghazi corniche at sunset"] },
 */

import type { PhotoId } from "./photos";

export interface LifeItem {
  kind: "note" | "tape" | "cartridge" | "place" | "photo";
  title: string;
  lines?: string[];
  photo?: PhotoId;
}

export const lifeItems: LifeItem[] = [];
