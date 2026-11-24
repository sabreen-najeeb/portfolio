"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { skillGroups, allSkills } from "@/content/skills";
import { projects } from "@/content/projects";
import { gsap, useScene } from "@/lib/motion";
import { ChapterTitle, SkillMark } from "../ui/Bits";
import Keycap from "../ui/Keycap";
import s from "./universe.module.css";

export default function Universe() {
  const root = useRef<HTMLElement>(null);
  const [sel, setSel] = useState("nextjs");
  const [group, setGroup] = useState<string | null>(null);
  const screen = useRef<HTMLDivElement>(null);
  const current = useMemo(() => allSkills.find((x) => x.id === sel)!, [sel]);
  const used = (current.usedIn ?? []).map((id) => projects.find((p) => p.id === id)!).filter(Boolean);

  useScene(root, ({ reduced }) => {
    if (reduced) return;
    const q = gsap.utils.selector(root);
    q<HTMLElement>("[data-row]").forEach((row) => {
      gsap.from(row.querySelectorAll("[data-k]"), {
        y: -140, opacity: 0, rotate: () => gsap.utils.random(-25, 25),
        duration: 1.1, ease: "bounce.out", stagger: { each: 0.045, from: "random" },
        scrollTrigger: { trigger: row, start: "top 88%", once: true },
      });
      gsap.from(row.querySelector("[data-row-label]"), { xPercent: -30, opacity: 0, duration: 1, scrollTrigger: { trigger: row, start: "top 88%", once: true } });
    });
    gsap.from(q("[data-screen]"), { scale: 0.9, opacity: 0, rotate: -3, duration: 1.2, ease: "back.out(1.6)", scrollTrigger: { trigger: q("[data-screen]")[0], start: "top 85%", once: true } });
  });

  // Screen refresh flicker whenever the selection changes.
  useEffect(() => {
    const el = screen.current?.querySelector("[data-screen-content]");
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(el, { opacity: 0.2, filter: "blur(3px)", y: 6 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.45, ease: "expo.out" });
  }, [sel]);

  // Type on your real keyboard: the first key that starts with that letter is pressed (cycles on repeat).
  useEffect(() => {
    let inView = false;
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    const onKey = (e: KeyboardEvent) => {
      if (!inView || e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      const letter = e.key.toLowerCase();
      const matches = allSkills.filter((k) => k.name.toLowerCase().startsWith(letter));
      if (!matches.length) return;
      setSel((prev) => {
        const i = matches.findIndex((m) => m.id === prev);
        const next = matches[(i + 1) % matches.length];
        const el = root.current?.querySelector<HTMLElement>(`[data-k="${next.id}"]`);
        if (el) { el.dataset.down = "true"; setTimeout(() => (el.dataset.down = "false"), 160); }
        return next.id;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => { io.disconnect(); window.removeEventListener("keydown", onKey); };
  }, []);

  const openProject = (id: string) => window.dispatchEvent(new CustomEvent("sn:open-project", { detail: id }));

  return (
    <section id="universe" ref={root} className={s.universe} aria-labelledby="universe-title">
      <div className={s.head}>
        <ChapterTitle id="universe-title" no="04" file="stack.json" tone="wine">My technical universe</ChapterTitle>
        <p className={s.lede}>
          Every key is something I've used, grouped the way I work. Hover or tap a key to see where it shows up in my projects. On a keyboard, type any letter.
        </p>
      </div>

      <div className={s.layout}>
        <div className={s.screenCol}>
          <div ref={screen} className={s.screen} data-screen data-dark aria-live="polite">
            <div className={s.screenGlass}>
              <div data-screen-content className={s.screenContent}>
                <div className={s.screenLogo}><SkillMark id={current.id} /></div>
                <p className={s.screenGroup}>{current.group}</p>
                <p className={s.screenName}>{current.name}</p>
                {used.length > 0 ? (
                  <div className={s.screenUsed}>
                    <p>Shows up in</p>
                    <ul>
                      {used.map((p) => (
                        <li key={p.id}><button type="button" onClick={() => openProject(p.id)} data-cursor="open">{p.title}</button></li>
                      ))}
                    </ul>
                  </div>
                ) : current.note ? (
                  <p className={s.screenNote}>{current.note}</p>
                ) : null}
              </div>
            </div>
            <div className={s.screenFoot}>
              <span className="mono">{String(allSkills.findIndex((x) => x.id === sel) + 1).padStart(2, "0")} / {allSkills.length}</span>
              <span className={s.led} />
            </div>
          </div>
        </div>

        <div className={s.board}>
          {skillGroups.map((g) => (
            <div key={g.id} className={s.row} data-row data-dim={group && group !== g.id ? "true" : undefined}>
              <button type="button" className={s.rowLabel} data-row-label aria-pressed={group === g.id} onClick={() => setGroup((v) => (v === g.id ? null : g.id))}>
                <span className="serif">{g.name}</span>
                <span className={s.count}>{g.skills.length}</span>
              </button>
              <div className={s.keys} role="group" aria-label={g.name}>
                {g.skills.map((k) => (
                  <Keycap
                    key={k.id}
                    data-k={k.id}
                    skill={k.id}
                    size="s"
                    caption={k.name}
                    pressed={sel === k.id}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setSel(k.id)}
                    onFocus={() => setSel(k.id)}
                    onClick={() => setSel(k.id)}
                    aria-label={k.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
