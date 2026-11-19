import { DesktopSidebar } from "./sidebar";
import { MobileBar } from "./mobile-bar";
import { CommandPalette } from "@/components/palette/command-palette";
import { TerminalShell } from "@/components/terminal/terminal-shell";
import { TouchMotion } from "./touch-motion";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <DesktopSidebar />
      <MobileBar />
      <CommandPalette />
      <TerminalShell />
      <TouchMotion />
      {/* overflow-x-clip: decorative glows (like the gear lamp's) may spill past the page but never widen it */}
      <div className="glow-top overflow-x-clip lg:pl-[292px]">
        <main id="main">{children}</main>
      </div>
    </>
  );
}
