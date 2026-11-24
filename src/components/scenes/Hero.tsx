"use client";

import { useEffect, useRef } from "react";
import { copy, profile } from "@/content/site";
import { photos, srcSet, src } from "@/content/photos";
import { gsap, useScene, splitChars } from "@/lib/motion";
import { INTRO_EVENT, introDone } from "../Loader";
import Keycap from "../ui/Keycap";
import { Beads, Scribble, Sphere, Star } from "../ui/Bits";
import s from "./hero.module.css";

const floaters = [
  { skill: "nextjs", cls: s.k1, depth: 1.4, out: [-60, -40] },
  { skill: "typescript", cls: s.k2, depth: 0.8, out: [-50, 30] },
  { skill: "supabase", cls: s.k3, depth: 1.1, out: [60, -50] },
  { skill: "gemini", cls: s.k4, depth: 1.6, out: [55, 35] },
  { skill: "figma", cls: s.k5, depth: 0.6, out: [-20, 60] },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const cut = photos.cutout;

  useScene(root, ({ reduced, desktop }) => {
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const l1 = splitChars(q("[data-l1]")[0]);
    const l2 = splitChars(q("[data-l2]")[0]);

    if (reduced) return;

    // 1. Opening choreography, played when the loader lifts.
    const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
    intro
      .from(q("[data-portrait]"), { yPercent: 35, opacity: 0, scale: 0.92, duration: 1.6 }, 0)
      .from(l1, { yPercent: 130, rotate: () => gsap.utils.random(-25, 25), duration: 1.4, stagger: 0.045, ease: "back.out(1.6)" }, 0.15)
      .from(l2, { yPercent: 130, rotate: () => gsap.utils.random(-25, 25), duration: 1.4, stagger: 0.045, ease: "back.out(1.6)" }, 0.3)
      .from(q("[data-key]"), { scale: 0, rotate: () => gsap.utils.random(-90, 90), duration: 1.1, stagger: 0.08, ease: "back.out(2)" }, 0.6)
      .from(q("[data-note]"), { clipPath: "inset(0 100% 0 0)", duration: 1.2, stagger: 0.25, ease: "power2.inOut" }, 0.9)
      .from(q(".scribble path"), { strokeDashoffset: 1, strokeDasharray: 1, duration: 1, ease: "power2.inOut" }, 1.3)
      .from(q(".bead"), { y: -120, opacity: 0, duration: 1, stagger: 0.05, ease: "bounce.out" }, 1)
      .from(q("[data-sticker]"), { scale: 0, rotate: -40, duration: 0.9, ease: "back.out(2.4)" }, 1.4)
      .from(q("[data-star]"), { scale: 0, rotate: 180, duration: 0.9, stagger: 0.1, ease: "back.out(3)" }, 1.5)
      .from(q("[data-foot]"), { yPercent: 100, opacity: 0, duration: 0.9, stagger: 0.1 }, 1.2);

    const play = () => intro.play(0);
    if (introDone()) intro.progress(1);
    else window.addEventListener(INTRO_EVENT, play, { once: true });
    const replay = () => intro.play(0);
    window.addEventListener("sn:replay", replay);

    // 2. Idle float on the keycaps.
    q("[data-key-float]").forEach((k, i) =>
      gsap.to(k, { y: "+=14", rotate: i % 2 ? 4 : -4, duration: 2.4 + i * 0.3, yoyo: true, repeat: -1, ease: "sine.inOut" }),
    );

    // 3. Pointer parallax by depth layer.
    const layers = q<HTMLElement>("[data-depth]").map((n) => ({
      n,
      d: parseFloat(n.dataset.depth || "1"),
      x: gsap.quickTo(n, "x", { duration: 1.2, ease: "power3" }),
      y: gsap.quickTo(n, "y", { duration: 1.2, ease: "power3" }),
    }));
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => { l.x(nx * 40 * l.d); l.y(ny * 30 * l.d); });
    };
    if (desktop) window.addEventListener("pointermove", onMove);

    // 4. Scroll: the composition comes apart and hands over to the next scene.
    const out = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top top", end: desktop ? "+=110%" : "bottom top", scrub: 0.8, pin: desktop ? q("[data-stage]")[0] : false },
      defaults: { ease: "none" },
    });
    out.to(q("[data-l1]"), { xPercent: -45, rotate: -6 }, 0)
      .to(q("[data-l2]"), { xPercent: 45, rotate: 4 }, 0)
      .to(q("[data-portrait]"), { scale: 0.72, yPercent: -6, rotate: -3 }, 0)
      .to(q("[data-note], [data-foot], .scribble, [data-beads]"), { opacity: 0, y: -40 }, 0)
      .to(q("[data-key]"), { xPercent: (i) => floaters[i].out[0] * 6, yPercent: (i) => floaters[i].out[1] * 6, rotate: (i) => (i % 2 ? 90 : -90), opacity: 0 }, 0)
      .to(q("[data-sticker], [data-star]"), { scale: 0, rotate: 90 }, 0.1)
      .to(q("[data-handoff]"), { scale: 1, duration: 0.6 }, 0.35);

    return () => {
      window.removeEventListener(INTRO_EVENT, play);
      window.removeEventListener("sn:replay", replay);
      window.removeEventListener("pointermove", onMove);
    };
  });

  // Keep pinned layout correct after the portrait loads.
  useEffect(() => {
    const img = root.current?.querySelector("img");
    if (img && !img.complete) img.addEventListener("load", () => import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger.refresh()), { once: true });
  }, []);

  return (
    <section id="hello" ref={root} className={s.hero} aria-labelledby="hero-name">
      <div className={s.stage} data-stage>
        <p className={`${s.noteTop} hand`} data-note data-depth="0.3">{copy.hero.noteTop}</p>
        <p className={`${s.noteSide} hand`} data-note data-depth="0.5">{copy.hero.noteSide}</p>
        <Scribble className={s.arrow} variant="loop" />
        <span className={`${s.thisIs} hand`} data-note>this is</span>

        <h1 id="hero-name" className={s.name}>
          <span className={`${s.l1} display`} data-l1>{profile.firstName}</span>
          <span className={`${s.l2} display`} data-l2>{profile.lastName}</span>
          <span className="sr-only">, {profile.roleLong}</span>
        </h1>

        <div className={s.portraitWrap} data-portrait>
          <div className={s.portraitSticker} data-depth="0.25">
            <div className={s.portraitMask} style={{ WebkitMaskImage: `url(${src(cut, 700)})`, maskImage: `url(${src(cut, 700)})` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(cut, 1300)} srcSet={srcSet(cut)} sizes="(min-width: 900px) 40vw, 80vw" width={cut.w} height={cut.h} alt={cut.alt} fetchPriority="high" decoding="async" draggable={false} />
              <span className={s.halftone} aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className={s.beads} data-beads data-depth="0.9">
          <Beads word="HELLO WORLD" curve={16} />
        </div>

        {floaters.map((f) => (
          <div key={f.skill} className={`${s.key} ${f.cls}`} data-key data-depth={f.depth}>
            <div data-key-float>
              <Keycap skill={f.skill} size="m" decorative />
            </div>
          </div>
        ))}

        <p className={s.sticker} data-sticker data-depth="1.2">
          <span className="serif">{copy.hero.sticker}</span>
          <Sphere tone="wine" />
        </p>
        <span data-star className={`${s.star} ${s.star1}`} data-depth="1.8"><Star /></span>
        <span data-star className={`${s.star} ${s.star2}`} data-depth="0.7"><Star fill="#f4a6c6" /></span>
        <span data-star className={`${s.star} ${s.star3}`} data-depth="1.3"><Star /></span>

        <p className={s.role} data-foot>{profile.role}<br />& full-stack developer</p>
        <p className={s.place} data-foot>{profile.city}, {profile.country}<br />{profile.universityShort}, {profile.studyYears.replace(" – present", " →")}</p>
        <p className={`${s.cue} mono`} data-foot aria-hidden="true">scroll ↓</p>

        <span className={s.handoff} data-handoff aria-hidden="true" />
      </div>
    </section>
  );
}
