import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { copy, profile, links } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sabreen-najeeb.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: copy.meta.title,
  description: copy.meta.description,
  authors: [{ name: `${profile.firstName} ${profile.lastName}` }],
  keywords: ["Sabreen Najeeb", "software engineer", "full-stack developer", "Next.js", "Benghazi", "Libya", "LIMU", "portfolio"],
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    type: "profile",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Sabreen Najeeb — beyond the code" }],
  },
  twitter: { card: "summary_large_image", title: copy.meta.title, description: copy.meta.description, images: ["/og.jpg"] },
  icons: { icon: "/favicon.svg" },
  other: { "profile:username": links.github.split("/").pop() ?? "" },
};

export const viewport: Viewport = { themeColor: "#ece4da", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${profile.firstName} ${profile.lastName}`,
    jobTitle: profile.roleLong,
    alumniOf: profile.university,
    address: { "@type": "PostalAddress", addressLocality: profile.city, addressCountry: profile.country },
    email: `mailto:${links.email}`,
    sameAs: [links.linkedin, links.github],
  };
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
        <div className="grain" aria-hidden="true" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
