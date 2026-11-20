# Graph Report - bryan-portfolio  (2026-11-20)

## Corpus Check
- 146 files · ~58,231 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .ico 1, .css 1)

## Summary
- 602 nodes · 1381 edges · 29 communities (23 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5af7c7c9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Portfolio Redesign: "Clean Pro"
- links/page.tsx
- theme-toggle.tsx
- content.ts
- command-palette.tsx
- projects/[slug]/page.tsx
- devDependencies
- dependencies
- mdx-components.tsx
- gear-grid.tsx
- TerminalShell
- Sidebar: "Quiet Panel" (short design)
- app/page.tsx
- projects/page.tsx
- package.json
- sidebar.tsx
- Lit panel: surface rework (short design)
- scripts
- Lit Panel Implementation Plan
- eslint.config.mjs
- next
- next.config.ts
- vitest.config.mts
- compilerOptions
- Bryan Jhade — Portfolio
- AGENTS.md
- CLAUDE.md
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `vitest` - 40 edges
2. `next` - 39 edges
3. `@testing-library/react` - 32 edges
4. `react` - 27 edges
5. `lucide-react` - 22 edges
6. `BackButton()` - 21 edges
7. `compilerOptions` - 16 edges
8. `Home()` - 15 edges
9. `MobileBar()` - 14 edges
10. `TerminalShell()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Task 4: App shell with sidebar and mobile drawer` --references--> `MobileBar()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/mobile-bar.tsx
- `Portfolio Redesign ("Clean Pro") Implementation Plan` --references--> `Shell()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/shell.tsx
- `Task 10: Command palette and terminal integration` --references--> `Shell()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/shell.tsx
- `Task 4: App shell with sidebar and mobile drawer` --references--> `ThemeToggle()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/theme/theme-toggle.tsx
- `Task 2: Quiet Panel sidebar + gliding highlight` --references--> `ThemeToggle()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-sidebar-quiet-panel.md → components/theme/theme-toggle.tsx

## Import Cycles
- None detected.

## Communities (29 total, 6 thin omitted)

### Community 0 - "Portfolio Redesign: "Clean Pro""
Cohesion: 0.08
Nodes (23): 10. Content Bryan still needs to provide (blocking only the sections named), 11. Verification, 12. Left to the builder, 1. Intent and why, 2. Goals, non-goals, anti-goals, 3. Constraints, 4. Approaches considered, 5.1 Look (+15 more)

### Community 1 - "links/page.tsx"
Cohesion: 0.29
Nodes (10): LinkIcon(), LinkRow(), LinksPage(), metadata, CopyRow(), DiscordIcon(), FacebookIcon(), GitHubIcon() (+2 more)

### Community 2 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): geistMono, geistSans, metadata, newsreader, RootLayout(), getServerSnapshot(), getSnapshot(), subscribe() (+26 more)

### Community 3 - "content.ts"
Cohesion: 0.07
Nodes (42): CertificationsPage(), count(), GroupHeading(), metadata, slug(), topics, CertCard(), issuerMark() (+34 more)

### Community 4 - "command-palette.tsx"
Cohesion: 0.14
Nodes (19): CommandPalette(), choose(), close(), onKeyDown(), GROUPS, Kbd(), buildItems(), PaletteGroup (+11 more)

### Community 5 - "projects/[slug]/page.tsx"
Cohesion: 0.10
Nodes (26): Facts(), fonts, generateMetadata(), generateStaticParams(), host(), NextProject(), OutLink(), ProjectPage() (+18 more)

### Community 6 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, tailwindcss, @tailwindcss/postcss, @testing-library/jest-dom, @testing-library/react (+7 more)

### Community 7 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, lucide-react, @mdx-js/loader, @mdx-js/react, next, @next/mdx, react, react-dom (+2 more)

### Community 9 - "gear-grid.tsx"
Cohesion: 0.15
Nodes (15): ease(), FramePlayer(), playTo(), render(), frames, GearGrid(), KeyWave(), Photo() (+7 more)

### Community 11 - "TerminalShell"
Cohesion: 0.17
Nodes (15): push, introText(), neofetch(), stackOutput(), whoami(), Entry, TerminalShell(), closeTerminal() (+7 more)

### Community 12 - "Sidebar: "Quiet Panel" (short design)"
Cohesion: 0.29
Nodes (6): Approaches, Constraints, Design, Intent, Non-goals, Sidebar: "Quiet Panel" (short design)

### Community 13 - "app/page.tsx"
Cohesion: 0.05
Nodes (45): Home(), HOME_POSTS, homePosts, BlogList(), CertShowcase(), ExperienceList(), cell(), GithubActivity() (+37 more)

### Community 14 - "projects/page.tsx"
Cohesion: 0.12
Nodes (24): count(), Group(), isLive(), metadata, ProjectLink(), ProjectRow(), ProjectsPage(), Status() (+16 more)

### Community 15 - "package.json"
Cohesion: 0.12
Nodes (15): name, private, version, jsdom, @mdx-js/loader, @mdx-js/react, simple-icons, tailwindcss (+7 more)

### Community 16 - "sidebar.tsx"
Cohesion: 0.07
Nodes (39): buildMailto(), ContactDialog(), onSubmit(), ManilaStatus(), read(), MenuIcon(), MobileBar(), SheetGroup() (+31 more)

### Community 17 - "Lit panel: surface rework (short design)"
Cohesion: 0.33
Nodes (5): Approaches considered, Design, Edge-lit sidebar: surface rework (short design), Goals / non-goals, Why

### Community 19 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, start, test, test:watch

### Community 20 - "Lit Panel Implementation Plan"
Cohesion: 0.40
Nodes (4): Global Constraints, Lit Panel Implementation Plan, Review Focus, Task 1: Surface tokens, lit panel, calmer canvas

### Community 21 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 22 - "next"
Cohesion: 0.06
Nodes (38): AboutPage(), count(), GroupHeading(), metadata, BlogPage(), metadata, BlogPostPage(), dynamicParams (+30 more)

### Community 23 - "next.config.ts"
Cohesion: 0.50
Nodes (3): nextConfig, withMDX, @next/mdx

### Community 43 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 145 - "Bryan Jhade — Portfolio"
Cohesion: 0.40
Nodes (4): Adding a blog post, Bryan Jhade — Portfolio, Commands, Editing content

## Knowledge Gaps
- **10 isolated node(s):** `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `@tailwindcss/postcss`, `@types/node` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 220 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `links/page.tsx`, `theme-toggle.tsx`, `content.ts`, `command-palette.tsx`, `projects/[slug]/page.tsx`, `gear-grid.tsx`, `TerminalShell`, `app/page.tsx`, `projects/page.tsx`, `package.json`, `sidebar.tsx`, `next.config.ts`?**
  _High betweenness centrality (0.196) - this node is a cross-community bridge._
- **What connects `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio Redesign: "Clean Pro"` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `gear-grid.tsx` to `links/page.tsx`, `theme-toggle.tsx`, `content.ts`, `command-palette.tsx`, `projects/[slug]/page.tsx`, `TerminalShell`, `app/page.tsx`, `projects/page.tsx`, `package.json`, `sidebar.tsx`, `next`, `vitest.config.mts`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Should `theme-toggle.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07777777777777778 - nodes in this community are weakly interconnected._
- **Why does `react` connect `sidebar.tsx` to `links/page.tsx`, `theme-toggle.tsx`, `content.ts`, `command-palette.tsx`, `projects/[slug]/page.tsx`, `gear-grid.tsx`, `TerminalShell`, `app/page.tsx`, `projects/page.tsx`, `package.json`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06821787414066631 - nodes in this community are weakly interconnected._