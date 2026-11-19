# Portfolio Redesign ("Clean Pro") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the single-page portfolio as a multi-page "Clean Pro" site: a sidebar shell, Portfolio and Explore pages, a command palette, real GitHub activity, and every claim derived from typed content data.

**Architecture:**
- **Routes:** Next.js App Router. One root layout renders a `Shell` (sidebar plus mobile drawer) around every route.
- **Content:** lives in typed TS modules under `content/`. Blog posts are MDX files in `content/blog/`. All counts, stats and featured lists are derived in `lib/content.ts`.
- **Styling:** CSS-variable tokens in `app/globals.css`, exposed to Tailwind 4 via `@theme`. Components use Tailwind classes against those tokens only.

**Tech Stack:**
- Next.js 16.3.6 (App Router), React 19.2.8, TypeScript 5, Tailwind CSS 4
- `lucide-react` for icons
- `@next/mdx` for the blog
- Vitest with Testing Library (jsdom) for tests

**Spec:** `docs/superpowers/specs/2026-11-17-portfolio-redesign-design.md`. Read it fully before starting. Section numbers below (§) refer to it.

## Global Constraints

- **Next.js APIs:** before using any of them (layouts, metadata, dynamic routes, `generateStaticParams`, MDX, `next/image`, `sitemap`, `robots`), read the matching guide in `node_modules/next/dist/docs/01-app/`. This version has breaking changes (see `AGENTS.md`).
- **Colours:** no raw hex in components. Use only the tokens in §5.2: `bg panel card hover fg muted faint border border-hover status`. Radii: 12px cards, 8px nav items, 6px pills, 50% portrait.
- **Fonts:**
  - **Newsreader:** only for the name "Bryan *Jhade*" (italic "Jhade").
  - **Geist:** body text.
  - **JetBrains Mono:** uppercase, letter-spaced labels.
  - All three are already loaded in `app/layout.tsx`.
- **Icons:** `lucide-react`, stroke 1.6, 16px in nav and 12px in pills, `aria-hidden` when next to visible text. No emoji.
- **Motion:** only 150–200ms hover and focus transitions plus a page fade-in, all disabled under `prefers-reduced-motion`.
- **Content:** no fabricated content (§2 anti-goals). Team projects (PondoPath, Throwback PH, Wholeturn) show "Team project" and never claim solo work. Stack chips appear only where the stack is known (§6.6).
- **Contrast:** WCAG 2.2 AA in both themes.
- **Layout:** no horizontal scroll at 375px. The sidebar is fixed at ≥1024px; below that it becomes a top bar with a drawer.
- **Keep:** `public/googlee4db25355c5d0539.html` and all existing `public/` assets.
- **After each task:** `npm run lint`, `npm test` and `npm run build` pass, then run `python -m graphify update .`. (The `graphify` shim is broken on this machine; use the module form.)
- **Commits:** end every commit message with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Unknown project slug** (`/projects/nope`): expect the styled 404, not a crash. The test is in Task 6.
2. **GitHub contributions fetch fails or is rate-limited:** expect the "View activity on GitHub ↗" fallback, with no broken graph and no build failure. The test is in Task 7.
3. **Command palette shortcut:** Windows users press Ctrl K and the hint must say "Ctrl K". The shortcut must not fire while typing in an input, textarea or the terminal. The test is in Task 10.
4. **`localStorage` throws or is empty** (private mode): expect the dark default theme, no crash and no light flash. The test is in Task 2.
5. **Drawer open, then route changes or Esc:** expect the drawer to close and focus to return to the menu button. The test is in Task 4.

---

### Task 1: Test tooling and dependencies

**Files:**
- Modify: `package.json` (scripts `test` and `test:watch`; dev deps `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`; deps `lucide-react @next/mdx @mdx-js/loader @mdx-js/react @types/mdx`)
- Create: `vitest.config.ts` (jsdom, the `@/` alias to the repo root, setup file `test/setup.ts`)
- Create: `test/setup.ts` (imports `@testing-library/jest-dom/vitest`)
- Create: `test/smoke.test.ts`

