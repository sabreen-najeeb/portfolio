"use client";

import { useEffect, useRef } from "react";
import { journey, type JourneyEntry } from "@/content/journey";
import { gsap, useScene, ScrollTrigger } from "@/lib/motion";
import { ChapterTitle } from "../ui/Bits";
import Photo from "../ui/Photo";
import s from "./journey.module.css";

const worldLabel = { eng: "engineering", media: "media", both: "both worlds" } as const;

function Entry({ e }: { e: JourneyEntry }) {
  if (e.kind === "stamp")
    return (
      <div className={s.stamp}>
        <svg viewBox="0 0 200 200" className={s.stampRing} aria-hidden="true">
          <defs><path id={`c-${e.id}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
          <text><textPath href={`#c-${e.id}`}>{`certified · ${e.where} · ${e.when} · `}</textPath></text>
        </svg>
        <div className={s.stampCore}>
          <p className={s.stampTitle}>{e.title}</p>
        </div>
      </div>
    );
  if (e.kind === "ticket")
    return (
      <div className={s.ticket}>
        <div className={s.ticketMain}>
          <p className={`${s.ticketTop} mono`}><span>admit one</span><span>{e.when}</span></p>
          <p className={s.ticketTitle}>{e.title}</p>
          {e.where && <p className={s.ticketWhere}>{e.where}</p>}
          {e.body && <p className={s.body}>{e.body}</p>}
        </div>
        <div className={s.ticketStub} aria-hidden="true"><span className="mono">{e.year}</span></div>
      </div>
    );
  return (
    <div className={s.card}>
      <p className={`${s.cardWhen} hand`}>{e.when}</p>
      <p className={s.cardTitle}>{e.title}</p>
      {e.where && <p className={s.cardWhere}>{e.where}</p>}
      {e.body && <p className={s.body}>{e.body}</p>}
    </div>
  );
}

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const years = Array.from(new Set(journey.map((j) => j.year)));

  // Draw a hand-made thread through every entry, recomputed on resize.
  useEffect(() => {
    const build = () => {
      const wrap = root.current?.querySelector<HTMLElement>("[data-list]");
      const path = pathRef.current;
      if (!wrap || !path) return;
      const box = wrap.getBoundingClientRect();
      const pts = Array.from(wrap.querySelectorAll<HTMLElement>("[data-entry]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + 24 };
      });
      if (pts.length < 2) return;
      let d = `M${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const my = (a.y + b.y) / 2;
        d += ` C${a.x + (i % 2 ? 120 : -120)},${my} ${b.x + (i % 2 ? -120 : 120)},${my} ${b.x},${b.y}`;
      }
      path.setAttribute("d", d);
      path.parentElement!.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      ScrollTrigger.refresh();
    };
    build();
    const ro = new ResizeObserver(build);
    if (root.current) ro.observe(root.current);
    return () => ro.disconnect();
  }, []);

  useScene(root, ({ reduced }) => {
    const q = gsap.utils.selector(root);
    const digits = q<HTMLElement>("[data-digit]");
    const setYear = (y: string) => {
      const last = y.slice(2);
      digits.forEach((d, i) => gsap.to(d, { yPercent: -parseInt(last[i], 10) * 10, duration: reduced ? 0 : 0.9, ease: "expo.out" }));
      q<HTMLElement>("[data-year-tag]").forEach((t) => t.setAttribute("aria-current", t.dataset.yearTag === y ? "true" : "false"));
    };
    setYear(journey[0].year);
    q<HTMLElement>("[data-entry]").forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (self) => self.isActive && setYear(el.dataset.year!) });
    });
    if (reduced) return;
    gsap.fromTo(pathRef.current, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: q("[data-list]")[0], start: "top 60%", end: "bottom 60%", scrub: true } });
    q<HTMLElement>("[data-entry]").forEach((el, i) => {
      gsap.from(el.firstElementChild, {
        y: 80, rotate: i % 2 ? 8 : -8, opacity: 0, duration: 1.2, ease: "back.out(1.4)",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
  });

  return (
    <section id="journey" ref={root} className={s.journey} aria-labelledby="journey-title">
      <div className={s.inner}>
        <aside className={s.side}>
          <ChapterTitle id="journey-title" no="07" file="journey.log" tone="wine">Beyond the classroom</ChapterTitle>
          <div className={s.year} aria-hidden="true">
            <span className={s.fixed}>20</span>
            {[0, 1].map((i) => (
              <span key={i} className={s.digitWin}>
                <span data-digit className={s.digitCol} style={{ transform: `translateY(-${parseInt(journey[0].year.slice(2)[i], 10) * 10}%)` }}>{Array.from({ length: 10 }, (_, n) => <span key={n}>{n}</span>)}</span>
              </span>
            ))}
          </div>
          <ol className={s.years} aria-label="Years">
            {years.map((y) => <li key={y} data-year-tag={y} className="mono">{y}</li>)}
          </ol>
          <p className={s.legend}>
            <span><i className={s.dotEng} /> engineering</span>
            <span><i className={s.dotMedia} /> media</span>
            <span><i className={s.dotBoth} /> both</span>
          </p>
        </aside>

        <div className={s.listWrap} data-list>
          <svg className={s.thread} preserveAspectRatio="none" aria-hidden="true">
            <path ref={pathRef} pathLength={1} />
          </svg>
          <ol className={s.list}>
            {journey.map((e, i) => (
              <li key={e.id} data-entry data-year={e.year} className={`${s.item} ${i % 2 ? s.right : s.left} ${s[`w_${e.world}`]}`} aria-label={`${e.when}: ${e.title} (${worldLabel[e.world]})`}>
                <Entry e={e} />
              </li>
            ))}
            <li data-entry data-year="2026" className={`${s.item} ${s.left}`}>
              <figure className={`polaroid ${s.snap}`}>
                <span className="tape" style={{ right: "1rem", top: "-0.7rem", rotate: "18deg" }} aria-hidden="true" />
                <Photo id="eventTalk" sizes="(min-width: 900px) 34vw, 86vw" />
                <figcaption>at the podium</figcaption>
              </figure>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
