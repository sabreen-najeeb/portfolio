"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { skillById } from "@/content/skills";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { SkillMark, Sphere } from "../ui/Bits";
import Diagram from "../ui/Diagram";
import s from "./case.module.css";

/** Full-screen case study. Native <dialog> gives focus trapping and Escape for free. */
export default function CaseStudy({ project, origin, onClose }: { project: Project | null; origin: { x: number; y: number }; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [live, setLive] = useState(false);
  const lenis = () => (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project) {
      setLive(false);
      if (!d.open) d.showModal();
      lenis()?.stop();
      document.documentElement.style.overflow = "hidden";
      d.scrollTop = 0;
      if (!prefersReducedMotion()) {
        const at = `${origin.x}px ${origin.y}px`;
        gsap.fromTo(d, { clipPath: `circle(0% at ${at})` }, { clipPath: `circle(150% at ${at})`, duration: 0.95, ease: "expo.inOut" });
        gsap.from(d.querySelectorAll("[data-in]"), { y: 40, opacity: 0, stagger: 0.06, duration: 0.9, delay: 0.35 });
      }
    }
  }, [project, origin]);

  const close = () => {
    const d = ref.current;
    if (!d) return;
    const done = () => { d.close(); lenis()?.start(); document.documentElement.style.overflow = ""; onClose(); };
    if (prefersReducedMotion()) return done();
    gsap.to(d, { clipPath: `circle(0% at ${origin.x}px ${origin.y}px)`, duration: 0.7, ease: "expo.inOut", onComplete: done });
  };

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      aria-labelledby="case-title"
      onCancel={(e) => { e.preventDefault(); close(); }}
      data-lenis-prevent
    >
      {project && (
        <div className={s.inner}>
          <button type="button" className={s.close} onClick={close} data-cursor="close" aria-label="Close case study">
            <span aria-hidden="true">×</span>
          </button>

          <header className={s.head} data-in>
            <p className={s.kicker}>{project.context} · {project.year}</p>
            <h2 id="case-title" className={s.title}>{project.title}<Sphere tone="pink" /></h2>
            <p className={s.sub}>{project.subtitle}</p>
          </header>

          <div className={s.cols}>
            <div className={s.main}>
              <section data-in>
                <h3 className={s.h}>The idea</h3>
                <p className={s.lead}>{project.pitch}</p>
                <p>{project.purpose}</p>
              </section>

              <section data-in>
                <h3 className={s.h}>What I did</h3>
                <p className={s.role}>{project.role}</p>
                <ul className={s.list}>{project.contribution.map((c) => <li key={c}>{c}</li>)}</ul>
              </section>

              <section data-in>
                <h3 className={s.h}>Key features</h3>
                <ul className={s.features}>{project.features.map((f) => <li key={f}>{f}</li>)}</ul>
              </section>

              <section data-in className={s.diagram}>
                <Diagram id={project.diagram} />
              </section>

              {project.screens && project.screens.length > 0 && (
                <section data-in>
                  <h3 className={s.h}>Screens</h3>
                  <div className={s.screens}>
                    {project.screens.map((sc) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={sc.src} src={sc.src} alt={sc.alt} loading="lazy" />
                    ))}
                  </div>
                </section>
              )}

              {project.live && (
                <section data-in className={s.liveWrap}>
                  <h3 className={s.h}>Try it here</h3>
                  <div className={s.browser}>
                    <div className={s.bar}><i /><i /><i /><span className="mono">{project.live.replace("https://", "")}</span></div>
                    {live ? (
                      <iframe src={project.live} title={`${project.title} live demo`} loading="lazy" className={s.frame} referrerPolicy="no-referrer" />
                    ) : (
                      <div className={s.livePrompt}>
                        <p>This loads the real, deployed app inside the page.</p>
                        <button type="button" className="btn" onClick={() => setLive(true)}>Load live app</button>
                      </div>
                    )}
                  </div>
                  <p className={s.liveNote}>If the preview stays blank, the app may block embedding. <a href={project.live} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
                </section>
              )}
            </div>

            <aside className={s.side} data-in>
              <h3 className={s.h}>Stack</h3>
              <ul className={s.stack}>
                {project.stack.map((id) => (
                  <li key={id}><SkillMark id={id} /><span>{skillById(id)?.name}</span></li>
                ))}
              </ul>
              <div className={s.links}>
                {project.live && <a className="btn" href={project.live} target="_blank" rel="noreferrer">Live demo</a>}
                {project.repo && <a className="btn btn--ghost" href={project.repo} target="_blank" rel="noreferrer">GitHub repository</a>}
              </div>
            </aside>
          </div>
        </div>
      )}
    </dialog>
  );
}
