"use client";

import { useRef } from "react";
import { Draggable } from "gsap/Draggable";
import { mediaRoles, crossover, mediaSamples } from "@/content/media";
import { gsap, useScene } from "@/lib/motion";
import { ChapterTitle, Scribble, Star } from "../ui/Bits";
import Photo from "../ui/Photo";
import s from "./media.module.css";

if (typeof window !== "undefined") gsap.registerPlugin(Draggable);

const tilt = [-4, 3, -2, 5];

export default function Media() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ reduced, desktop }) => {
    const q = gsap.utils.selector(root);
    let drags: Draggable[] = [];
    if (desktop) {
      let z = 10;
      drags = Draggable.create(q("[data-clip]"), {
        type: "x,y", bounds: q("[data-desk]")[0], inertia: false,
        onPress() { gsap.set(this.target, { zIndex: ++z }); gsap.to(this.target, { scale: 1.04, rotate: "+=2", duration: 0.3 }); },
        onRelease() { gsap.to(this.target, { scale: 1, duration: 0.5, ease: "back.out(3)" }); },
      });
    }
    if (!reduced) {
      gsap.from(q("[data-clip]"), {
        y: -260, opacity: 0, rotate: () => gsap.utils.random(-30, 30), duration: 1.2, ease: "bounce.out", stagger: 0.15,
        scrollTrigger: { trigger: q("[data-desk]")[0], start: "top 70%", once: true },
      });
      gsap.from(q("[data-statement] span"), {
        yPercent: 110, stagger: 0.08, duration: 1.1,
        scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 80%", once: true },
      });
      q<HTMLElement>("[data-cross]").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%", end: "top 45%", scrub: true } });
        tl.from(row.querySelector("[data-from]"), { xPercent: -20, opacity: 0 })
          .from(row.querySelector(".scribble path"), { strokeDasharray: 1, strokeDashoffset: 1 }, "<0.2")
          .from(row.querySelector("[data-to]"), { xPercent: 20, opacity: 0 }, "<0.3");
      });
    }
    return () => drags.forEach((d) => d.kill());
  });

  return (
    <section id="media" ref={root} className={s.media} aria-labelledby="media-title">
      <div className={s.inner}>
        <div className={s.top}>
          <ChapterTitle id="media-title" no="06" file="media.psd" tone="ink">Marketing, media & creativity</ChapterTitle>
          <p className={s.statement} data-statement>
            <span>Before databases,</span> <span>I learned audiences.</span>
          </p>
          <p className={s.lede}>
            I&apos;ve been marketing something since 2021, when I opened my own online store. Today I lead media for GDG on Campus LIMU and handle social media for Grids Company. It&apos;s the second half of how I work, and it makes the first half better.
          </p>
        </div>

        <div className={s.desk} data-desk>
          <p className={`${s.deskHint} hand`} aria-hidden="true">drag the clippings around</p>
          {mediaRoles.map((r, i) => (
            <article key={r.id} className={`${s.clip} ${s[`c${i}`]}`} data-clip data-cursor="drag" style={{ rotate: `${tilt[i]}deg` }} tabIndex={0} aria-label={`${r.role}, ${r.org}`}>
              <span className="tape" style={{ left: "50%", top: "-0.8rem", translate: "-50% 0", rotate: `${-tilt[i] * 2}deg` }} aria-hidden="true" />
              <p className={s.when}>{r.when}</p>
              <h3 className={s.org}>{r.org}</h3>
              <p className={`${s.role} serif`}>{r.role}</p>
              <ul className={s.points}>{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </article>
          ))}
          <figure className={`polaroid ${s.pola}`} data-clip data-cursor="drag" aria-label="Photo: Sabreen at a tech event">
            <span className="tape" style={{ left: "1rem", top: "-0.7rem", rotate: "-20deg" }} aria-hidden="true" />
            <Photo id="eventHall" sizes="260px" position="50% 30%" />
            <figcaption>event day</figcaption>
          </figure>
          <span className={s.star1} aria-hidden="true"><Star /></span>
          <span className={s.star2} aria-hidden="true"><Star fill="#7b1e3a" /></span>
        </div>

        <div className={s.cross}>
          <h3 className={s.crossHead}>What the media side gives my code</h3>
          {crossover.map((c) => (
            <p key={c.from} className={s.crossRow} data-cross>
              <span data-from className={s.from}>{c.from}</span>
              <Scribble variant="swoop" className={s.crossArrow} />
              <span data-to className={`${s.to} serif`}>{c.to}</span>
            </p>
          ))}
        </div>

        {mediaSamples.length > 0 && (
          <div className={s.samples}>
            {mediaSamples.map((m) => (
              <figure key={m.src} className="polaroid">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt={m.alt} loading="lazy" />
                {m.caption && <figcaption>{m.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
