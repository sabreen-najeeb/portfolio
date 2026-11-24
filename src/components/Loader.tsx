"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import s from "./loader.module.css";

const getLenis = () => (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;

export const INTRO_EVENT = "sn:intro";
export const introDone = () => typeof window !== "undefined" && (window as unknown as { __snIntro?: boolean }).__snIntro === true;

/**
 * Opening sequence (from the reference video): a pen signs "Sabreen" while assets load,
 * then the sheet lifts away like a page being turned up.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const finish = () => {
      document.documentElement.style.overflow = "";
      (window as unknown as { __snIntro?: boolean }).__snIntro = true;
      window.dispatchEvent(new Event(INTRO_EVENT));
      setGone(true);
    };
    if (prefersReducedMotion()) {
      gsap.to(el, { opacity: 0, duration: 0.3, onComplete: finish });
      return;
    }
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const counter = el.querySelector<HTMLElement>("[data-count]")!;
    const sig = el.querySelector<HTMLElement>("[data-sig]")!;
    const pen = el.querySelector<HTMLElement>("[data-pen]")!;
    const line = el.querySelector<HTMLElement>("[data-line]")!;
    const state = { p: 0 };

    // Real progress: fonts + hero images. The animation never finishes before they're ready.
    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      ...Array.from(document.querySelectorAll<HTMLImageElement>("img[fetchpriority='high']")).map((img) =>
        img.complete ? Promise.resolve() : new Promise((r) => { img.addEventListener("load", r, { once: true }); img.addEventListener("error", r, { once: true }); }),
      ),
    ]);

    const write = gsap.timeline();
    write.set(sig, { clipPath: "inset(0 100% 0 0)" })
      .to(state, {
        p: 1, duration: 2.1, ease: "power2.inOut",
        onUpdate: () => {
          counter.textContent = String(Math.round(state.p * 100)).padStart(3, "0");
          sig.style.clipPath = `inset(-20% ${100 - state.p * 100}% -20% 0)`;
          const r = sig.getBoundingClientRect();
          gsap.set(pen, { x: r.left + r.width * state.p, y: r.top + r.height * (0.55 + Math.sin(state.p * 38) * 0.18) });
        },
      })
      .to(line, { scaleX: 1, duration: 0.6, ease: "expo.out" }, "-=0.2");

    const exit = gsap.timeline({ paused: true });
    exit.to(pen, { x: "+=240", y: "-=200", rotate: 30, opacity: 0, duration: 0.7, ease: "expo.in" })
      .to(sig, { yPercent: -30, opacity: 0, duration: 0.6, ease: "expo.in" }, "<0.1")
      .to(el.querySelectorAll("[data-fade]"), { opacity: 0, duration: 0.3 }, "<")
      .to(el, { clipPath: "inset(0 0 100% 0 round 0 0 50% 50%)", duration: 1.1, ease: "expo.inOut" }, "-=0.25")
      .add(() => { getLenis()?.start(); finish(); }, "-=0.55");

    const written = new Promise<void>((r) => write.eventCallback("onComplete", () => r()));
    const timeout = new Promise<void>((r) => setTimeout(r, 6000));
    Promise.race([Promise.all([ready, written]), timeout]).then(() => exit.play());

    const skip = () => { write.progress(1); exit.play(); exit.timeScale(2.5); };
    window.addEventListener("keydown", skip, { once: true });
    el.addEventListener("click", skip, { once: true });
    return () => { write.kill(); exit.kill(); window.removeEventListener("keydown", skip); };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className={s.loader} role="status" aria-label="Loading Sabreen Najeeb's portfolio">
      <div className={s.center}>
        <p data-sig className={s.sig} aria-hidden="true">Sabreen</p>
        <span data-line className={s.line} aria-hidden="true" />
      </div>
      <svg data-pen className={s.pen} viewBox="0 0 120 20" aria-hidden="true">
        <defs>
          <linearGradient id="penBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a4045" />
            <stop offset=".5" stopColor="#221c1f" />
            <stop offset="1" stopColor="#0d0a0c" />
          </linearGradient>
        </defs>
        <path d="M0 10 L14 6.6 L14 13.4 Z" fill="#b8a99c" />
        <path d="M0 10 L5 8.8 L5 11.2Z" fill="#221c1f" />
        <rect x="14" y="5" width="96" height="10" rx="4" fill="url(#penBody)" />
        <rect x="70" y="3.4" width="34" height="2.4" rx="1.2" fill="#c7b9ab" />
        <rect x="36" y="5" width="3" height="10" fill="#7b1e3a" />
      </svg>
      <p className={s.count} data-fade>
        <span className="mono" data-count>000</span>
        <span className="mono">loading ~/sabreen</span>
      </p>
      <p className={s.hint} data-fade>Press any key to skip</p>
    </div>
  );
}
