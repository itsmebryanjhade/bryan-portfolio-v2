# Sidebar "Quiet Panel" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the shared sidebar into the approved "Quiet Panel": a floating rounded panel with a serif name, a gliding hover highlight and a live Manila clock.

**Architecture:** `components/shell/sidebar.tsx` is reused by the desktop panel and the mobile drawer, so it is restyled in place. A new `LocalClock` client component renders the time after mount. The highlight is one absolutely positioned element inside the nav that is moved with `transform`.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind 4 tokens, lucide-react, Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-18-sidebar-quiet-panel-design.md`

## Global Constraints
- Tokens only, no raw hex.
- Touch targets ≥44px in the drawer; rows ≥38px on desktop.
- The highlight moves via `transform` only and is instant under `prefers-reduced-motion`.
- External links get `target="_blank" rel="noreferrer"` plus an sr-only "(opens in a new tab)".
- **Do NOT commit** (Bryan's instruction). Leave the changes in the working tree. After the code changes, run `python -m graphify update .`.

## Review Focus
1. Server render vs client clock: there must be no hydration mismatch. The server and first client render are empty; the time appears after mount. Test in Task 1.
2. Keyboard users: the highlight follows focus, not only hover. Test in Task 2.
3. Mouse leaves the nav: the highlight returns to the current page item, or hides if none matches. Test in Task 2.
4. The drawer reuses Sidebar, so rows there must stay ≥44px (`min-h-11`). This is covered by the existing drawer tests still passing.
5. Content under the floating panel must not be overlapped: Shell's left padding is increased to match the panel's width plus its inset.

---

### Task 1: LocalClock
**Files:** Create `components/shell/local-clock.tsx`, `components/shell/local-clock.test.tsx`
**Produces:** `LocalClock({ timeZone = "Asia/Manila", city = "Manila" })`. It renders a `<time>` whose text is `` `${city} ${h:mm AM/PM}` `` and updates every 60s.

- [ ] Test `renders nothing on the server`: `renderToString(<LocalClock />)` gives a `<time>` element with empty text.
- [ ] Test `shows Manila time after mount`: with `vi.setSystemTime(new Date("2026-11-18T14:24:00Z"))` and fake timers, rendering gives the text "Manila 10:24 PM". Advancing timers by 60s to 14:25Z gives "Manila 10:25 PM".
- [ ] Run `npm test -- local-clock` and expect FAIL. Implement with `useState<string | null>(null)` plus `useEffect` (format via `toLocaleTimeString("en-US", { timeZone, hour: "numeric", minute: "2-digit" })`, `setInterval` 60_000, cleared on unmount). Run again and expect PASS.

### Task 2: Quiet Panel sidebar + gliding highlight
**Files:** Modify `components/shell/sidebar.tsx`, `components/shell/shell.tsx`, `components/shell/sidebar.test.tsx`
**Consumes:** `LocalClock` (Task 1), `ThemeToggle`, `profile.socials`, `profile.email`, `profile.availability`.

**Layout (top to bottom):**
- Serif name (`font-serif`, "Bryan" plus italic "Jhade").
- Contact me (mailto, bordered, 40px).
- Search row with the shortcut hint.
- "Portfolio" and "Explore" labels (sans, `text-xs text-faint`, no uppercase).
- Item rows: `min-h-[38px]` on desktop. The drawer keeps `min-h-11` through a `variant` prop: `Sidebar({ onSearch, shortcut, variant = "panel" | "drawer" })`.
- Footer: status dot + `profile.availability` + `<LocalClock />`, then icon buttons: ThemeToggle, GitHub, LinkedIn, Email.

**DesktopSidebar:** `fixed top-3.5 bottom-3.5 left-3.5 w-[252px] rounded-[18px] border border-border bg-panel shadow` (`hidden lg:block`). The Shell content wrapper uses `lg:pl-[280px]`.

**Highlight:**
- An `aria-hidden` `<span data-testid="nav-highlight">` sits inside `<nav>`, absolutely positioned. It is moved with `style.transform = translateY(<item offsetTop>px)` and given the item's height.
- It moves on `mouseenter` / `focus` of a link, and resets to the `aria-current` item on nav `mouseleave` / `blur`.
- It has `transition-transform duration-300` with `motion-reduce:transition-none`.

**Tests:**
- [ ] Keep all existing sidebar tests passing. Update any that assert removed elements, such as the avatar.
- [ ] Add `shows the serif name`: the text "Jhade" is inside an `<i>` within an element with class `font-serif`.
- [ ] Add `footer socials open in a new tab`: the GitHub link has an href matching `github.com/itsmebryanjhade`, `target="_blank"` and sr-only text "(opens in a new tab)".
- [ ] Add `highlight follows hover and focus`: with jsdom's offsetTop stubbed via `Object.defineProperty(HTMLElement.prototype, "offsetTop", { get() { return Number(this.dataset.top ?? 0) } })`, set `data-top` per link. `fireEvent.mouseEnter` on Projects makes the highlight transform include its top. `fireEvent.focus` on Stack does the same for Stack. `fireEvent.mouseLeave` on the nav returns it to Home's top while the pathname is "/".
- [ ] Run `npm test` (all pass), `npm run lint` and `npm run build`.

### Task 3: Visual check
- [ ] Use the running dev server on :3000. Check `/` and `/projects` at 1440px and 375px (open the drawer), in dark and light themes. Hover items to see the highlight glide, check the clock shows Manila time, and confirm there are no console errors. Run `python -m graphify update .`. Do not commit.
