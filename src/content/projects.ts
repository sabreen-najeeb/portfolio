/**
 * Projects — rewritten from the CV in Sabreen's voice. No invented features or numbers.
 * To add screenshots later: drop images in /public/projects/<id>/ and list them in `screens`.
 * The case study shows a gallery only when `screens` has entries.
 */

export type Diagram = "nona" | "cloudscale" | "flight" | "arch";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  context: string;
  pitch: string;
  purpose: string;
  contribution: string[];
  features: string[];
  stack: string[]; // skill ids from skills.ts
  live?: string;
  repo?: string;
  screens?: { src: string; alt: string }[];
  diagram: Diagram;
  tone: "wine" | "ink" | "pink" | "paper";
}

export const projects: Project[] = [
  {
    id: "nona",
    title: "Nona AI",
    subtitle: "AI-powered health & wellness platform",
    year: "2026",
    role: "Project creator & full-stack developer",
    context: "Individual project",
    pitch:
      "A bilingual wellness companion that tracks your days, then turns them into personal plans, reports and conversations with Gemini.",
    purpose:
      "Wellness advice is most useful when it's personal and in your own language. Nona works in Arabic or English and builds plans and reports from your own daily tracking.",
    contribution: [
      "Designed, built and deployed the whole app on my own, from database to interface.",
      "Built authentication, onboarding, PostgreSQL workflows, daily health tracking, dashboards and a persistent consultation history.",
      "Connected Google Gemini 2.5 Flash through a secure Supabase Edge Function, so the API key never touches the browser.",
      "Implemented JWT authentication, Row-Level Security and protected server-side API calls.",
    ],
    features: [
      "AI-generated wellness plans, daily reports and multi-day analyses",
      "AI chat with saved consultation history",
      "Image and PDF attachments analysed by a multimodal model",
      "Arabic / English with full RTL and LTR layouts",
      "Personal dashboards built on daily tracking data",
    ],
    stack: ["nextjs", "typescript", "tailwind", "supabase", "postgresql", "edge", "gemini", "vercel"],
    live: "https://ai-health-system-seven.vercel.app/",
    repo: "https://github.com/sabreennajeeb-commits/Ai-health-system-",
    screens: [],
    diagram: "nona",
    tone: "wine",
  },
  {
    id: "cloudscale",
    title: "CloudScale",
    subtitle: "Containerized web app deployment to AKS",
    year: "Jun 2026",
    role: "Cloud computing & DevOps",
    context: "Team project",
    pitch:
      "One Node.js service, shipped to Kubernetes on Azure the way production teams do it: reproducible infrastructure, an automated pipeline and a human approval gate.",
    purpose:
      "Taking an application from a laptop to a managed Kubernetes cluster without clicking through a cloud console. Every resource lives in code and every deploy goes through the pipeline.",
    contribution: [
      "Developed and containerized a Node.js application with a /health endpoint using Docker.",
      "Provisioned Azure Container Registry and Azure Kubernetes Service with Terraform.",
      "Deployed the application to the cluster with Kubernetes manifests.",
      "Built a GitHub Actions CI/CD pipeline with GitHub Secrets and a manual approval gate.",
    ],
    features: [
      "Infrastructure as Code with Terraform",
      "Container images pushed to ACR",
      "Kubernetes deployment on AKS",
      "CI/CD with a manual approval step before release",
      "Health endpoint for readiness checks",
    ],
    stack: ["nodejs", "docker", "kubernetes", "terraform", "azure", "aks", "acr", "actions"],
    screens: [],
    diagram: "cloudscale",
    tone: "ink",
  },
  {
    id: "flight",
    title: "Flight Reservation",
    subtitle: "Management system for guests, users and admins",
    year: "2026",
    role: "Full-stack developer",
    context: "Individual project",
    pitch:
      "A reservation system where what you can do depends on who you are: browsing as a guest, booking as a user, managing everything as an admin.",
    purpose:
      "Modelling a real booking domain end to end: a relational database, three permission levels and live data from an outside service.",
    contribution: [
      "Developed the full system on my own.",
      "Designed the MySQL database and implemented CRUD operations.",
      "Built admin authentication and role-based permissions in PHP, using XAMPP and phpMyAdmin.",
      "Integrated an external weather API to show live weather information.",
    ],
    features: [
      "Guest, User and Admin roles",
      "Admin authentication",
      "Full CRUD over the reservation data",
      "Live weather from an external API",
    ],
    stack: ["php", "mysql", "xampp", "phpmyadmin", "rbac", "crud"],
    screens: [],
    diagram: "flight",
    tone: "pink",
  },
  {
    id: "arch",
    title: "ARCH",
    subtitle: "University archive system",
    year: "2026 – present",
    role: "UI/UX designer & front-end developer",
    context: "GDG on Campus LIMU, team project",
    pitch:
      "An archive management system for the university, designed in Figma and built in React with the GDG on Campus LIMU team.",
    purpose:
      "Helping the university organise and reach its archive, built as a team at GDG on Campus LIMU.",
    contribution: [
      "Design and prototype the Booking and Faculty interfaces in Figma.",
      "Contribute to front-end development with React, HTML, CSS and Bootstrap.",
      "Collaborate with the team through Git and GitHub.",
    ],
    features: ["Booking interface", "Faculty interface", "Team workflow on GitHub"],
    stack: ["figma", "react", "html5", "css3", "bootstrap", "git", "github"],
    screens: [],
    diagram: "arch",
    tone: "paper",
  },
];
