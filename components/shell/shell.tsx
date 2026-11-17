import { DesktopSidebar } from "./sidebar";
import { MobileBar } from "./mobile-bar";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <DesktopSidebar />
      <MobileBar />
      <div className="glow-top lg:pl-60">
        <main id="main">{children}</main>
      </div>
    </>
  );
}
