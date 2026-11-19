import Link from "next/link";
import { ToolTile } from "@/components/ui/tool-tile";
import { stack } from "@/content/stack";

/** The core tools shown on the home page; the full list lives on /stack. */
const CORE = ["TypeScript", "React", "Next.js", "Tailwind CSS", "Python", "FastAPI", "Supabase", "Firebase", "Gemini", "Git"];

/** Core tools as logo tiles, ending with a link to the full stack. */
export function StackRows() {
  const core = CORE.map((name) => stack.find((s) => s.name === name)).filter((s) => s !== undefined);
  const more = stack.length - core.length;
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
      {core.map((s) => (
        <ToolTile key={s.name} item={s} />
      ))}
      <li>
        <Link
          href="/stack"
          className="group flex h-full items-center justify-center gap-1.5 rounded-card border border-dashed border-border-hover px-3 py-2.5 text-[13px] text-faint transition-colors duration-200 hover:text-fg"
        >
          +{more} more
        </Link>
      </li>
    </ul>
  );
}