- [ ] **Step 1:** Install the deps listed above with `npm install`.
- [ ] **Step 2: Write the smoke test.** `test/smoke.test.ts` contains `expect(1 + 1).toBe(2)`.
- [ ] **Step 3: Run it.** Run `npm test`. Expected: 1 passed.
- [ ] **Step 4: Check the existing build still works.** Run `npm run build`. Expected: success.
- [ ] **Step 5: Commit.** Message: `chore: add vitest, testing-library, lucide-react, mdx deps`.

### Task 2: Design tokens, global styles and the no-flash theme

**Files:**
- Rewrite: `app/globals.css`. Keep `@import "tailwindcss"`. Add:
  - `:root` dark tokens, `[data-theme="light"]` light tokens, and an `@theme inline` block mapping them to Tailwind colours (`bg-bg`, `text-muted`, `border-border` and so on).
  - Base body styles, `:focus-visible` outline 2px `fg`, the skip link, and the reduced-motion reset.
  - The top glow as a utility class `.glow-top`.
- Modify: `app/layout.tsx`:
  - Add an inline theme script before paint that reads `localStorage.theme` inside `try/catch` and sets `data-theme`, defaulting to `dark`.
  - Add a metadata title template `"%s — Bryan Jhade"` with the default `"Bryan Jhade — Developer"`.
- Create: `lib/theme.ts`
- Modify: `app/theme-toggle.tsx` (use `lib/theme.ts`; icon button with `aria-label` "Switch to light theme" / "Switch to dark theme")
- Test: `lib/theme.test.ts`

**Interfaces:**
- Produces:
  - `type Theme = "dark" | "light"`
  - `readTheme(storage?: Storage): Theme`, which never throws and defaults to `"dark"`
  - `writeTheme(theme: Theme, storage?: Storage): void`, which swallows errors
  - `applyTheme(theme: Theme): void`, which sets `document.documentElement.dataset.theme`

- [ ] **Step 1: Write the failing tests.**
  - `readTheme` returns `"dark"` for empty storage.
  - It returns `"light"` when the stored value is `"light"`.
  - It returns `"dark"` for the garbage value `"blue"`.
  - It returns `"dark"` when `getItem` throws.
  - `writeTheme` does not throw when `setItem` throws.
- [ ] **Step 2: Watch them fail.** Run `npm test -- lib/theme`. Expected: FAIL (module not found).
- [ ] **Step 3: Implement.** Write `lib/theme.ts` and the token CSS, using the exact hex values from §5.2. Then compute contrast for `faint` on `bg` and on `card` in both themes. If either is below 4.5:1, adjust `faint` and record the final value in a CSS comment.
- [ ] **Step 4: Watch them pass.** Run `npm test`. Expected: PASS. Then run `npm run build`. Expected: success.
- [ ] **Step 5: Commit.** Message: `feat: clean pro design tokens and no-flash theme`.

### Task 3: Content data and derived stats

**Files:**
- Create: `content/types.ts`, `content/profile.ts`, `content/projects.ts`, `content/certifications.ts`, `content/badges.ts`, `content/stack.ts`, `content/gear.ts` (empty array), `content/links.ts`, `content/resources.ts` (empty array)
- Create: `lib/content.ts`
- Create: `public/images/projects/pondopath-preview.png`, `throwback-ph-preview.png`, `wholeturn-preview.png` (1440×900 screenshots of the live sites, captured with the browser tool)
- Test: `lib/content.test.ts`

