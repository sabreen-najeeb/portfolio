/**
 * Technical skills, grouped exactly as in the CV.
 * `logo` points at an official brand SVG in /public/logos (from Devicon, Simple Icons or Iconify "logos").
 * Concepts without an official logo use a custom `glyph` (see components/ui/Glyph.tsx).
 * `usedIn` links to project ids in projects.ts — this is what the keyboard's screen displays.
 */

export type Glyph =
  | "sql"
  | "responsive"
  | "rtl"
  | "api"
  | "crud"
  | "trigger"
  | "edge"
  | "jwt"
  | "rls"
  | "rbac"
  | "route"
  | "prompt"
  | "json"
  | "multimodal"
  | "chat"
  | "aks"
  | "acr"
  | "aci"
  | "cicd"
  | "iac";

export interface Skill {
  id: string;
  name: string;
  logo?: string;
  glyph?: Glyph;
  usedIn?: string[];
  note?: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    name: "Programming",
    skills: [
      { id: "python", name: "Python", logo: "/logos/python.svg", note: "Machine-learning coursework with DataCamp and NVIDIA DLI" },
      { id: "javascript", name: "JavaScript", logo: "/logos/javascript.svg", usedIn: ["cloudscale", "arch"] },
      { id: "typescript", name: "TypeScript", logo: "/logos/typescript.svg", usedIn: ["nona"] },
      { id: "php", name: "PHP", logo: "/logos/php.svg", usedIn: ["flight"] },
      { id: "java", name: "Java", logo: "/logos/java.svg", note: "Taught robotics programming in Java to 60 students" },
      { id: "csharp", name: "C#", logo: "/logos/csharp.svg" },
      { id: "sql", name: "SQL", glyph: "sql", usedIn: ["nona", "flight"] },
    ],
  },
  {
    id: "frontend",
    name: "Front-end",
    skills: [
      { id: "react", name: "React", logo: "/logos/react.svg", usedIn: ["nona", "arch"] },
      { id: "nextjs", name: "Next.js", logo: "/logos/nextjs.svg", usedIn: ["nona"] },
      { id: "html5", name: "HTML5", logo: "/logos/html5.svg", usedIn: ["arch"] },
      { id: "css3", name: "CSS3", logo: "/logos/css3.svg", usedIn: ["arch"] },
      { id: "tailwind", name: "Tailwind CSS", logo: "/logos/tailwindcss.svg", usedIn: ["nona"] },
      { id: "bootstrap", name: "Bootstrap", logo: "/logos/bootstrap.svg", usedIn: ["arch"] },
      { id: "responsive", name: "Responsive design", glyph: "responsive", usedIn: ["nona"] },
      { id: "rtl", name: "Arabic / English RTL & LTR", glyph: "rtl", usedIn: ["nona"] },
    ],
  },
  {
    id: "backend",
    name: "Back-end & databases",
    skills: [
      { id: "nodejs", name: "Node.js", logo: "/logos/nodejs.svg", usedIn: ["cloudscale"] },
      { id: "supabase", name: "Supabase", logo: "/logos/supabase.svg", usedIn: ["nona"], note: "Auth, Postgres and Edge Functions" },
      { id: "postgresql", name: "PostgreSQL", logo: "/logos/postgresql.svg", usedIn: ["nona"] },
      { id: "mysql", name: "MySQL", logo: "/logos/mysql.svg", usedIn: ["flight"] },
      { id: "edge", name: "Supabase Edge Functions", glyph: "edge", usedIn: ["nona"] },
      { id: "rest", name: "REST APIs", glyph: "api", usedIn: ["nona"] },
      { id: "crud", name: "CRUD operations", glyph: "crud", usedIn: ["flight"] },
      { id: "triggers", name: "Database triggers", glyph: "trigger" },
    ],
  },
  {
    id: "security",
    name: "Auth & security",
    skills: [
      { id: "jwt", name: "JWT authentication", glyph: "jwt", usedIn: ["nona"] },
      { id: "rls", name: "Row-Level Security", glyph: "rls", usedIn: ["nona"] },
      { id: "rbac", name: "Role-based access control", glyph: "rbac", usedIn: ["flight"] },
      { id: "routes", name: "Protected routes & server-side API calls", glyph: "route", usedIn: ["nona"] },
    ],
  },
  {
    id: "ai",
    name: "AI integration",
    skills: [
      { id: "gemini", name: "Google Gemini 2.5 Flash", logo: "/logos/gemini.svg", usedIn: ["nona"] },
      { id: "prompt", name: "Prompt engineering", glyph: "prompt", usedIn: ["nona"] },
      { id: "json", name: "Structured JSON responses", glyph: "json", usedIn: ["nona"] },
      { id: "multimodal", name: "Multimodal image & PDF processing", glyph: "multimodal", usedIn: ["nona"] },
      { id: "chat", name: "Conversational AI", glyph: "chat", usedIn: ["nona"] },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    skills: [
      { id: "docker", name: "Docker", logo: "/logos/docker.svg", usedIn: ["cloudscale"] },
      { id: "kubernetes", name: "Kubernetes", logo: "/logos/kubernetes.svg", usedIn: ["cloudscale"] },
      { id: "terraform", name: "Terraform", logo: "/logos/terraform.svg", usedIn: ["cloudscale"] },
      { id: "actions", name: "GitHub Actions", logo: "/logos/githubactions.svg", usedIn: ["cloudscale"] },
      { id: "azure", name: "Microsoft Azure", logo: "/logos/azure.svg", usedIn: ["cloudscale"] },
      { id: "aks", name: "Azure Kubernetes Service", glyph: "aks", usedIn: ["cloudscale"] },
      { id: "acr", name: "Azure Container Registry", glyph: "acr", usedIn: ["cloudscale"] },
      { id: "aci", name: "Azure Container Instances", glyph: "aci" },
      { id: "vercel", name: "Vercel", logo: "/logos/vercel.svg", usedIn: ["nona"] },
      { id: "cicd", name: "CI/CD", glyph: "cicd", usedIn: ["cloudscale"] },
      { id: "iac", name: "Infrastructure as Code", glyph: "iac", usedIn: ["cloudscale"] },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    skills: [
      { id: "git", name: "Git", logo: "/logos/git.svg", usedIn: ["arch", "cloudscale"] },
      { id: "github", name: "GitHub", logo: "/logos/github.svg", usedIn: ["nona", "cloudscale", "arch"] },
      { id: "figma", name: "Figma", logo: "/logos/figma.svg", usedIn: ["arch"] },
      { id: "xampp", name: "XAMPP", logo: "/logos/xampp.svg", usedIn: ["flight"] },
      { id: "phpmyadmin", name: "phpMyAdmin", logo: "/logos/phpmyadmin.svg", usedIn: ["flight"] },
      { id: "canva", name: "Canva", logo: "/logos/canva.svg"},
      { id: "photoshop", name: "Adobe Photoshop", logo: "/logos/photoshop.svg"},
      { id: "lightroom", name: "Adobe Lightroom", logo: "/logos/lightroom.svg"},
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => ({ ...s, group: g.name })));
export const skillById = (id: string) => allSkills.find((s) => s.id === id);
