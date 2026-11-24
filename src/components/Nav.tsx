"use client";

import { useEffect, useRef, useState } from "react";
import { chapters, links, profile } from "@/content/site";
import { useLenis, scrollToTarget } from "./SmoothScroll";
import { gsap, ScrollTrigger } from "@/lib/motion";
import s from "./nav.module.css";

/** Fixed monogram, file-tree menu and a pencil-line scroll progress. */
export default function Nav({ visibleChapters }: { visibleChapters: string[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hello");
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const list = chapters.filter((c) => visibleChapters.includes(c.id));

  useEffect(() => {
    const triggers = list.map((c) =>
      ScrollTrigger.create({
        trigger: `#${c.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActive(c.id),
      }),
    );
    const prog = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(progress.current, { scaleY: self.progress }),
    });
    return () => { triggers.forEach((t) => t.kill()); prog.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleChapters.join()]);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (open) {
      lenis?.stop();
      gsap.fromTo(el, { clipPath: "circle(0% at calc(100% - 3rem) 2.6rem)" }, { clipPath: "circle(150% at calc(100% - 3rem) 2.6rem)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll("li"), { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.04, delay: 0.25, duration: 0.8 });
      el.querySelector<HTMLAnchorElement>("a")?.focus();
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else {
      lenis?.start();
    }
  }, [open, lenis]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToTarget(lenis, `#${id}`), 60);
  };

  return (
    <>
      <header className={s.bar}>
        <a href="#hello" onClick={go("hello")} className={s.mono} aria-label={`${profile.firstName} ${profile.lastName}, back to top`}>
          <span className="display">S</span><span className="display">n</span>
        </a>
        <p className={s.now} aria-live="polite">
          <span className="mono">~/sabreen/</span>
          <span className="mono">{chapters.find((c) => c.id === active)?.file}</span>
        </p>
        <button ref={toggle} className={s.toggle} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((v) => !v)} data-cursor={open ? "close" : "menu"}>
          <span className={s.toggleText}>{open ? "Close" : "Menu"}</span>
          <span className={`${s.burger} ${open ? s.burgerOpen : ""}`} aria-hidden="true"><i /><i /></span>
        </button>
      </header>

      <div className={s.progress} aria-hidden="true"><div ref={progress} className={s.progressFill} /></div>

      <div id="site-menu" ref={panel} className={s.panel} hidden={!open} data-dark>
        <nav aria-label="Chapters">
          <p className={`${s.tree} mono`}>~/sabreen</p>
          <ol className={s.list}>
            {list.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} onClick={go(c.id)} aria-current={active === c.id ? "true" : undefined}>
                  <span className={`${s.branch} mono`}>{i === list.length - 1 ? "└──" : "├──"}</span>
                  <span className={s.label}>{c.label}</span>
                  <span className={`${s.file} mono`}>{c.file}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={s.panelFoot}>
          <a href={`mailto:${links.email}`}>{links.email}</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </>
  );
}