**Interfaces:**
- Produces (in `content/types.ts`):
  - `type ProjectStatus = "Live" | "Live beta" | "Case study" | "Private"`
  - `type ProjectKind = "Personal" | "School project" | "Hackathon" | "School council"`
  - `Project = { slug; title; tagline; description; year; status; kind; team: boolean; featured: boolean; href?; repo?; image; imageAlt; stack: string[]; hasDetail: boolean; note?: string }`
  - `Certification = { slug; title; issuer; year; image; imageAlt; pdf; featured: boolean; note? }`
  - `Badge = { name; issuer; image; certification?: string }`, where `certification` is a `Certification.slug`
  - `StackItem = { name; category: "Frontend" | "Backend & data" | "AI" | "Tools" }`
  - `ListItem = { name; category; href?; note? }`, used for gear, links and resources
  - `Profile = { name; roleLine; intro: Array<string | { pill: string; icon: "code" | "monitor" | "sparkles" | "vote" }>; email; socials: { label; href }[]; availability; journey: { year; title; detail }[]; education: { school; program; note? }[] }`
- Produces (in `lib/content.ts`):
  - `getProjects(): Project[]`, ordered as listed in §6.6
  - `getProject(slug: string): Project | undefined`
  - `getFeaturedProjects(): Project[]`
  - `getFeaturedCertifications(): Certification[]`
  - `getCredentialCount(): number`, which equals certifications plus badges without a `certification`
  - `getStats(): { label: string; value: string }[]`
  - `getNavCounts(): { projects: number; certifications: number }`
  - `isEmpty(list: ListItem[]): boolean`

**Content sources:**
- `app/page.tsx` (current projects, certs, badges and toolchain)
- `app/omnave-dossier.tsx`
- §6.3 and §6.6 of the spec
- Repo URLs: look each project up on `github.com/itsmebryanjhade`. If a repo isn't found, leave `repo` unset and list it in the commit message body.
- Journey entries: 2025 Grade 12 HUMSS; 2026 OSC officer (Halalan); 2026 BSIT at MMDC. Mark the years with a `// TODO confirm with Bryan` comment.

- [ ] **Step 1: Write the failing tests.**
  - `getProjects().length === 7`.
  - Slugs are unique and the order is `omnave, osc-halalan-2026, pondopath, throwback-ph, wholeturn, kisap, framori`.
  - `getFeaturedProjects().map(p => p.slug)` equals `["omnave","osc-halalan-2026","pondopath"]`.
  - Every project with `team: true` has an empty `stack`, unless its stack is listed in §6.6.
  - Omnave's stack equals `["Next.js","Supabase"]`.
  - `hasDetail` is true only for `omnave` and `osc-halalan-2026`.
  - `getCredentialCount() === 14`.
  - Every `badge.certification` matches an existing certification slug.
  - `getStats()` values equal `["7","14","2026"]`.
  - Every `image` path exists under `public/` (check with `fs.existsSync`).
- [ ] **Step 2: Watch them fail.** Run `npm test -- lib/content`. Expected: FAIL.
- [ ] **Step 3: Add the content.** Write the content modules and `lib/content.ts`, and capture the three screenshots.
- [ ] **Step 4: Watch them pass.** Run `npm test`. Expected: PASS.
- [ ] **Step 5: Commit.** Message: `feat: typed content model and derived stats`.

### Task 4: App shell with sidebar and mobile drawer

**Files:**
- Create: `components/shell/shell.tsx` (server component wrapping `children`), `components/shell/sidebar.tsx` (client, uses `usePathname`), `components/shell/mobile-bar.tsx` (client: top bar plus drawer), `components/shell/nav-items.ts`
- Create: `components/ui/status-dot.tsx`
- Modify: `app/layout.tsx` (wrap `children` in `<Shell>`, keep the skip link targeting `#main`)
- Test: `components/shell/sidebar.test.tsx`, `components/shell/mobile-bar.test.tsx`

**Interfaces:**
- Consumes: `getNavCounts`, `isEmpty`, `content/gear`, `content/resources` (Task 3); `ThemeToggle` (Task 2)
- Produces:
  - `NAV: { group: "Portfolio" | "Explore"; items: { href: string; label: string; icon: LucideIcon; count?: "projects" | "certifications"; soonWhenEmpty?: "gear" | "resources" }[] }[]`
  - `<Shell>{children}</Shell>`
  - `<Sidebar onSearch={() => void} />`
  - The search button dispatches `window.dispatchEvent(new Event("open-palette"))`, which Task 10 listens for.

