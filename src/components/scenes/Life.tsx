"use client";

import { useRef } from "react";
import { lifeItems, type LifeItem } from "@/content/life";
import { gsap, useScene } from "@/lib/motion";
import { ChapterTitle } from "../ui/Bits";
import Photo from "../ui/Photo";
import s from "./life.module.css";

/** A scrapbook page. Only rendered once Sabreen has supplied her own items (see content/life.ts). */
function Item({ it, i }: { it: LifeItem; i: number }) {
  const rot = [-5, 4, -2, 6, -4, 3][i % 6];
  const body = it.lines?.map((l) => <li key={l}>{l}</li>);
  switch (it.kind) {
    case "tape":
      return (
        <div className={s.tape} style={{ rotate: `${rot}deg` }}>
          <div className={s.reels} aria-hidden="true"><i /><i /></div>
          <p className={`${s.label} hand`}>{it.title}</p>
          <ul>{body}</ul>
        </div>
      );
    case "cartridge":
      return (
        <div className={s.cart} style={{ rotate: `${rot}deg` }}>
          <p className={`${s.cartTitle} display`}>{it.title}</p>
          <ul>{body}</ul>
        </div>
      );
    case "place":
      return (
        <div className={s.post} style={{ rotate: `${rot}deg` }}>
          <span className={s.postStamp} aria-hidden="true" />
          <p className={`${s.label} serif`}>{it.title}</p>
          <ul className="hand">{body}</ul>
        </div>
      );
    case "photo":
      return it.photo ? (
        <figure className="polaroid" style={{ rotate: `${rot}deg`, margin: 0 }}>
          <Photo id={it.photo} sizes="280px" />
          <figcaption>{it.title}</figcaption>
        </figure>
      ) : null;
    default:
      return (
        <div className={s.note} style={{ rotate: `${rot}deg` }}>
          <p className={`${s.label} hand`}>{it.title}</p>
          <ul className="hand">{body}</ul>
        </div>
      );
  }
}

export default function Life() {
  const root = useRef<HTMLElement>(null);
  useScene(root, ({ reduced }) => {
    if (reduced) return;
    gsap.from(gsap.utils.selector(root)("[data-item]"), {
      y: 120, rotate: () => gsap.utils.random(-25, 25), opacity: 0, duration: 1.1, ease: "back.out(1.5)", stagger: 0.1,
      scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
    });
  });
  return (
    <section id="life" ref={root} className={s.life} aria-labelledby="life-title">
      <div className={s.inner}>
        <ChapterTitle id="life-title" no="08" file="life.txt" tone="pink">Life outside the screen</ChapterTitle>
        <div className={s.grid}>
          {lifeItems.map((it, i) => <div key={i} data-item className={s.cell}><Item it={it} i={i} /></div>)}
        </div>
      </div>
    </section>
  );
}
