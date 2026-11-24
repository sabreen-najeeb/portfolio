"use client";

import { useEffect, useRef, useState } from "react";
import { copy, links, profile } from "@/content/site";
import { gsap, useScene, splitChars } from "@/lib/motion";
import { useLenis, scrollToTarget } from "../SmoothScroll";
import { ChapterTitle, Star, useMagnetic } from "../ui/Bits";
import s from "./connect.module.css";

function Chip({ href, label, sub, className, external }: { href: string; label: string; sub?: string; className: string; external?: boolean }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.4);
  return (
    <a ref={ref} href={href} className={`${s.chip} ${className}`} data-chip {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      <span className={s.chipLabel}>{label}</span>
      {sub && <span className={s.chipSub}>{sub}</span>}
    </a>
  );
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timezone }).format(new Date()));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}

export default function Connect() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);

  useScene(root, ({ reduced, desktop }) => {
    const q = gsap.utils.selector(root);
    const big = q<HTMLElement>("[data-sig]")[0];
    const chars = splitChars(big);
    if (reduced) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: q("[data-env-wrap]")[0], start: desktop ? "top 70%" : "top 85%", end: desktop ? "bottom 60%" : "bottom 80%", scrub: 1 },
    });
    tl.from(q("[data-wrap-a]"), { xPercent: -30, opacity: 0 }, 0)
      .from(q("[data-wrap-b]"), { xPercent: 30, opacity: 0 }, 0)
      .to(q("[data-flap]"), { rotateX: 180, ease: "power2.inOut" }, 0.15)
      .set(q("[data-flap]"), { zIndex: 0 }, 0.45)
      .fromTo(q("[data-letter]"), { yPercent: 0 }, { yPercent: desktop ? -62 : -48, ease: "power2.out" }, 0.45)
      .from(q("[data-chip]"), { scale: 0, rotate: () => gsap.utils.random(-40, 40), stagger: 0.06, ease: "back.out(2)" }, 0.6);

    // Chips drift in slow orbits, like the reference's floating contact pills.
    q<HTMLElement>("[data-chip]").forEach((c, i) => {
      gsap.to(c.parentElement ?? c, { y: i % 2 ? 14 : -14, x: i % 3 ? 8 : -8, duration: 2.6 + i * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
    });

    // Signature letters bounce on hover.
    chars.forEach((ch) => {
      ch.addEventListener("pointerenter", () => gsap.fromTo(ch, { yPercent: 0, scaleY: 1 }, { keyframes: [{ yPercent: -18, scaleY: 1.1, duration: 0.18 }, { yPercent: 0, scaleY: 0.86, duration: 0.14 }, { scaleY: 1, duration: 0.4, ease: "elastic.out(1,0.4)" }] }));
    });
    gsap.from(chars, { yPercent: 100, stagger: 0.04, duration: 1.2, ease: "back.out(1.6)", scrollTrigger: { trigger: big, start: "top 95%", once: true } });

    gsap.to(q("[data-marquee]"), { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
  });

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(links.email); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { /* clipboard blocked: mailto link still works */ }
  };

  const toTop = () => {
    scrollToTarget(lenis, 0);
    setTimeout(() => window.dispatchEvent(new Event("sn:replay")), 1500);
  };

  const marquee = [...copy.connect.marquee, ...copy.connect.marquee];

  return (
    <section id="connect" ref={root} className={s.connect} aria-labelledby="connect-title">
      <div className={s.inner}>
        <ChapterTitle id="connect-title" no="10" file="contact.eml" tone="pink">Let&apos;s connect</ChapterTitle>

        <div className={s.envWrap} data-env-wrap>
          <p className={`${s.wrapA}`} data-wrap-a aria-hidden="true">{copy.connect.headlineA}</p>
          <p className={`${s.wrapB}`} data-wrap-b aria-hidden="true">{copy.connect.headlineB}</p>
          <span className="sr-only">{copy.connect.headlineA} {copy.connect.headlineB}</span>

          <div className={s.env}>
            <div className={s.envBack} aria-hidden="true" />
            <div className={s.letter} data-letter>
              <div className={`${s.letterInner} hand`}>
                {copy.connect.letter.map((l) => <p key={l}>{l}</p>)}
              </div>
            </div>
            <div className={s.envFront} aria-hidden="true" />
            <div className={s.flap} data-flap aria-hidden="true" />
            <span className={s.seal} aria-hidden="true"><span className="display">S</span></span>
          </div>

          <div className={s.chips}>
            <div className={s.slot1}><Chip href={`mailto:${links.email}`} label="Email me" sub={links.email} className={s.chipPink} /></div>
            <div className={s.slot2}><Chip href={links.linkedin} label="LinkedIn" sub="Sabreen Najeeb" className={s.chipInk} external /></div>
            <div className={s.slot3}><Chip href={links.github} label="GitHub" sub="sabreennajeeb-commits" className={s.chipPaper} external /></div>
            {links.cv && <div className={s.slot4}><Chip href={links.cv} label="Download CV" sub="PDF" className={s.chipWine} /></div>}
          </div>
        </div>

        <div className={s.copyRow}>
          <button type="button" className="btn btn--ghost" onClick={copyEmail}>{copied ? "Email copied" : "Copy email address"}</button>
          <span aria-live="polite" className="sr-only">{copied ? "Email address copied to clipboard" : ""}</span>
        </div>
      </div>

      <footer className={s.footer} data-dark>
        <div className={s.marquee} aria-hidden="true">
          <div data-marquee className={s.marqueeTrack}>
            {marquee.map((m, i) => <span key={i}>{m} <Star className={s.mStar} /></span>)}
          </div>
        </div>
        <p className={`${s.sig} display`} data-sig>{profile.firstName}</p>
        <div className={s.footRow}>
          <p>{profile.city}, {profile.country}. It&apos;s <Clock /> here.</p>
          <button type="button" className={s.top} onClick={toTop} data-cursor="again">Back to the beginning</button>
          <p>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Built with Next.js, GSAP & a lot of curiosity.</p>
        </div>
      </footer>
    </section>
  );
}
