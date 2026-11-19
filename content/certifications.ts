import type { Certification } from "./types";

const all: Certification[] = [
  {
    slug: "google-ai-professional",
    title: "Google AI Professional Certificate",
    issuer: "Google / Coursera",
    year: "2026",
    image: "/images/google-ai-professional-certificate.png",
    imageAlt: "Google AI Professional Certificate awarded to Bryan Jhade Ebuan",
    pdf: "/certificates/bryan-ebuan-google-ai-professional.pdf",
    topic: "AI",
    featured: true,
    note: "8-course professional certificate",
  },
  {
    slug: "prompt-like-an-engineer",
    title: "Prompt Like an Engineer",
    issuer: "Cisco Networking Academy / DICT–ITU",
    year: "2026",
    image: "/images/prompt-like-an-engineer-certificate.png",
    imageAlt: "Prompt Like an Engineer certificate awarded to Bryan Jhade Ebuan",
    pdf: "/certificates/bryan-ebuan-prompt-like-an-engineer.pdf",
    topic: "AI",
    featured: true,
    note: "Verified course badge",
  },
  {
    slug: "linux-unhatched",
    title: "Linux Unhatched",
    issuer: "Cisco Networking Academy / DICT–ITU",
    year: "2026",
    image: "/images/linux-unhatched-certificate.png",
    imageAlt: "Linux Unhatched certificate awarded to Bryan Jhade Ebuan",
    pdf: "/certificates/bryan-ebuan-linux-unhatched.pdf",
    topic: "Computer science",
    featured: false,
    note: "Verified course badge",
  },
  {
    slug: "dict-ai-quality-assurance",
    title: "AI Quality Assurance & Hallucination Mitigation",
    issuer: "DICT Region II",
    year: "2026",
    image: "/images/dict-ai-quality-assurance-certificate.png",
    imageAlt:
      "DICT Region II AI Quality Assurance and Hallucination Mitigation participation certificate awarded to Bryan Jhade Ebuan",
    pdf: "/certificates/bryan-ebuan-dict-ai-quality-assurance.pdf",
    topic: "AI",
    featured: true,
    note: "4-hour information session. Certificate of participation",
  },
  {
    slug: "dict-game-development",
    title: "Press Start: Game Development",
    issuer: "DICT Region VIII",
    year: "2026",
    image: "/images/dict-game-development-certificate.png",
    imageAlt: "DICT game development certificate awarded to Bryan Jhade Ebuan",
    pdf: "/certificates/bryan-ebuan-dict-game-development.pdf",
    topic: "Game development",
    featured: false,
    note: "Certificate of participation",
  },
];

/** Everything the site shows: hidden certificates are left out. */
export const certifications: Certification[] = all.filter((c) => !c.hidden);