**Layout (§6.1):**
- **Profile block:** avatar `public/profile.png`, "Bryan Jhade", "Developer · PH".
- **Search button** with the shortcut hint.
- **Two groups** of navigation.
- **Bottom:** a "Contact me" `mailto:` link, and the status line "Available for internships".
- **Theme toggle** in the profile row.
- **Breakpoints:** fixed 240px sidebar at `lg`. Below `lg`, a `MobileBar` with a menu button that opens a drawer (`role="dialog"`, `aria-modal`, focus trap, Esc to close, closes on route change, returns focus to the menu button).

- [ ] **Step 1: Write the failing tests.**
  - The sidebar renders labels in this order: `Home, Projects, Stack, Certifications, About me, Blog, Gear, Links, Resources`.
  - The Projects count badge shows `7` and the Certifications count shows `14`.
  - With `usePathname` mocked to `/projects/omnave`, the "Projects" link has `aria-current="page"`.
  - Gear and Resources show a "soon" tag while their arrays are empty.
  - In the drawer: clicking the menu opens a dialog; Esc closes it and focus returns to the menu button; changing the mocked pathname closes it.
- [ ] **Step 2: Watch them fail.** Run `npm test -- components/shell`. Expected: FAIL.
- [ ] **Step 3: Implement** the shell components.
- [ ] **Step 4: Watch them pass.** Run `npm test`. Expected: PASS. Run `npm run build`. Expected: success.
- [ ] **Step 5: Commit.** Message: `feat: sidebar shell and mobile drawer`.

### Task 5: Home page

**Files:**
- Rewrite: `app/page.tsx` as a server component.
- Create:
  - `components/home/hero.tsx`
  - `components/ui/pill.tsx`
  - `components/ui/stat-row.tsx`
  - `components/ui/section-header.tsx` (index, title, optional `href` and link label)
  - `components/projects/project-card.tsx`
  - `components/certs/cert-card.tsx`
- Test: `components/home/hero.test.tsx`, `components/projects/project-card.test.tsx`

**Interfaces:**
- Consumes: `profile`, `getStats`, `getFeaturedProjects`, `getFeaturedCertifications` (Task 3)
- Produces:
  - `<SectionHeader index="01" title="Projects" href="/projects" linkLabel="All projects" />`, rendering `01 — PROJECTS` and `ALL PROJECTS →`
  - `<ProjectCard project={Project} />`. Its link goes to `/projects/[slug]` if `hasDetail`, otherwise to `href` (`target="_blank"`, `rel="noreferrer"`). It shows the status tag, "Team project" when `team`, and stack chips only when `stack.length > 0`.
  - `<CertCard cert={Certification} />`

**Layout (§6.2, §6.3):**
- **Hero:** round portrait, the name, the intro with pills, and the socials.
- **Stat row.**
- **Sections:**
  - `01 — Projects` with 3 cards.
  - `02 — Certifications` with 3 cards and the link text "All 14".
  - `03 — GitHub`, which mounts `<GithubActivity />` from Task 7. Until then, render the fallback link.

- [ ] **Step 1: Write the failing tests.**
  - The hero renders an `h1` with the accessible text "Bryan Jhade".
  - The intro contains the 4 pill texts `BS IT`, `web apps`, `AI tools`, `election system`.
  - In `ProjectCard`, PondoPath has no stack chips and does show "Team project".
  - Its link `href` is `https://pondopath.sanx.dev/`.
  - Omnave links to `/projects/omnave`.
