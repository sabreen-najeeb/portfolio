# Sabreen Najeeb, beyond the code

My personal portfolio. It's a scroll-driven, art-directed site built with Next.js, TypeScript, Tailwind CSS v4, GSAP (with ScrollTrigger and Draggable) and Lenis.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into /out
npm start          # serve /out locally
```

**Deploy on Vercel:** import the repo with the default Next.js settings. The site is a static export (`output: "export"`), so it also runs on any static host.

Set `NEXT_PUBLIC_SITE_URL` to your real domain so the share previews (Open Graph) use absolute URLs.

## Where things live

| What | File |
| --- | --- |
| Name, links, copy, chapter list | `src/content/site.ts` |
| Projects and case studies | `src/content/projects.ts` |
| Skills (the keyboard) | `src/content/skills.ts` |
| Timeline entries | `src/content/journey.ts` |
| Media roles + work samples | `src/content/media.ts` |
| Life outside the screen | `src/content/life.ts` |
| Photo registry | `src/content/photos.ts` |
| Design tokens, photo treatment, grain | `src/styles/globals.css` |
| Shared motion helpers | `src/lib/motion.ts` |
| Scenes (one per chapter) | `src/components/scenes/` |
| Reusable bits (keycap, sphere, beads, diagrams…) | `src/components/ui/` |

### Common updates

- **Add project screenshots:** put the images in `public/projects/<id>/`, then list them in that project's `screens` array. The case study shows a gallery automatically.
- **Add media work:** put the files in `public/media/`, then add `{ src, alt, caption }` items to `mediaSamples` in `media.ts`.
- **Public CV download:** put the PDF in `public/` (with no phone number), then set `links.cv` in `site.ts`, for example `"/sabreen-najeeb-cv.pdf"`. The button only appears once this is set.
- **Life outside the screen:** add at least three items to `life.ts`. The chapter, and its menu entry, stay hidden until then.
- **New photos:** export `.webp` files at the widths listed in `photos.ts` (keep the originals). The black-and-white, halftone and colour-on-hover treatment is applied in CSS, so the files themselves are never edited.

## Design system

- **Colours:** paper `#ece4da`, bubblegum `#f4a6c6`, wine `#7b1e3a` (taken from the scarf in the studio portrait), ink `#221c1f`, terminal `#2b2628`. Lime `#c9e265` is reserved for "success" signals such as 200 OK.
- **Type:** Shrikhand for the bubbly display type, Playfair Display for editorial headings, Caveat for handwritten notes, Inter Tight for body text, and JetBrains Mono for code only.
- **Photography:** every photo is warm monochrome with a halftone dot screen. Colour returns on hover or focus. Cut-outs get a white sticker edge.
- **Motifs:** the sphere that drops in and becomes each chapter heading's full stop, logo keycaps, friendship-bracelet beads, washi tape, stars, tickets and stamps.
- **Motion:** one opening sequence (pen signature → loader lifts → the name and portrait assemble). After that, motion follows your scroll, pointer, drag or typing.

## Accessibility & performance

- With `prefers-reduced-motion`, there are no pins, no smooth scrolling and no particle physics, and all content stays reachable.
- The case study uses a native `<dialog>`, so focus is trapped and Escape closes it. Every interactive element has a visible keyboard focus state.
- Fonts are self-hosted (Fontsource). Images are responsive `.webp` with lazy loading. The particle canvas pauses when it's off-screen.
- The site doesn't publish any phone number.
