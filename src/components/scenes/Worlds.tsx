"use client";

import { useRef } from "react";
import { copy } from "@/content/site";
import { gsap, useScene, splitChars } from "@/lib/motion";
import { ChapterTitle } from "../ui/Bits";
import s from "./worlds.module.css";

const code = [
  { t: "const sabreen = {", c: "" },
  { t: '  role: "software engineer",', c: "" },
  { t: '  builds: ["full-stack apps", "AI features", "cloud pipelines"],', c: "" },
  { t: '  stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],', c: "" },
  { t: '  ships: ["Vercel", "Docker", "Kubernetes", "Azure"],', c: "" },
  { t: '  cares: "secure, readable, bilingual interfaces",', c: "" },
  { t: "};", c: "" },
];

const engineering = ["Full-stack development", "AI integration", "Databases & security", "Cloud & DevOps", "UI/UX design", "Robotics"];
const creative = ["Media lead", "Social media", "Content & reels", "Branding", "Photography", "Event coverage"];

export function Megaphone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden="true">
      <defs>
        <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.25" fill="#221c1f" />
        </pattern>
        <pattern id="dotsFine" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r=".8" fill="#221c1f" />
        </pattern>
      </defs>
      <g stroke="#221c1f" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M40 62 L130 24 L130 126 L40 98 Z" fill="#fbf8f4" />
        <path d="M40 62 L130 24 L130 126 L40 98 Z" fill="url(#dotsFine)" opacity=".55" />
        <ellipse cx="130" cy="75" rx="16" ry="51" fill="#fbf8f4" />
        <ellipse cx="130" cy="75" rx="16" ry="51" fill="url(#dots)" opacity=".8" />
        <rect x="20" y="60" width="24" height="40" rx="6" fill="#7b1e3a" />
        <path d="M60 100 L54 140 L74 140 L78 106" fill="#fbf8f4" />
        <path d="M160 46 L190 28 M166 75 L204 75 M160 104 L190 122" fill="none" />
      </g>
    </svg>
  );
}

export default function Worlds() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ reduced, desktop }) => {
    const q = gsap.utils.selector(root);
    const merged = q<HTMLElement>("[data-merged]")[0];
    const chars = splitChars(merged);
    chars.forEach((c, i) => c.classList.add(i % 2 ? s.mChar : s.dChar));
    if (reduced || !desktop) {
      if (!reduced) {
        gsap.from(q("[data-line]"), { opacity: 0, x: -20, stagger: 0.08, scrollTrigger: { trigger: q("[data-term]")[0], start: "top 70%", once: true } });
        gsap.from(q("[data-paper]"), { xPercent: 30, rotate: 4, opacity: 0, duration: 1.2, scrollTrigger: { trigger: q("[data-paper]")[0], start: "top 80%", once: true } });
        gsap.from(chars, { yPercent: 100, opacity: 0, stagger: 0.03, scrollTrigger: { trigger: merged, start: "top 85%", once: true } });
      }
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top top", end: "+=260%", scrub: 1, pin: q("[data-stage]")[0] },
      defaults: { ease: "none" },
    });
    tl.from(q("[data-line]"), { opacity: 0, x: -30, stagger: 0.12, duration: 0.3 }, 0)
      .from(q("[data-eng-head]"), { yPercent: 40, opacity: 0, duration: 0.4 }, 0.1)
      .from(q("[data-eng-item]"), { opacity: 0, y: 20, stagger: 0.05, duration: 0.2 }, 0.3)
      .fromTo(q("[data-paper]"), { xPercent: 105, rotate: 6 }, { xPercent: 0, rotate: 0, duration: 0.7, ease: "power2.out" }, 0.9)
      .from(q("[data-cr-head] span"), { yPercent: 110, rotate: 8, stagger: 0.04, duration: 0.4 }, 1.3)
      .from(q("[data-cr-item]"), { opacity: 0, x: 30, stagger: 0.05, duration: 0.2 }, 1.45)
      .from(q("[data-mega]"), { scale: 0, rotate: -30, duration: 0.4, ease: "back.out(2)" }, 1.4)
      .fromTo(q("[data-comment]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.4 }, 1.9)
      .to(q("[data-dim]"), { opacity: 0.25, duration: 0.3 }, 2.2)
      .from(chars, { yPercent: 120, opacity: 0, rotate: () => gsap.utils.random(-20, 20), stagger: 0.02, duration: 0.5, ease: "back.out(2)" }, 2.25)
      .from(q("[data-seam]"), { scaleY: 0, duration: 0.4 }, 2.2)
      .to({}, { duration: 0.4 });
  });

  return (
    <section id="worlds" ref={root} className={s.worlds} aria-labelledby="worlds-title">
      <div className={s.stage} data-stage>
        <div className={s.term} data-term data-dark>
          <div data-dim className={s.termInner}>
            <ChapterTitle id="worlds-title" no="03" file="worlds.ts" tone="pink" dark as="h2">Two worlds, one identity</ChapterTitle>
            <pre className={s.code} aria-label="Code describing Sabreen as a software engineer">
              {code.map((l, i) => (
                <code key={i} data-line className={s.line}><span className={s.ln}>{String(i + 1).padStart(2, "0")}</span>{l.t}</code>
              ))}
              <code className={`${s.line} ${s.comment}`} data-comment><span className={s.ln}>08</span>{"// + a media lead's eye for people"}</code>
            </pre>
            <h3 className={s.engHead} data-eng-head>{copy.worlds.left}</h3>
            <ul className={s.engList}>
              {engineering.map((e) => <li key={e} data-eng-item>{e}</li>)}
            </ul>
          </div>
        </div>

        <div className={s.paper} data-paper>
          <div data-dim className={s.paperInner}>
            <h3 className={`${s.crHead} display`} data-cr-head>
              {copy.worlds.right.split(" ").map((w) => <span key={w}>{w}</span>)}
            </h3>
            <ul className={`${s.crList} hand`}>
              {creative.map((c) => <li key={c} data-cr-item>{c}</li>)}
            </ul>
            <div data-mega className={s.mega}><Megaphone /></div>
          </div>
        </div>

        <span className={s.seam} data-seam aria-hidden="true" />
        <p className={s.merged} data-merged>{copy.worlds.merged}</p>
      </div>
    </section>
  );
}