- [ ] **Step 2: Watch them fail.** Run `npm test -- components/home components/projects`. Expected: FAIL.
- [ ] **Step 3: Implement.** Build the home page and delete `app/section-nav.tsx`, `app/scroll-reveal.tsx` and `app/private-project-dialog.tsx`.
- [ ] **Step 4: Watch them pass.** Run `npm test`. Expected: PASS. Run `npm run build`. Expected: success.
- [ ] **Step 5: Commit.** Message: `feat: clean pro home page`.

### Task 6: Projects index and detail pages

**Files:**
- Create: `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`, `app/not-found.tsx`
- Create: `components/projects/halalan-case-study.tsx`
- Move and restyle: `app/omnave-dossier.tsx` → `components/projects/omnave-dossier.tsx`. Restyle it to the tokens and drop the old `section-chapter-heading` and `page-grid` classes.
- Test: `app/projects/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `getProjects`, `getProject` (Task 3); `ProjectCard` (Task 5)
- Produces:
  - `generateStaticParams()`, returning only projects with `hasDetail`
  - `generateMetadata({ params })`, giving the title `project.title`
  - The page calls `notFound()` when `getProject` returns undefined or `!hasDetail`

**Detail page layout:**
- **Header:** title, tagline, status, links (Live ↗, GitHub ↗ when `repo` is set).
- **Body:** overview, stack chips, then the project-specific component.
- **Omnave:** includes the note "Play Store: coming soon" (no link).
- **Halalan:** shows `halalan-2026-preview.png`, with copy limited to the known facts:
  - Grade 12 HUMSS student
  - OSC officer
  - helped the team run the school election with a voter-verification and ballot web system

- [ ] **Step 1: Write the failing tests.**
  - The params include exactly `omnave` and `osc-halalan-2026`.
  - Rendering the page for `nope` calls `notFound` (mock `next/navigation`).
  - Rendering it for `kisap` also calls `notFound`.
- [ ] **Step 2: Watch them fail.** Run `npm test -- app/projects`. Expected: FAIL.
- [ ] **Step 3: Implement** the pages and the styled 404 (big serif "404", a link home).
- [ ] **Step 4: Watch them pass.** Run `npm test`. Expected: PASS. Run `npm run build`. Expected: the build output lists `/projects/omnave` and `/projects/osc-halalan-2026` as static.
- [ ] **Step 5: Commit.** Message: `feat: projects index, detail pages, 404`.

### Task 7: GitHub contributions

**Files:**
- Create: `lib/github.ts`
- Create: `components/home/github-activity.tsx` (async server component)
- Test: `lib/github.test.ts`, `components/home/github-activity.test.tsx`

**Interfaces:**
- Produces:
  - `type ContributionDay = { date: string; level: 0 | 1 | 2 | 3 | 4 }`
  - `fetchContributions(user = "itsmebryanjhade"): Promise<{ total: number; days: ContributionDay[] } | null>`. It never throws and returns `null` on a non-OK status, a network error or an unparsable body.
  - `<GithubActivity />`

**How it works:**
- **Data source:** `https://github-contributions-api.jogruber.de/v4/itsmebryanjhade?y=last`, fetched with `{ next: { revalidate: 86400 } }`. Its `contributions[].level` maps directly onto `level`, and `total.lastYear` gives the total.
- **Graph:** a 7-row grid of cells whose opacity scales with level (token `fg` at 0, .2, .4, .65, .95).
- **Summary:** a visually hidden line, "{total} contributions in the last year".
- **Fallback:** when the fetch returns `null`, render only the link "View activity on GitHub ↗" to `https://github.com/itsmebryanjhade`.

- [ ] **Step 1: Write the failing tests.** Mock `global.fetch` and check:
  - a 200 response with the sample payload gives `total` and `days.length` correct
  - a 500 response gives `null`
  - a `fetch` that rejects gives `null`
  - invalid JSON gives `null`
  - the component with a `null` result renders the fallback link and no grid
