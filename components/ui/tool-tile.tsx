import { Brush, Code2, FlaskConical, Database, Hexagon, MessageSquareText, Orbit, Sparkles, Zap, type LucideIcon } from "lucide-react";
import {
  siAnthropic,
  siBootstrap,
  siC,
  siClaude,
  siCursor,
  siCss,
  siDjango,
  siFastapi,
  siFigma,
  siFirebase,
  siFlask,
  siGit,
  siGithub,
  siGithubcopilot,
  siGnubash,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siJest,
  siLinux,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNotebooklm,
  siPython,
  siReact,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siPwa,
  siV0,
  siVite,
  siVercel,
  siVitest,
  type SimpleIcon,
} from "simple-icons";
import type { StackItem } from "@/content/types";

/** Brand logo per tool; tools without one in Simple Icons get a plain matching icon instead. */
const BRAND: Record<string, SimpleIcon> = {
  C: siC,
  Python: siPython,
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Bootstrap: siBootstrap,
  Flask: siFlask,
  SQLite: siSqlite,
  FastAPI: siFastapi,
  Firebase: siFirebase,
  Supabase: siSupabase,
  Django: siDjango,
  "Django REST Framework": siDjango,
  MySQL: siMysql,
  Gemini: siGooglegemini,
  NotebookLM: siNotebooklm,
  Git: siGit,
  GitHub: siGithub,
  Linux: siLinux,
  Bash: siGnubash,
  Figma: siFigma,
  Jest: siJest,
  Claude: siClaude,
  Anthropic: siAnthropic,
  "Claude Code": siClaude,
  Vercel: siVercel,
  Cursor: siCursor,
  "GitHub Copilot": siGithubcopilot,
  v0: siV0,
  "Node.js": siNodedotjs,
  Vitest: siVitest,
  Vite: siVite,
  PWA: siPwa,
};
const PLAIN: Record<string, LucideIcon> = {
  SQL: Database,
  "Google AI Studio": Sparkles,
  "Prompt engineering": MessageSquareText,
  "Groq API": Zap,
  "VS Code": Code2,
  Antigravity: Orbit,
  OpenAI: Hexagon,
  Canvas: Brush,
  Playwright: FlaskConical,
};

/** Brand colour for the hover state; near-black brands use the text colour so they stay visible. */
function brand(hex: string) {
  const n = parseInt(hex, 16);
  const lum = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum < 40 ? "var(--color-fg)" : `#${hex}`;
}

/**
 * One tool as a tile: logo + name. Monochrome at rest, its own brand colour on hover.
 * Tools still being learned get a dashed outline. Hovering shows where it was learned.
 */
export function ToolTile({ item }: { item: StackItem }) {
  const icon = BRAND[item.name];
  const Plain = PLAIN[item.name];
  return (
    <li
      title={item.from}
      data-learning={item.learning ? "true" : undefined}
      style={{ "--brand": icon ? brand(icon.hex) : "var(--color-fg)" } as React.CSSProperties}
      className={`group flex min-w-0 items-center gap-2.5 rounded-card border px-3 py-2.5 transition-colors duration-200 hover:border-border-hover ${
        item.learning ? "border-dashed border-border-hover" : "border-border bg-card"
      }`}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="flex-none fill-current text-faint transition-colors duration-200 group-hover:text-[var(--brand)]">
          <path d={icon.path} />
        </svg>
      ) : Plain ? (
        <Plain size={16} strokeWidth={1.6} aria-hidden="true" className="flex-none text-faint transition-colors duration-200 group-hover:text-fg" />
      ) : null}
      <span className="min-w-0 text-[13px] leading-snug text-muted transition-colors duration-200 group-hover:text-fg">{item.name}</span>
      {item.learning && <span className="sr-only"> (learning now)</span>}
    </li>
  );
}
