"use client";

import { skillById, type Glyph as G } from "@/content/skills";
import type { Diagram as D } from "@/content/projects";
import Glyph from "./Glyph";
import s from "./diagram.module.css";

/**
 * Architecture diagrams drawn from what the CV says each project does.
 * These are explanations, not screenshots — they're labelled "How it works".
 */

interface Node { id: string; x: number; y: number; w?: number; skill?: string; label: string; sub?: string; tone?: "pink" | "wine" | "lime" | "ink" }
interface Edge { a: string; b: string; packet?: boolean; dashed?: boolean; bend?: number; label?: string }

const H = 64;

const data: Record<D, { nodes: Node[]; edges: Edge[]; caption: string }> = {
  nona: {
    caption: "Request flow: interface → secure edge function → Gemini, with every row protected by RLS",
    nodes: [
      { id: "you", x: 20, y: 188, w: 150, label: "You", sub: "Arabic / English", tone: "pink" },
      { id: "next", x: 236, y: 40, w: 170, skill: "nextjs", label: "Next.js app", sub: "TypeScript · Tailwind" },
      { id: "vercel", x: 236, y: 120, w: 120, skill: "vercel", label: "Vercel" },
      { id: "auth", x: 236, y: 250, w: 170, skill: "supabase", label: "Supabase Auth", sub: "JWT · Row-Level Security" },
      { id: "db", x: 236, y: 340, w: 170, skill: "postgresql", label: "PostgreSQL", sub: "tracking · history" },
      { id: "edge", x: 460, y: 188, w: 160, skill: "edge", label: "Edge Function", sub: "keys stay server-side", tone: "wine" },
      { id: "gemini", x: 460, y: 40, w: 160, skill: "gemini", label: "Gemini 2.5 Flash", sub: "text · images · PDFs" },
      { id: "out", x: 460, y: 340, w: 160, skill: "json", label: "AI output", sub: "plans · reports · chat" },
    ],
    edges: [
      { a: "you", b: "next", packet: true, bend: -30 },
      { a: "next", b: "auth", dashed: true },
      { a: "auth", b: "db" },
      { a: "next", b: "edge", packet: true, bend: 20 },
      { a: "edge", b: "gemini", packet: true },
      { a: "edge", b: "out", packet: true },
      { a: "out", b: "db", dashed: true },
    ],
  },
  cloudscale: {
    caption: "Every change goes push → pipeline → approval → cluster. Infrastructure lives in Terraform",
    nodes: [
      { id: "push", x: 20, y: 40, w: 150, skill: "github", label: "git push", sub: "main branch" },
      { id: "ci", x: 236, y: 40, w: 170, skill: "actions", label: "GitHub Actions", sub: "build · test · secrets" },
      { id: "gate", x: 460, y: 40, w: 160, label: "Approval gate", sub: "a human says go", tone: "wine" },
      { id: "img", x: 236, y: 188, w: 170, skill: "docker", label: "Docker image", sub: "Node.js app" },
      { id: "acr", x: 20, y: 188, w: 150, skill: "acr", label: "Registry", sub: "Azure ACR" },
      { id: "aks", x: 460, y: 188, w: 160, skill: "kubernetes", label: "AKS cluster", sub: "Kubernetes deploy" },
      { id: "tf", x: 20, y: 340, w: 150, skill: "terraform", label: "Terraform", sub: "provisions ACR + AKS" },
      { id: "health", x: 460, y: 340, w: 160, label: "GET /health", sub: "200 OK", tone: "lime" },
    ],
    edges: [
      { a: "push", b: "ci", packet: true },
      { a: "ci", b: "img", packet: true },
      { a: "img", b: "acr", packet: true },
      { a: "ci", b: "gate", packet: true },
      { a: "gate", b: "aks", packet: true },
      { a: "acr", b: "aks", dashed: true, bend: 70 },
      { a: "tf", b: "acr", dashed: true },
      { a: "tf", b: "aks", dashed: true, bend: 40 },
      { a: "aks", b: "health", packet: true },
    ],
  },
  flight: {
    caption: "Three roles, one database: permissions decide what each person can do",
    nodes: [
      { id: "guest", x: 20, y: 40, w: 150, label: "Guest", sub: "browse flights", tone: "pink" },
      { id: "user", x: 20, y: 188, w: 150, label: "User", sub: "book & manage", tone: "pink" },
      { id: "admin", x: 20, y: 340, w: 150, label: "Admin", sub: "authenticated", tone: "wine" },
      { id: "php", x: 236, y: 188, w: 170, skill: "php", label: "PHP application", sub: "role-based permissions" },
      { id: "mysql", x: 460, y: 290, w: 160, skill: "mysql", label: "MySQL", sub: "CRUD · phpMyAdmin" },
      { id: "weather", x: 460, y: 80, w: 160, skill: "api", label: "Weather API", sub: "live conditions" },
    ],
    edges: [
      { a: "guest", b: "php", packet: true },
      { a: "user", b: "php", packet: true },
      { a: "admin", b: "php", packet: true },
      { a: "php", b: "mysql", packet: true },
      { a: "weather", b: "php", packet: true, dashed: true },
    ],
  },
  arch: {
    caption: "My part of the team workflow: Figma prototypes become React components, merged through GitHub",
    nodes: [
      { id: "figma", x: 20, y: 110, w: 150, skill: "figma", label: "Figma", sub: "prototypes" },
      { id: "booking", x: 236, y: 40, w: 170, label: "Booking", sub: "interface I designed", tone: "pink" },
      { id: "faculty", x: 236, y: 188, w: 170, label: "Faculty", sub: "interface I designed", tone: "pink" },
      { id: "react", x: 460, y: 110, w: 160, skill: "react", label: "React front-end", sub: "HTML · CSS · Bootstrap" },
      { id: "git", x: 236, y: 340, w: 170, skill: "github", label: "Git & GitHub", sub: "team collaboration" },
      { id: "team", x: 460, y: 340, w: 160, label: "GDG on Campus LIMU", sub: "the team", tone: "wine" },
    ],
    edges: [
      { a: "figma", b: "booking", packet: true },
      { a: "figma", b: "faculty", packet: true },
      { a: "booking", b: "react", packet: true },
      { a: "faculty", b: "react", packet: true },
      { a: "react", b: "git", dashed: true, bend: 40 },
      { a: "git", b: "team", packet: true },
    ],
  },
};

