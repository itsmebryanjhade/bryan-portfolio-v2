import type { StackItem } from "./types";

const SELF = "Self-taught";
const GOOGLE_AI = "Google AI Professional Certificate";
const META = "Meta full-stack courses (in progress)";
const PROJECTS = "My projects";

export const stack: StackItem[] = [
  // Languages
  { name: "C", category: "Languages", from: SELF },
  { name: "Python", category: "Languages", from: SELF },
  { name: "SQL", category: "Languages", from: SELF },
  { name: "HTML", category: "Languages", from: SELF },
  { name: "CSS", category: "Languages", from: SELF },
  { name: "JavaScript", category: "Languages", from: SELF },
  { name: "TypeScript", category: "Languages", from: PROJECTS },

  // Frontend
  { name: "React", category: "Frontend", from: PROJECTS },
  { name: "Next.js", category: "Frontend", from: PROJECTS },
  { name: "Tailwind CSS", category: "Frontend", from: PROJECTS },
  { name: "Bootstrap", category: "Frontend", from: META, learning: true },

  // Backend & data
  { name: "Node.js", category: "Backend & data", from: PROJECTS },
  { name: "Flask", category: "Backend & data", from: SELF },
  { name: "SQLite", category: "Backend & data", from: SELF },
  { name: "FastAPI", category: "Backend & data", from: PROJECTS },
  { name: "Firebase", category: "Backend & data", from: PROJECTS },
  { name: "Supabase", category: "Backend & data", from: PROJECTS },
  { name: "Django", category: "Backend & data", from: META, learning: true },
  { name: "Django REST Framework", category: "Backend & data", from: META, learning: true },
  { name: "MySQL", category: "Backend & data", from: META, learning: true },

  // AI
  { name: "Anthropic", category: "AI", from: PROJECTS },
  { name: "OpenAI", category: "AI", from: PROJECTS },
  { name: "Gemini", category: "AI", from: GOOGLE_AI },
  { name: "Google AI Studio", category: "AI", from: GOOGLE_AI },
  { name: "NotebookLM", category: "AI", from: GOOGLE_AI },
  { name: "Prompt engineering", category: "AI", from: "Prompt Like an Engineer" },
  { name: "Groq API", category: "AI", from: PROJECTS },

  // Tools
  { name: "Git", category: "Tools", from: PROJECTS },
  { name: "GitHub", category: "Tools", from: PROJECTS },
  { name: "VS Code", category: "Tools", from: PROJECTS },
  { name: "Antigravity", category: "Tools", from: PROJECTS },
  { name: "Claude", category: "Tools", from: PROJECTS },
  { name: "Claude Code", category: "Tools", from: PROJECTS },
  { name: "Cursor", category: "Tools", from: PROJECTS },
  { name: "GitHub Copilot", category: "Tools", from: PROJECTS },
  { name: "v0", category: "Tools", from: PROJECTS },
  { name: "Vercel", category: "Tools", from: PROJECTS },
  { name: "Linux", category: "Tools", from: "Linux Unhatched" },
  { name: "Bash", category: "Tools", from: "Linux Unhatched" },
  { name: "Figma", category: "Tools", from: META, learning: true },
  { name: "Vitest", category: "Tools", from: PROJECTS },
  { name: "Jest", category: "Tools", from: META, learning: true },
];
