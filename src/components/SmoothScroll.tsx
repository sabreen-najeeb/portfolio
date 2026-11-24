"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/** Scroll to an element or y position, smoothly when Lenis is active. */
export function scrollToTarget(lenis: Lenis | null, target: string | number | HTMLElement, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { duration: immediate ? 0 : 1.8, immediate, force: true });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef<((t: number) => void) | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const l = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, touchMultiplier: 1.4 });
    l.on("scroll", ScrollTrigger.update);
    raf.current = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(raf.current);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    (window as unknown as { __lenis?: Lenis }).__lenis = l;
    return () => {
      if (raf.current) gsap.ticker.remove(raf.current);
      l.destroy();
      setLenis(null);
    };
  }, []);

  // Recalculate pinned sections once fonts & images have settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