- [ ] **Step 2: Watch them fail.** Run `npm test -- github`. Expected: FAIL.
- [ ] **Step 3: Implement** `lib/github.ts` and the component, and mount the component on the home page.
- [ ] **Step 4: Watch them pass.** Run `npm test`. Expected: PASS. Run `npm run build`. Expected: success even with the network unavailable.
- [ ] **Step 5: Commit.** Message: `feat: real github contribution graph with fallback`.

### Task 8: Stack, Certifications and About pages

**Files:**
- Create: `app/stack/page.tsx`, `app/certifications/page.tsx`, `app/about/page.tsx`
- Create: `components/about/journey.tsx`
- Test: `app/certifications/page.test.tsx`

**Interfaces:**
- Consumes: `content/stack`, `content/certifications`, `content/badges`, `profile`, `CertCard`, `SectionHeader`

**Page content (§6.2):**
- **Stack:** grouped by category.
- **Certifications:**
  - all 6 `CertCard`s, each linking to its PDF in a new tab
  - a badge grid
  - badges with a `certification` appear under their certificate as "Badge" and are excluded from the standalone grid
- **About:**
  - longer bio
  - the journey timeline
  - education: MMDC, plus the note about its collaboration with ASU
  - interests: photography and video
  - contact

- [ ] **Step 1: Write the failing tests.** On the certifications page there are 6 cert links, each `href` ends with `.pdf`, and the standalone badge grid has 8 items.
- [ ] **Step 2: Watch them fail.** Run `npm test -- app/certifications`. Expected: FAIL.
- [ ] **Step 3: Implement** the three pages, each with `metadata`.
- [ ] **Step 4: Watch them pass.** Run `npm test`. Expected: PASS. Run `npm run build`. Expected: success.
- [ ] **Step 5: Commit.** Message: `feat: stack, certifications, about pages`.

### Task 9: Explore pages (Blog, Gear, Links, Resources)

**Files:**
- Create: `mdx-components.tsx` at the repo root. It is required by `@next/mdx`; see `node_modules/next/dist/docs/01-app/02-guides/mdx.md`.
- Modify: `next.config.ts` (wrap with `createMDX`, add `pageExtensions` including `mdx`)
- Create: `content/blog/index.ts` (exports `posts: { slug; title; date; summary }[]`, empty for now), `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/gear/page.tsx`, `app/links/page.tsx`, `app/resources/page.tsx`
- Create: `components/ui/empty-state.tsx`, `components/ui/list-group.tsx`
- Test: `components/ui/empty-state.test.tsx`, `app/blog/page.test.tsx`

**Interfaces:**
- Produces:
  - `<EmptyState title: string; body: string />`
  - `<ListGroup items: ListItem[] />`, which groups items by category
- The blog post page imports `` `@/content/blog/${slug}.mdx` `` and calls `notFound()` for unknown slugs.

**Behaviour (§10):**
- **Blog with no posts:** empty state "First posts coming soon".
- **Gear and Resources:** empty states "Setup list coming soon" and "Resources coming soon".
- **Links:** the 3 known links (GitHub, LinkedIn, Email).

- [ ] **Step 1: Write the failing tests.** The blog page with `posts = []` shows "First posts coming soon" and renders no article list. `EmptyState` renders its title as a heading.
- [ ] **Step 2: Watch them fail.** Run `npm test -- blog empty-state`. Expected: FAIL.
- [ ] **Step 3: Implement** the MDX config and the four pages.
- [ ] **Step 4: Watch them pass.** Run `npm test`. Expected: PASS. Run `npm run build`. Expected: success.
- [ ] **Step 5: Commit.** Message: `feat: explore pages with honest empty states, mdx blog`.

### Task 10: Command palette and terminal integration

**Files:**
- Create: `components/palette/command-palette.tsx` (client, mounted once in `Shell`), `components/palette/use-shortcut.ts`, `components/palette/items.ts`
- Move and restyle: `app/terminal-shell.tsx` → `components/terminal/terminal-shell.tsx`. Remove its own launcher button and open it from the `"open-terminal"` window event. Update its commands to the new routes:
  - `work` → `/projects`
  - `omnave` → `/projects/omnave`
  - `about` → `/about`
  - `stack` → `/stack`
  - `credentials` → `/certifications`
  - `contact` → `mailto:`