const center = (n: Node) => ({ x: n.x + (n.w ?? 150) / 2, y: n.y + H / 2 });

function edgePath(a: Node, b: Node, bend = 0) {
  const p = center(a), q = center(b);
  const dx = q.x - p.x, dy = q.y - p.y;
  // leave from the side facing the target
  const sx = Math.abs(dx) > Math.abs(dy) ? p.x + Math.sign(dx) * (a.w ?? 150) / 2 : p.x;
  const sy = Math.abs(dx) > Math.abs(dy) ? p.y : p.y + Math.sign(dy) * H / 2;
  const ex = Math.abs(dx) > Math.abs(dy) ? q.x - Math.sign(dx) * (b.w ?? 150) / 2 : q.x;
  const ey = Math.abs(dx) > Math.abs(dy) ? q.y : q.y - Math.sign(dy) * H / 2;
  const mx = (sx + ex) / 2, my = (sy + ey) / 2;
  const nx = -(ey - sy), ny = ex - sx;
  const len = Math.hypot(nx, ny) || 1;
  const cx = mx + (nx / len) * bend, cy = my + (ny / len) * bend;
  return `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;
}

function NodeBox({ n }: { n: Node }) {
  const w = n.w ?? 150;
  const sk = n.skill ? skillById(n.skill) : undefined;
  const fill = n.tone === "pink" ? "#f4a6c6" : n.tone === "wine" ? "#7b1e3a" : n.tone === "lime" ? "#c9e265" : "#fbf8f4";
  const fg = n.tone === "wine" ? "#fbeef3" : "#221c1f";
  const hasIcon = !!sk;
  return (
    <g className={s.node}>
      <rect x={n.x + 3} y={n.y + 5} width={w} height={H} rx="14" fill="rgba(34,28,31,.85)" />
      <rect x={n.x} y={n.y} width={w} height={H} rx="14" fill={fill} stroke="#221c1f" strokeWidth="1.6" />
      {hasIcon && sk.logo && <image href={sk.logo} x={n.x + 12} y={n.y + 16} width="32" height="32" />}
      {hasIcon && sk.glyph && (
        <foreignObject x={n.x + 12} y={n.y + 16} width="32" height="32">
          <GlyphInline name={sk.glyph} color={n.tone === "wine" ? "#fbeef3" : "#7b1e3a"} />
        </foreignObject>
      )}
      <text x={n.x + (hasIcon ? 52 : 14)} y={n.y + (n.sub ? 28 : 37)} fill={fg} className={s.label}>{n.label}</text>
      {n.sub && <text x={n.x + (hasIcon ? 52 : 14)} y={n.y + 46} fill={fg} className={s.sub}>{n.sub}</text>}
    </g>
  );
}

function GlyphInline({ name, color }: { name: G; color: string }) {
  return <div style={{ color, width: 32, height: 32 }}><Glyph name={name} /></div>;
}

export default function Diagram({ id, className = "", animate = true }: { id: D; className?: string; animate?: boolean }) {
  const d = data[id];
  const byId = Object.fromEntries(d.nodes.map((n) => [n.id, n]));
  return (
    <figure className={`${s.fig} ${className}`}>
      <svg viewBox="0 0 640 420" className={s.svg} role="img" aria-label={`How it works: ${d.caption}`}>
        <defs>
          <marker id={`arrow-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#221c1f" />
          </marker>
        </defs>
        {d.edges.map((e, i) => {
          const path = edgePath(byId[e.a], byId[e.b], e.bend);
          return (
            <g key={i}>
              <path d={path} className={`${s.edge} ${e.dashed ? s.dashed : ""} diagram-edge`} markerEnd={`url(#arrow-${id})`} pathLength={1} />
              {animate && e.packet && (
                <circle r="5" className={s.packet}>
                  <animateMotion dur={`${2.2 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={path} begin={`${i * 0.35}s`} />
                </circle>
              )}
            </g>
          );
        })}
        {d.nodes.map((n) => <NodeBox key={n.id} n={n} />)}
      </svg>
      <figcaption className={s.caption}><span>How it works.</span> {d.caption}.</figcaption>
    </figure>
  );
}
