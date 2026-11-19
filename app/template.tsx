/**
 * A template re-mounts on every navigation (unlike the layout), so the page's entrance
 * animation (`.page-enter` in globals.css) plays each time you open a tab.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
