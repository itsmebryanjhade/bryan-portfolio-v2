import type { ListItem } from "./types";

/** Personal learning resources and recommendations; notes distinguish their role. */
export const resources: ListItem[] = [
  // Courses
  {
    name: "Google AI Professional Certificate",
    category: "Courses",
    href: "https://www.coursera.org/professional-certificates/google-ai",
    note: "Completed — AI fluency, prompting and practical AI workflows.",
  },
  {
    name: "Meta Back-End Developer",
    category: "Courses",
    href: "https://www.coursera.org/professional-certificates/meta-back-end-developer",
    note: "Learning path — Python, Django, REST APIs and MySQL.",
  },
  {
    name: "Meta Front-End Developer",
    category: "Courses",
    href: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    note: "Learning path — HTML, CSS, JavaScript, React and interface design.",
  },

  // Watch
  {
    name: "Fireship",
    category: "Watch",
    href: "https://www.youtube.com/@Fireship",
    note: "Explore — short introductions to programming concepts and new tools.",
  },
  {
    name: "freeCodeCamp",
    category: "Watch",
    href: "https://www.youtube.com/@freecodecamp",
    note: "Explore — full video courses in JavaScript, React and web development.",
  },

  // Read
  {
    name: "React docs",
    category: "Read",
    href: "https://react.dev/learn",
    note: "Reference — components, state, events and React fundamentals.",
  },
  {
    name: "Next.js Learn",
    category: "Read",
    href: "https://nextjs.org/learn",
    note: "Reference — the official course on building an app with the App Router.",
  },
  {
    name: "Tailwind CSS docs",
    category: "Read",
    href: "https://tailwindcss.com/docs",
    note: "Reference — utility classes, responsive layouts and styling states.",
  },
  {
    name: "Supabase docs",
    category: "Read",
    href: "https://supabase.com/docs",
    note: "My stack — official guides to Postgres, SQL and authentication.",
  },
  {
    name: "Vercel deployment docs",
    category: "Read",
    href: "https://vercel.com/docs/deployments",
    note: "My stack — the official guide to deploying apps on Vercel.",
  },
  {
    name: "Antigravity docs",
    category: "Read",
    href: "https://antigravity.google/docs/getting-started",
    note: "My workflow — getting started with the IDE I use alongside Claude.",
  },

  // Skills & repos
  {
    name: "Claude Code",
    category: "Skills & repos",
    href: "https://github.com/anthropics/claude-code",
    note: "My workflow — the coding agent I use through the terminal.",
  },
  {
    name: "Superpowers",
    category: "Skills & repos",
    href: "https://github.com/obra/superpowers",
    note: "Used here — agent skills for planning, implementation, debugging and review.",
  },
  {
    name: "UI UX Pro Max",
    category: "Skills & repos",
    href: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
    note: "Used here — agent skills for layout, typography, colors and accessibility.",
  },
  {
    name: "Graphify",
    category: "Skills & repos",
    href: "https://github.com/Graphify-Labs/graphify",
    note: "Used here — a knowledge graph for navigating code and its relationships.",
  },
];
