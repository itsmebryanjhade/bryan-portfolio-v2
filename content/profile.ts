import type { Profile } from "./types";

export const profile: Profile = {
  name: "Bryan Jhade",
  roleLine: "Developer · PH",
  intro: [
    "I'm a first-year ",
    { pill: "BS IT", icon: "code" },
    " student who builds ",
    { pill: "web apps", icon: "monitor" },
    " and ",
    { pill: "AI tools", icon: "sparkles" },
    ". I came from HUMSS, taught myself to code, and built my school's ",
    { pill: "election system", icon: "vote" },
    ".",
  ],
  email: "bryanjhade.e@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/itsmebryanjhade" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bryan-jhade-bugauisan-ebuan-b7b709441" },
  ],
  availability: "Available for internships",
  // TODO confirm with Bryan: exact years
  journey: [
    { year: "2025", title: "Grade 12, HUMSS", detail: "Not a tech strand. Started teaching myself to build for the web." },
    { year: "2026", title: "OSC officer, Halalan", detail: "Helped the Odizee Student Council run the school's voting system." },
    { year: "2026", title: "BS IT at MMDC", detail: "Started BS Information Technology (AI-Powered Product Development)." },
  ],
  education: [
    {
      school: "Mapúa Malayan Digital College (MMDC)",
      program: "BS Information Technology, AI-Powered Product Development",
      note: "MMDC collaborates with Arizona State University (ASU).",
    },
  ],
};
