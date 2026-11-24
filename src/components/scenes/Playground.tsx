"use client";

import { useEffect, useRef, useState } from "react";
import { photos, src } from "@/content/photos";
import { ChapterTitle } from "../ui/Bits";
import s from "./playground.module.css";

type Mode = "dots" | "code";
const CHARS = " .:;+=<>/{}01sabreen#@";

/**
 * "Beyond the code", literally: her portrait rebuilt from particles.
 * Each particle remembers its home pixel; the pointer pushes it away and a spring brings it back.
 */
export default function Playground() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("dots");
  const modeRef = useRef<Mode>("dots");
  const scatterRef = useRef<() => void>(() => {});
  modeRef.current = mode;

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, running = false, W = 0, H = 0, dpr = 1;
    type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; l: number; a: number };
    let parts: P[] = [];
    let cell = 9;
    const mouse = { x: -9999, y: -9999, down: false };
    const img = new Image();
    img.src = src(photos.cutout, 700);

    const sample = () => {
      if (!img.complete || !img.naturalWidth) return;
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = W < 500 ? 7 : 9;
      const scale = Math.min((W * 0.9) / img.naturalWidth, (H * 0.96) / img.naturalHeight);
      const iw = img.naturalWidth * scale, ih = img.naturalHeight * scale;
      const ox = (W - iw) / 2, oy = H - ih;
      const cols = Math.floor(iw / cell), rows = Math.floor(ih / cell);
      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0, cols, rows);
      const d = octx.getImageData(0, 0, cols, rows).data;
      const prev = parts;
      parts = [];
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const a = d[i + 3] / 255;
        if (a < 0.4) continue;
        const l = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
        const hx = ox + x * cell + cell / 2, hy = oy + y * cell + cell / 2;
        const old = prev[parts.length];
        parts.push({ hx, hy, x: old ? old.x : hx + (Math.random() - 0.5) * W, y: old ? old.y : hy + (Math.random() - 0.5) * H, vx: 0, vy: 0, l, a });
      }
      if (reduced) parts.forEach((p) => { p.x = p.hx; p.y = p.hy; });
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const m = modeRef.current;
      if (m === "code") { ctx.font = `700 ${cell + 2}px "JetBrains Mono", monospace`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; }
      for (const p of parts) {
        const dark = 1 - p.l;
        if (m === "dots") {
          const rad = Math.max(0.4, dark * cell * 0.62);
          ctx.fillStyle = dark > 0.55 ? "#221c1f" : dark > 0.3 ? "#7b1e3a" : "#e57fab";
          ctx.beginPath(); ctx.arc(p.x, p.y, rad, 0, Math.PI * 2); ctx.fill();
        } else {
          const ch = CHARS[Math.min(CHARS.length - 1, Math.floor(dark * CHARS.length))];
          ctx.fillStyle = dark > 0.5 ? "#f4a6c6" : "#ece4da";
          ctx.fillText(ch, p.x, p.y);
        }
      }
    };

    const tick = () => {
      const R = cell * 11;
      for (const p of parts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < R) {
          const f = (1 - dist / R) * (mouse.down ? 9 : 3.2);
          p.vx += (dx / (dist || 1)) * f; p.vy += (dy / (dist || 1)) * f;
        }
        p.vx += (p.hx - p.x) * 0.045; p.vy += (p.hy - p.y) * 0.045;
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => { if (!running && !reduced) { running = true; raf = requestAnimationFrame(tick); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const toLocal = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onMove = (e: PointerEvent) => toLocal(e);
    const onDown = (e: PointerEvent) => { toLocal(e); mouse.down = true; };
    const onUp = () => { mouse.down = false; };
    const onLeave = () => { mouse.x = mouse.y = -9999; mouse.down = false; };
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    cv.addEventListener("pointerleave", onLeave);

    scatterRef.current = () => {
      parts.forEach((p) => { p.vx += (Math.random() - 0.5) * 90; p.vy += (Math.random() - 0.5) * 90; });
      if (reduced) { parts.forEach((p) => { p.x = p.hx; p.y = p.hy; }); draw(); }
    };

    img.onload = sample;
    if (img.complete) sample();
    const ro = new ResizeObserver(() => sample());
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.05 });
    io.observe(cv);
    (cv as unknown as { __redraw?: () => void }).__redraw = draw;

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      cv.removeEventListener("pointermove", onMove); cv.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp); cv.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => { (canvas.current as unknown as { __redraw?: () => void })?.__redraw?.(); }, [mode]);

  return (
    <section id="playground" className={`${s.play} ${mode === "code" ? s.dark : ""}`} aria-labelledby="play-title" {...(mode === "code" ? { "data-dark": "" } : {})}>
      <div className={s.inner}>
        <div className={s.text}>
          <ChapterTitle id="play-title" no="09" file="playground.canvas" tone={mode === "code" ? "pink" : "wine"} dark={mode === "code"}>Digital playground</ChapterTitle>
          <p className={s.lede}>
            My portrait, rebuilt from {mode === "dots" ? "halftone dots" : "characters"}. Move through it to push the pieces around. Hold down to push harder, and let go to watch them find their way home.
          </p>
          <div className={s.controls} role="group" aria-label="Render mode">
            <button type="button" aria-pressed={mode === "dots"} onClick={() => setMode("dots")}>Dots</button>
            <button type="button" aria-pressed={mode === "code"} onClick={() => setMode("code")}>Code</button>
            <button type="button" onClick={() => scatterRef.current()}>Scatter</button>
          </div>
          <p className={`${s.secret} hand`}>psst — type <kbd>hello</kbd> anywhere on this page</p>
        </div>
        <div className={s.stage}>
          <canvas ref={canvas} className={s.canvas} data-cursor="push" role="img" aria-label="Interactive portrait of Sabreen made of particles that react to the pointer" />
        </div>
      </div>
    </section>
  );
}
