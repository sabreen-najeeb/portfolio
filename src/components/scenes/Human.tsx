"use client";

import { useRef } from "react";
import { copy, profile } from "@/content/site";
import { gsap, useScene, splitWords } from "@/lib/motion";
import { ChapterTitle, Scribble, Star } from "../ui/Bits";
import Photo from "../ui/Photo";
import s from "./human.module.css";

export default function Human() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ reduced, desktop }) => {
    const q = gsap.utils.selector(root);
    const words = splitWords(q("[data-intro]")[0]);
    if (reduced) return;

    // "Hello!" types itself, like the reference.
    const hello = q<HTMLElement>("[data-hello]")[0];
    const full = hello.textContent ?? "";
    const state = { n: 0 };
    gsap.timeline({ scrollTrigger: { trigger: hello, start: "top 80%", once: true } })
      .set(hello, { textContent: "" })
      .to(state, { n: full.length, duration: 0.8, ease: `steps(${full.length})`, onUpdate: () => { hello.textContent = full.slice(0, Math.round(state.n)); } });

    // Paragraph fills word by word as you read.
    gsap.fromTo(words, { color: "rgba(34,28,31,.22)" }, {
      color: "rgba(34,28,31,1)", stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: q("[data-intro]")[0], start: "top 75%", end: "bottom 45%", scrub: true },
    });

    // The instant camera prints the photo, then it develops.
    const print = gsap.timeline({ scrollTrigger: { trigger: q("[data-camera]")[0], start: "top 65%", once: true } });
    print
      .from(q("[data-camera]"), { y: 60, rotate: -8, opacity: 0, duration: 1, ease: "back.out(1.6)" })
      .to(q("[data-flash]"), { opacity: 1, duration: 0.06, yoyo: true, repeat: 1 }, "+=0.1")
      .fromTo(q("[data-print]"), { yPercent: -102 }, { yPercent: 0, duration: 1.6, ease: "power1.inOut" }, "+=0.1")
      .fromTo(q("[data-print] img"), { filter: "grayscale(1) brightness(2.6) contrast(.6) blur(4px)" }, { filter: "grayscale(1) sepia(0.18) contrast(1.12) brightness(1.04) blur(0px)", duration: 2.4, ease: "power2.out", clearProps: "filter" }, "-=0.4")
      .from(q("[data-annot]"), { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "power2.inOut" }, "-=1.6")
      .from(q("[data-annot-arrow] path"), { strokeDasharray: 1, strokeDashoffset: 1, duration: 0.8 }, "-=1.2");

    // Name badge swings on its lanyard with scroll velocity.
    const badge = q("[data-badge]")[0];
    gsap.from(badge, { yPercent: -60, rotate: 14, opacity: 0, duration: 1.6, ease: "elastic.out(1, 0.45)", scrollTrigger: { trigger: badge, start: "top 85%", once: true } });
    if (desktop) {
      const rot = gsap.quickTo(badge, "rotate", { duration: 0.9, ease: "elastic.out(1, 0.3)" });
      gsap.to({}, {
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", onUpdate: (self) => rot(gsap.utils.clamp(-12, 12, self.getVelocity() / -180)) },
      });
    }
  });

  return (
    <section id="human" ref={root} className={s.human} aria-labelledby="human-title">
      <div className={s.grid}>
        <div className={s.text}>
          <ChapterTitle id="human-title" no="02" file="human.md" tone="wine">The human behind the code</ChapterTitle>
          <p className={s.hello}>
            <span data-hello className="serif">{copy.human.hello}</span>
            <span className={s.caret} aria-hidden="true" />
          </p>
          <p data-intro className={s.intro}>{copy.human.intro}</p>
        </div>

        <div className={s.objects}>
          <div className={s.camera} data-camera aria-hidden="true">
            <div className={s.camBody}>
              <span className={s.camFlash}><span data-flash className={s.camFlashOn} /></span>
              <span className={s.camWindow} />
              <span className={s.camLens}><span /></span>
              <span className={s.camStripe} />
              <span className={`${s.camBrand} serif`}>sn.</span>
            </div>
            <div className={s.slot} />
          </div>
          <div className={s.printOut}>
            <figure className={`polaroid ${s.print}`} data-print>
              <Photo id="candid" sizes="(min-width: 900px) 22vw, 60vw" />
              <figcaption>behind the lens</figcaption>
            </figure>
          </div>
          <p className={`${s.annot} hand`} data-annot>{copy.human.photoNote}</p>
          <span data-annot-arrow className={s.annotArrow}><Scribble variant="swoop" /></span>

          <div className={s.badge} data-badge>
            <span className={s.lanyard} aria-hidden="true" />
            <div className={s.badgeCard}>
              <p className={s.badgeHello}><span className="display">HELLO</span><span>my name is</span></p>
              <div className={s.badgeBody}>
                <Photo id="studio" sizes="160px" className={s.badgePhoto} position="50% 22%" />
                <div>
                  <p className={`${s.badgeName} hand`}>{profile.firstName}</p>
                  <dl className={s.badgeFacts}>
                    <div><dt>Studying</dt><dd>Software Engineering (BSc IT)</dd></div>
                    <div><dt>At</dt><dd>{profile.universityShort}, {profile.studyYears}</dd></div>
                    <div><dt>Average</dt><dd>{profile.average}</dd></div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <span className={s.star} aria-hidden="true"><Star /></span>
        </div>
      </div>
    </section>
  );
}
