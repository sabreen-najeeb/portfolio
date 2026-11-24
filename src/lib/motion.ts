"use client";

import { useLayoutEffect, useEffect, type RefObject, type DependencyList } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

export { gsap, ScrollTrigger };

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Shared motion vocabulary so every scene moves with the same rhythm. */
export const ease = {
  enter: "expo.out",
  exit: "expo.in",
  drop: "bounce.out",
  pop: "back.out(2.2)",
  soft: "power3.inOut",
  scrub: "none",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches;

type SceneCtx = { reduced: boolean; desktop: boolean };

/**
 * Runs GSAP code scoped to a section and cleans up on unmount.
 * Re-runs when the reduced-motion or breakpoint conditions change.
 */
export function useScene(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: SceneCtx, self: gsap.Context) => void | (() => void),
  deps: DependencyList = [],
) {
  useIsoLayoutEffect(() => {
    if (!scope.current) return;
    const mm = gsap.matchMedia(scope.current);
    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 900px)",
      },
      (context) => {
        const c = context.conditions as { reduced: boolean; desktop: boolean };
        return setup({ reduced: c.reduced, desktop: c.desktop }, context);
      },
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Split text into spans for kinetic type. Keeps an accessible label on the parent. */
export function splitChars(el: HTMLElement, cls = "ch") {
  if (el.dataset.split) return Array.from(el.querySelectorAll<HTMLElement>(`.${cls}`));
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const out: HTMLElement[] = [];
  text.split(" ").forEach((word, wi, words) => {
    const w = document.createElement("span");
    w.setAttribute("aria-hidden", "true");
    w.style.display = "inline-block";
    w.style.whiteSpace = "nowrap";
    for (const ch of word) {
      const s = document.createElement("span");
      s.className = cls;
      s.style.display = "inline-block";
      s.textContent = ch;
      w.appendChild(s);
      out.push(s);
    }
    el.appendChild(w);
    if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.dataset.split = "1";
  return out;
}

export function splitWords(el: HTMLElement, cls = "w") {
  if (el.dataset.split) return Array.from(el.querySelectorAll<HTMLElement>(`.${cls}`));
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const out: HTMLElement[] = [];
  text.split(/\s+/).forEach((word, i, arr) => {
    const s = document.createElement("span");
    s.className = cls;
    s.setAttribute("aria-hidden", "true");
    s.textContent = word;
    el.appendChild(s);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
    out.push(s);
  });
  el.dataset.split = "1";
  return out;
}
