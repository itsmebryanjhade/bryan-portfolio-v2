import { Code2, Monitor, Sparkles, Vote, type LucideIcon } from "lucide-react";

const ICONS: Record<"code" | "monitor" | "sparkles" | "vote", LucideIcon> = {
  code: Code2,
  monitor: Monitor,
  sparkles: Sparkles,
  vote: Vote,
};

export function Pill({ icon, children }: { icon: keyof typeof ICONS; children: React.ReactNode }) {
  const Icon = ICONS[icon];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-card px-2 py-0.5 align-baseline text-[0.92em] text-fg">
      <Icon size={12} strokeWidth={1.6} aria-hidden="true" />
      {children}
    </span>
  );
}
