"use client";

import { useEffect, useRef } from "react";
import Glyph from "./Glyph";
import { skillById } from "@/content/skills";
import { gsap, useScene, splitChars } from "@/lib/motion";
import s from "./bits.module.css";

/** Official logo when one exists, otherwise the custom glyph. */
export function SkillMark({ id, className = "", label = false }: { id: string; className?: string; label?: boolean }) {
  const sk = skillById(id);
  if (!sk) return null;
  return (
    <span className={`${s.mark} ${className}`} title={sk.name}>
      {sk.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={sk.logo} alt="" width={28} height={28} loading="lazy" draggable={false} />
      ) : sk.glyph ? (
        <Glyph name={sk.glyph} />
      ) : null}
      {label ? <span className={s.markLabel}>{sk.name}</span> : <span className="sr-only">{sk.name}</span>}
    </span>
  );
}

export function Star({ className = "", fill = "#e8b931" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1.5l2.6 7.1 7.4.4-5.8 4.7 2 7.3L12 16.9 5.8 21l2-7.3L2 9l7.4-.4z" fill={fill} stroke="rgba(34,28,31,.35)" strokeWidth=".6" />
    </svg>
  );
}

/** Friendship-bracelet beads spelling a word, strung on a curve. */
export function Beads({ word, className = "", curve = 18 }: { word: string; className?: string; curve?: number }) {
  const letters = [...word];
  const n = letters.length;
  return (
    <div className={`${s.beads} ${className}`} aria-label={word} role="img">
      <svg className={s.string} viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
        <path d={`M0 6 Q50 ${6 + curve * 1.4} 100 6`} fill="none" stroke="#221c1f" strokeWidth=".5" />
      </svg>
      {letters.map((l, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1);
        const y = 4 * curve * t * (1 - t);
        const rot = (t - 0.5) * -curve * 1.6;
        return l === " " ? (
          <span key={i} className={s.gap} aria-hidden="true" />
        ) : (
          <span key={i} className={`${s.bead} bead`} aria-hidden="true" style={{ transform: `translateY(${y}px) rotate(${rot}deg)` }}>
            {l}
          </span>
        );
      })}
    </div>
  );
}

/** The recurring sphere from the reference video. It bounces in and becomes the heading's full stop. */
export function Sphere({ tone = "pink", className = "" }: { tone?: "pink" | "wine" | "ink" | "paper"; className?: string }) {
  return <span className={`${s.sphere} ${s[`sphere_${tone}`]} ${className} sphere`} aria-hidden="true" />;
}

interface ChapterTitleProps {
  no: string;
  file: string;
  children: string;
  tone?: "pink" | "wine" | "ink" | "paper";
  as?: "h2" | "h3";
  className?: string;
  dark?: boolean;
  id?: string;
}

export function ChapterTitle({ no, file, children, tone = "pink", as = "h2", className = "", dark, id }: ChapterTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as;
  useScene(ref, ({ reduced }) => {
    const el = ref.current!;
    const title = el.querySelector<HTMLElement>("[data-title]")!;
    const sphere = el.querySelector<HTMLElement>(".sphere")!;
    const meta = el.querySelector<HTMLElement>("[data-meta]")!;
    if (reduced) return;
    const chars = splitChars(title);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%", once: true } });
    tl.from(meta, { yPercent: 100, opacity: 0, duration: 0.8 })
      .from(chars, { yPercent: 110, rotate: 6, duration: 1.1, stagger: 0.025 }, 0.05)
      .from(sphere, { y: -260, duration: 1.1, ease: "bounce.out" }, 0.25)
      .to(sphere, { scaleY: 0.78, scaleX: 1.18, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut", transformOrigin: "50% 100%" }, 0.55);
  });
  return (
    <div ref={ref} className={`${s.chapter} ${dark ? s.dark : ""} ${className}`}>
      <p data-meta className={s.meta}>
        <span className={s.no}>{no}</span>
        <span className="mono">{file}</span>
      </p>
      <Tag id={id} className={s.title}>
        <span data-title className={s.titleText}>{children}</span>
        <Sphere tone={tone} className={s.titleSphere} />
      </Tag>
    </div>
  );
}

/** Magnetic pull towards the pointer. */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [strength]);
  return ref;
}

/** Hand-drawn arrow used for annotations. */
export function Scribble({ className = "", variant = "curl" }: { className?: string; variant?: "curl" | "swoop" | "loop" }) {
  const d =
    variant === "curl"
      ? "M4 40 C 30 6, 70 4, 92 26 S 120 58, 140 30 M130 22 L141 30 L129 38"
      : variant === "swoop"
        ? "M4 10 C 40 50, 90 56, 136 26 M124 22 L137 26 L131 38"
        : "M6 30 C 26 4, 52 6, 46 26 S 20 44, 40 46 S 110 40, 136 20 M124 16 L137 20 L130 32";
  return (
    <svg viewBox="0 0 146 60" className={`${s.scribble} ${className} scribble`} aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}
