import { DesktopSidebar } from "./sidebar";
import { MobileBar } from "./mobile-bar";
import { CommandPalette } from "@/components/palette/command-palette";
import { TerminalShell } from "@/components/terminal/terminal-shell";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <DesktopSidebar />
      <MobileBar />
      <CommandPalette />
      <TerminalShell />
      <div className="glow-top lg:pl-60">
        <main id="main">{children}</main>
      </div>
    </>
  );
}
