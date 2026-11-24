"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/** Ink dot + ring. Elements can set data-cursor="label" to morph the ring into a pink label. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const d = dot.current!, r = ring.current!;
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });
    gsap.set([d, r], { opacity: 0 });
    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) { gsap.to([d, r], { opacity: 1, duration: 0.3 }); shown = true; }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      const label = labelled?.dataset.cursor ?? "";
      if (r.dataset.label !== label) { r.dataset.label = label; r.textContent = label; }
      const dark = !!t?.closest("[data-dark]");
      r.dataset.dark = String(dark && !label);
      const interactive = !!t?.closest("a, button, [role='button'], input, label");
      gsap.to(d, { scale: interactive && !label ? 2.4 : 1, duration: 0.3 });
    };
    const leave = () => { gsap.to([d, r], { opacity: 0, duration: 0.3 }); shown = false; };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
