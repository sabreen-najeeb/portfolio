import type { Glyph as G } from "@/content/skills";

/**
 * Custom symbols for concepts that have no official logo.
 * One drawing system: 24px grid, 1.8px stroke, round caps, wine + ink only.
 */
const paths: Record<G, React.ReactNode> = {
  sql: (<><ellipse cx="12" cy="6" rx="7" ry="2.6" /><path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" /></>),
  responsive: (<><rect x="2.5" y="4" width="13" height="10" rx="1.5" /><rect x="15" y="8" width="6.5" height="12" rx="1.5" /><path d="M6 18h6" /></>),
  rtl: (<><path d="M4 8h14l-3-3M20 16H6l3 3" /><text x="12" y="13.6" fontSize="5" textAnchor="middle" stroke="none" fill="currentColor" fontFamily="var(--font-mono)">ع A</text></>),
  api: (<><path d="M8 5c-2 0-2.5 1-2.5 3v1.5c0 1.2-.8 2.5-2 2.5 1.2 0 2 1.3 2 2.5V16c0 2 .5 3 2.5 3M16 5c2 0 2.5 1 2.5 3v1.5c0 1.2.8 2.5 2 2.5-1.2 0-2 1.3-2 2.5V16c0 2-.5 3-2.5 3" /><circle cx="12" cy="12" r="1.3" fill="currentColor" /></>),
  crud: (<><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><path d="M17 14v6M14 17h6" /></>),
  trigger: (<><ellipse cx="9" cy="7" rx="5.5" ry="2.2" /><path d="M3.5 7v9c0 1.2 2.5 2.2 5.5 2.2M14.5 7v3" /><path d="M16 12l-2.5 4.5h4L15 21" /></>),
  edge: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5c-3 3-3 14 0 17M12 3.5c3 3 3 14 0 17M3.5 12h17" /><path d="M17 4.5l3-1M19.5 6.5l1.5-2" /></>),
  jwt: (<><path d="M12 3v5M12 16v5M3 12h5M16 12h5M5.6 5.6l3.5 3.5M14.9 14.9l3.5 3.5M5.6 18.4l3.5-3.5M14.9 9.1l3.5-3.5" /><circle cx="12" cy="12" r="2" /></>),
  rls: (<><rect x="3.5" y="4" width="17" height="16" rx="1.5" /><path d="M3.5 9h17M3.5 14h17" /><rect x="10" y="10.6" width="6" height="5" rx="1" fill="currentColor" stroke="none" opacity=".25" /><path d="M7 11.5h0" /></>),
  rbac: (<><circle cx="7" cy="8" r="2.5" /><circle cx="17" cy="8" r="2.5" /><path d="M2.5 18c.5-3 2.4-4.5 4.5-4.5s4 1.5 4.5 4.5M12.5 18c.5-3 2.4-4.5 4.5-4.5s4 1.5 4.5 4.5" /><path d="M12 3v3" /></>),
  route: (<><path d="M5 19V9a4 4 0 0 1 4-4h6" /><path d="M13 2.5L15.5 5 13 7.5" /><rect x="13" y="13" width="7" height="6" rx="1.2" /><path d="M14.8 13v-1.6a1.7 1.7 0 0 1 3.4 0V13" /></>),
  prompt: (<><path d="M4 6l5 5-5 5" /><path d="M11 17h6" /><path d="M18.5 3.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z" fill="currentColor" /></>),
  json: (<><path d="M8 4c-2 0-2 1.6-2 3s0 2.5-2 5c2 2.5 2 3.6 2 5s0 3 2 3M16 4c2 0 2 1.6 2 3s0 2.5 2 5c-2 2.5-2 3.6-2 5s0 3-2 3" /><path d="M10 10h4M10 14h4" /></>),
  multimodal: (<><rect x="3" y="4" width="10" height="9" rx="1.2" /><path d="M3 11l3-3 3 3 2-2 2 2" /><path d="M14 9h4.5L21 11.5V20H11v-4" /><path d="M14 15h4M14 18h4" /></>),
  chat: (<><path d="M4 5h16v10H10l-4 4v-4H4z" /><path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.6" /></>),
  aks: (<><path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4z" /><path d="M12 12l8-4.6M12 12v9.2M12 12L4 7.4" /></>),
  acr: (<><rect x="3" y="9" width="18" height="11" rx="1.5" /><path d="M7 9v11M11 9v11M15 9v11M19 9" /><path d="M8 3h8l2 6H6z" /></>),
  aci: (<><rect x="4" y="6" width="16" height="13" rx="1.5" /><path d="M4 10h16" /><circle cx="7" cy="8" r=".6" fill="currentColor" /><path d="M9 14h6" /></>),
  cicd: (<><path d="M7.5 8.5a4 4 0 1 0 0 7c2.2 0 3.6-1.5 4.5-3.5s2.3-3.5 4.5-3.5a4 4 0 1 1 0 7c-2.2 0-3.6-1.5-4.5-3.5S9.7 8.5 7.5 8.5z" /><path d="M17.5 6l1.5 2.5-2.8.6" /></>),
  iac: (<><path d="M5 4h10l4 4v12H5z" /><path d="M15 4v4h4" /><path d="M9.5 12l-2 2 2 2M14.5 12l2 2-2 2" /></>),
};

export default function Glyph({ name, className }: { name: G; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