- Test: `components/palette/command-palette.test.tsx`, `components/palette/use-shortcut.test.ts`

**Interfaces:**
- Consumes: `NAV` (Task 4), `getProjects` (Task 3), `applyTheme`, `readTheme`, `writeTheme` (Task 2)
- Produces:
  - `useShortcut(onOpen: () => void): { label: "⌘K" | "Ctrl K" }`. The label is `"⌘K"` when `navigator.platform` or `userAgent` matches Mac, otherwise `"Ctrl K"`. The hook ignores events whose target is an `input`, a `textarea` or `[contenteditable]`.
  - The palette also opens on the `"open-palette"` window event.
  - `PaletteItem = { id; group: "Pages" | "Projects" | "Actions"; label; run(): void }`
  - Actions: "Toggle theme", "Copy email", "Open terminal" (dispatches `"open-terminal"`).

**Accessibility:** a dialog containing an input with `role="combobox"` and `aria-controls` pointing to a `listbox`; `aria-activedescendant`; ↑ ↓ Enter Esc; a focus trap; focus returns to the opener on close; filtering is a case-insensitive substring match on the label.

- [ ] **Step 1: Write the failing tests.**
  - Ctrl K opens the palette.
  - Ctrl K while focus is in an `<input>` does not open it.
  - The label is `"Ctrl K"` for a Windows userAgent and `"⌘K"` for a Mac one.
  - Typing "omn" leaves exactly the option "Omnave".
  - ArrowDown then Enter calls the item's `run`.
  - Esc closes the palette and focus returns to the trigger.
  - "Open terminal" dispatches `open-terminal`.
- [ ] **Step 2: Watch them fail.** Run `npm test -- palette`. Expected: FAIL.
- [ ] **Step 3: Implement** the palette and restyle the terminal to the tokens.
- [ ] **Step 4: Watch them pass.** Run `npm test`. Expected: PASS. Run `npm run build`. Expected: success.
- [ ] **Step 5: Commit.** Message: `feat: command palette with terminal easter egg`.

### Task 11: SEO, cleanup and final verification

**Files:**
- Create: `app/sitemap.ts` (all static routes plus project detail slugs), `app/robots.ts` (allow all, point to the sitemap)
- Modify: per-page `metadata` descriptions if missing; Open Graph defaults in `app/layout.tsx` (title, description, `public/profile.png` as the image)
- Delete: any old CSS classes in `globals.css` that nothing uses any more
- Rewrite: `README.md` (what the site is, `npm run dev`, `npm test`, how to add a project, cert, link or blog post)
- Test: `app/sitemap.test.ts`

- [ ] **Step 1: Write the failing test.** The sitemap URLs include `/`, `/projects`, `/projects/omnave`, `/projects/osc-halalan-2026`, `/blog`, `/gear`, `/links`, `/resources`, `/stack`, `/certifications` and `/about`, and do not include `/projects/kisap`.
- [ ] **Step 2: Watch it fail.** Run `npm test -- sitemap`. Expected: FAIL.
- [ ] **Step 3: Implement** the sitemap, robots, metadata and README.
- [ ] **Step 4: Run all checks.** Run `npm run lint && npm test && npm run build`. Expected: all pass.
- [ ] **Step 5: Check it in the browser.** Run `npm run dev`. In the browser pane, open every route in dark and light theme at 375, 768, 1024 and 1440px. Confirm there's no horizontal scroll. Do a keyboard-only pass: skip link, sidebar, drawer, palette, terminal. Set reduced motion and confirm the transitions stop.
- [ ] **Step 6: Rebuild the graph.** Run `python -m graphify update .`.
- [ ] **Step 7: Commit.** Message: `feat: sitemap, robots, metadata, readme; redesign complete`.
