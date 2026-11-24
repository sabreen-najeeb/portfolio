"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { Star } from "./ui/Bits";

/** Type "hello" anywhere: the page says hello back with a shower of stars. */
export default function EasterEgg() {
  const [show, setShow] = useState(0);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, [contenteditable]")) return;
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf === "hello") { buf = ""; setShow((n) => n + 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!show || !layer.current) return;
    const el = layer.current;
    const stars = el.querySelectorAll("[data-s]");
    const toast = el.querySelector("[data-toast]");
    if (prefersReducedMotion()) {
      gsap.set(toast, { opacity: 1 });
      gsap.to(toast, { opacity: 0, delay: 2.5 });
      return;
    }
    gsap.fromTo(stars, { x: () => gsap.utils.random(0, window.innerWidth), y: -60, rotate: 0, opacity: 1, scale: () => gsap.utils.random(0.6, 1.6) },
      { y: () => window.innerHeight + 80, rotate: () => gsap.utils.random(-540, 540), duration: () => gsap.utils.random(1.6, 3), ease: "power1.in", stagger: 0.02 });
    gsap.fromTo(toast, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "back.out(2)" });
    gsap.to(toast, { yPercent: 120, opacity: 0, delay: 3, duration: 0.5 });
  }, [show]);

  return (
    <div ref={layer} aria-live="polite" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 160, overflow: "hidden" }}>
      {Array.from({ length: show ? 36 : 0 }, (_, i) => (
        <span key={`${show}-${i}`} data-s style={{ position: "absolute", left: 0, top: 0, width: 26, opacity: 0 }}>
          <Star fill={i % 3 ? "#e8b931" : "#f4a6c6"} />
        </span>
      ))}
      <p data-toast style={{ position: "absolute", left: "50%", bottom: "2rem", translate: "-50% 0", margin: 0, opacity: 0, padding: "0.9rem 1.4rem", borderRadius: 999, background: "var(--color-ink)", color: "var(--color-paper)", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
        {show ? "hello, world. thanks for saying hi ✦" : ""}
      </p>
    </div>
  );
}
