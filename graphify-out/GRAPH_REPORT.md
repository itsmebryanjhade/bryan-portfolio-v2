# Graph Report - bryan-portfolio  (2026-11-20)

## Corpus Check
- 147 files · ~58,823 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .ico 1, .css 1)

## Summary
- 609 nodes · 1393 edges · 30 communities (24 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f2a18f24`
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
- sitemap.ts
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
1. `vitest` - 41 edges
2. `next` - 39 edges
3. `@testing-library/react` - 33 edges
4. `react` - 27 edges
5. `lucide-react` - 22 edges
6. `BackButton()` - 21 edges
7. `compilerOptions` - 16 edges
8. `Home()` - 15 edges
9. `MobileBar()` - 14 edges
10. `TerminalShell()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `Task 5: Home page` --references--> `ProjectCard()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/projects/project-card.tsx
- `Task 6: Projects index and detail pages` --references--> `ProjectCard()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/projects/project-card.tsx
- `Task 4: App shell with sidebar and mobile drawer` --references--> `MobileBar()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/mobile-bar.tsx
- `Portfolio Redesign ("Clean Pro") Implementation Plan` --references--> `Shell()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/shell.tsx
- `Task 10: Command palette and terminal integration` --references--> `Shell()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/shell.tsx

## Import Cycles
- None detected.

## Communities (30 total, 6 thin omitted)

### Community 0 - "Portfolio Redesign: "Clean Pro""
Cohesion: 0.08
Nodes (23): 10. Content Bryan still needs to provide (blocking only the sections named), 11. Verification, 12. Left to the builder, 1. Intent and why, 2. Goals, non-goals, anti-goals, 3. Constraints, 4. Approaches considered, 5.1 Look (+15 more)

### Community 1 - "links/page.tsx"
Cohesion: 0.12
Nodes (22): LinkIcon(), LinkRow(), LinksPage(), metadata, host(), metadata, ResourceRow(), ResourcesPage() (+14 more)

### Community 2 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): geistMono, geistSans, metadata, newsreader, RootLayout(), getServerSnapshot(), getSnapshot(), subscribe() (+26 more)

### Community 3 - "content.ts"
Cohesion: 0.08
Nodes (34): CertificationsPage(), count(), GroupHeading(), metadata, slug(), topics, CertCard(), issuerMark() (+26 more)

### Community 4 - "command-palette.tsx"
Cohesion: 0.13
Nodes (21): CommandPalette(), choose(), close(), onKeyDown(), GROUPS, Kbd(), buildItems(), PaletteGroup (+13 more)

### Community 5 - "projects/[slug]/page.tsx"
Cohesion: 0.08
Nodes (35): count(), Group(), isLive(), metadata, ProjectLink(), ProjectRow(), ProjectsPage(), Status() (+27 more)

### Community 6 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, tailwindcss, @tailwindcss/postcss, @testing-library/jest-dom, @testing-library/react (+7 more)

### Community 7 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, lucide-react, @mdx-js/loader, @mdx-js/react, next, @next/mdx, react, react-dom (+2 more)

### Community 9 - "gear-grid.tsx"
Cohesion: 0.10
Nodes (21): GearPage(), metadata, ease(), FramePlayer(), playTo(), render(), frames, GearGrid() (+13 more)

### Community 11 - "TerminalShell"
Cohesion: 0.17
Nodes (15): push, introText(), neofetch(), stackOutput(), whoami(), Entry, TerminalShell(), closeTerminal() (+7 more)

### Community 12 - "Sidebar: "Quiet Panel" (short design)"
Cohesion: 0.29
Nodes (6): Approaches, Constraints, Design, Intent, Non-goals, Sidebar: "Quiet Panel" (short design)

### Community 13 - "app/page.tsx"
Cohesion: 0.09
Nodes (25): Home(), HOME_POSTS, homePosts, ExperienceList(), cell(), GithubActivity(), LEVEL_FILL, fade (+17 more)

### Community 14 - "projects/page.tsx"
Cohesion: 0.16
Nodes (17): Action, AppShelf(), Badge(), deckPose(), fanPose(), Logo(), PlayMark(), ShelfCard() (+9 more)

### Community 15 - "package.json"
Cohesion: 0.12
Nodes (15): name, private, version, jsdom, @mdx-js/loader, @mdx-js/react, simple-icons, tailwindcss (+7 more)

### Community 16 - "sidebar.tsx"
Cohesion: 0.08
Nodes (36): buildMailto(), ContactDialog(), onSubmit(), ManilaStatus(), read(), MenuIcon(), MobileBar(), SheetGroup() (+28 more)

### Community 17 - "Lit panel: surface rework (short design)"
Cohesion: 0.33
Nodes (5): Approaches considered, Design, Edge-lit sidebar: surface rework (short design), Goals / non-goals, Why

### Community 18 - "sitemap.ts"
Cohesion: 0.29
Nodes (6): robots(), sitemap(), staticRoutes, Global Constraints, Portfolio Redesign ("Clean Pro") Implementation Plan, SITE_URL

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
Cohesion: 0.05
Nodes (43): AboutPage(), count(), GroupHeading(), metadata, BlogPage(), metadata, BlogPostPage(), dynamicParams (+35 more)

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 224 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `links/page.tsx`, `theme-toggle.tsx`, `content.ts`, `command-palette.tsx`, `projects/[slug]/page.tsx`, `gear-grid.tsx`, `TerminalShell`, `app/page.tsx`, `projects/page.tsx`, `package.json`, `sidebar.tsx`, `sitemap.ts`, `next.config.ts`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **What connects `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio Redesign: "Clean Pro"` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `gear-grid.tsx` to `links/page.tsx`, `theme-toggle.tsx`, `content.ts`, `command-palette.tsx`, `projects/[slug]/page.tsx`, `TerminalShell`, `app/page.tsx`, `projects/page.tsx`, `package.json`, `sidebar.tsx`, `sitemap.ts`, `next`, `vitest.config.mts`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Should `links/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12121212121212122 - nodes in this community are weakly interconnected._
- **Why does `react` connect `projects/page.tsx` to `links/page.tsx`, `theme-toggle.tsx`, `content.ts`, `command-palette.tsx`, `projects/[slug]/page.tsx`, `gear-grid.tsx`, `TerminalShell`, `app/page.tsx`, `package.json`, `sidebar.tsx`, `next`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `theme-toggle.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07777777777777778 - nodes in this community are weakly interconnected._