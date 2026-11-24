"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/content/projects";
import { gsap, useScene } from "@/lib/motion";
import { ChapterTitle, SkillMark, Star } from "../ui/Bits";
import Diagram from "../ui/Diagram";
import CaseStudy from "./CaseStudy";
import s from "./built.module.css";

function Extra({ p }: { p: Project }) {
  if (p.id === "flight")
    return (
      <div className={s.pass} aria-hidden="true">
        <div className={s.passMain}>
          <p className={s.passHead}><span className="display">Boarding</span><span className="mono">PHP · MySQL</span></p>
          <dl>
            <div><dt>Passenger</dt><dd>Guest / User / Admin</dd></div>
            <div><dt>Gate</dt><dd>Role-based access</dd></div>
            <div><dt>Seat</dt><dd>CRUD</dd></div>
            <div><dt>Forecast</dt><dd>Live, via API</dd></div>
          </dl>
        </div>
        <div className={s.passStub}><span className="mono">2026</span></div>
      </div>
    );
  if (p.id === "cloudscale")
    return (
      <div className={s.termTag} aria-hidden="true">
        <span className="mono">$ curl /health</span>
        <span className="mono">{"{ \"status\": \"ok\" } 200"}</span>
      </div>
    );
  if (p.id === "nona")
    return (
      <div className={s.bilingual} aria-hidden="true">
        <span className="serif">Hello</span>
        <span className={s.ar} lang="ar" dir="rtl">مرحبا</span>
      </div>
    );
  return (
    <div className={s.frameTag} aria-hidden="true">
      <span className="mono">{"<Booking />"}</span>
      <span className="mono">{"<Faculty />"}</span>
    </div>
  );
}

export default function Built() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const origin = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: Event) => {
      const p = projects.find((x) => x.id === (e as CustomEvent<string>).detail);
      if (p) { origin.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; setOpen(p); }
    };
    window.addEventListener("sn:open-project", h);
    return () => window.removeEventListener("sn:open-project", h);
  }, []);

  useScene(root, ({ reduced, desktop }) => {
    const q = gsap.utils.selector(root);
    if (reduced) return;
    if (!desktop) {
      q<HTMLElement>("[data-panel]").forEach((panel) => {
        gsap.from(panel.querySelector("[data-visual]"), { yPercent: 12, rotate: 3, opacity: 0, duration: 1.2, scrollTrigger: { trigger: panel, start: "top 80%", once: true } });
      });
      return;
    }

    const track = q<HTMLElement>("[data-track]")[0];
    const dist = () => track.scrollWidth - window.innerWidth;
    const scroller = gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: q("[data-pin]")[0], start: "top top", end: () => `+=${dist()}`, scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
    });

    // Inside the horizontal track: each panel's pieces arrive at their own speed.
    q<HTMLElement>("[data-panel]").forEach((panel) => {
      const st = { trigger: panel, containerAnimation: scroller, start: "left 85%", end: "left 15%", scrub: true };
      gsap.from(panel.querySelector("[data-visual]"), { yPercent: 18, rotate: 6, scale: 0.9, ease: "none", scrollTrigger: st });
      gsap.from(panel.querySelector("[data-big]"), { xPercent: 30, ease: "none", scrollTrigger: st });
      gsap.from(panel.querySelectorAll("[data-stack] > *"), { y: 40, opacity: 0, stagger: 0.05, ease: "none", scrollTrigger: { ...st, end: "left 30%" } });
      gsap.from(panel.querySelector("[data-extra]"), { y: -80, rotate: -18, opacity: 0, ease: "none", scrollTrigger: { ...st, start: "left 60%", end: "left 20%" } });
      gsap.fromTo(panel.querySelectorAll(".diagram-edge"), { strokeDashoffset: 1, strokeDasharray: "1 1" }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { ...st, start: "left 70%", end: "left 25%" } });
    });
    gsap.to(q("[data-progress]"), { scaleX: 1, ease: "none", scrollTrigger: { trigger: q("[data-pin]")[0], start: "top top", end: () => `+=${dist()}`, scrub: true } });
  });

  const openCase = (p: Project) => (e: React.MouseEvent) => {
    origin.current = { x: e.clientX, y: e.clientY };
    setOpen(p);
  };

  return (
    <section id="built" ref={root} className={s.built} aria-labelledby="built-title">
      <div className={s.pin} data-pin>
        <div className={s.track} data-track>
          <div className={s.intro}>
            <ChapterTitle id="built-title" no="05" file="projects/" tone="wine">Things I have built</ChapterTitle>
            <p className={s.introText}>
              Four projects, four different problems: an AI product I built alone, a cloud pipeline with my team, a booking system with three kinds of users, and a university archive in progress.
            </p>
            <p className={`${s.introHint} hand`}>keep scrolling, the exhibition moves sideways</p>
            <span className={s.introStar}><Star /></span>
          </div>

          {projects.map((p, i) => (
            <article key={p.id} id={`project-${p.id}`} className={`${s.panel} ${s[`tone_${p.tone}`]}`} data-panel aria-labelledby={`p-${p.id}`} {...(p.tone === "ink" || p.tone === "wine" ? { "data-dark": "" } : {})}>
              <p className={`${s.big} display`} data-big aria-hidden="true">{p.title}</p>
              <div className={s.info}>
                <p className={s.meta}>
                  <span className={s.idx}>{i + 1}/{projects.length}</span>
                  <span>{p.year}</span>
                  <span>{p.context}</span>
                </p>
                <h3 id={`p-${p.id}`} className={s.title}>{p.title}</h3>
                <p className={s.subtitle}>{p.subtitle}</p>
                <p className={s.pitch}>{p.pitch}</p>
                <p className={s.role}><span>My role</span> {p.role}</p>
                <ul className={s.stack} data-stack aria-label="Technology stack">
                  {p.stack.map((id) => <li key={id}><SkillMark id={id} /></li>)}
                </ul>
                <div className={s.actions}>
                  <button type="button" className="btn" onClick={openCase(p)} data-cursor="open">Open case study</button>
                  {p.live && <a className="btn btn--ghost" href={p.live} target="_blank" rel="noreferrer">Live demo</a>}
                  {p.repo && <a className="btn btn--ghost" href={p.repo} target="_blank" rel="noreferrer">GitHub</a>}
                </div>
              </div>
              <div className={s.visual} data-visual>
                <div className={s.window}>
                  <div className={s.windowBar} aria-hidden="true"><i /><i /><i /><span className="mono">{p.id}.architecture</span></div>
                  <div className={s.windowBody}><Diagram id={p.diagram} /></div>
                </div>
                <div className={s.extra} data-extra><Extra p={p} /></div>
              </div>
            </article>
          ))}
          <div className={s.end} aria-hidden="true">
            <p className="hand">more on the way…</p>
          </div>
        </div>
        <div className={s.progress} aria-hidden="true"><span data-progress /></div>
      </div>

      <CaseStudy project={open} origin={origin.current} onClose={() => setOpen(null)} />
    </section>
  );
}
