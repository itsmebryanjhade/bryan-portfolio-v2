import type { Profile } from "./types";

export const profile: Profile = {
  name: "Bryan Jhade B. Ebuan",
  roleLine: "Aspiring AI Software Engineer",
  intro: [
    "I'm an aspiring ",
    { pill: "AI software engineer", icon: "sparkles" },
    " and currently an AI-native ",
    { pill: "full-stack", icon: "code" },
    " developer. A first-year ",
    { pill: "BS IT", icon: "monitor" },
    " student shipping web apps, mobile apps and ",
    { pill: "AI tools", icon: "sparkles" },
    ", still learning something new every week.",
  ],
  introMore:
    "Right now I'm building Omnave, an AI study companion that turns course PDFs into study guides, flashcards and practice quizzes you can review even when you're offline.",
  status: "Taking on new projects",
  email: "bryanjhade.e@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/itsmebryanjhade" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bryan-jhade-bugauisan-ebuan-b7b709441" },
  ],
  availability: "Available for internships",
  journey: [
    { year: "2025", title: "Senior high", detail: "Started teaching myself to build for the web, outside of class." },
    {
      year: "2025",
      title: "OSC officer, Halalan",
      detail: "Helped my school council run its student election on a web voting system more than 800 students used.",
    },
    {
      year: "2026",
      title: "BS IT at MMDC",
      detail:
        "Started BS Information Technology (AI-Powered Product Development) at Mapúa Malayan Digital College, in collaboration with Arizona State University.",
    },
    {
      year: "Aug 2026",
      title: "Frontend Developer / UI Designer, SanX",
      detail: "Building business websites, internal systems and AI-assisted tools with SanX, a family-led software team in Isabela.",
    },
    {
      year: "Nov 2026",
      title: "First hackathon, solo",
      detail: "Built PondoPath on my own, a 30-day cash plan for small Philippine B2B teams, and demoed it to business owners.",
    },
  ],
  education: [
    {
      school: "Mapúa Malayan Digital College (MMDC)",
      program: "BS Information Technology, AI-Powered Product Development",
      note: "MMDC collaborates with Arizona State University (ASU).",
    },
  ],
};
