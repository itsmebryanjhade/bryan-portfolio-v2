# Graph Report - bryan-portfolio  (2026-11-20)

## Corpus Check
- 143 files · ~57,008 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .ico 1, .css 1)

## Summary
- 588 nodes · 1358 edges · 27 communities (21 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e2f40c16`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Portfolio Redesign: "Clean Pro"
- sidebar.tsx
- theme-toggle.tsx
- projects/[slug]/page.tsx
- dependencies
- layout.tsx
- devDependencies
- mdx-components.tsx
- gear-grid.tsx
- projects/page.tsx
- Sidebar: "Quiet Panel" (short design)
- app/page.tsx
- content.ts
- package.json
- command-palette.tsx
- scripts
- app/page.tsx
- eslint.config.mjs
- next.config.ts
- vitest.config.mts
- stack/page.tsx
- compilerOptions
- Bryan Jhade — Portfolio
- AGENTS.md
- CLAUDE.md
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `vitest` - 40 edges
2. `next` - 39 edges
3. `@testing-library/react` - 32 edges
4. `react` - 26 edges
5. `lucide-react` - 22 edges
6. `BackButton()` - 21 edges
7. `compilerOptions` - 16 edges
8. `Home()` - 15 edges
9. `TerminalShell()` - 14 edges
10. `ProjectPage()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Task 9: Explore pages (Blog, Gear, Links, Resources)` --references--> `EmptyState()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/ui/empty-state.tsx
- `Task 4: App shell with sidebar and mobile drawer` --references--> `MobileBar()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/mobile-bar.tsx
- `Task 10: Command palette and terminal integration` --references--> `Shell()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/shell.tsx
- `Task 4: App shell with sidebar and mobile drawer` --references--> `ThemeToggle()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/theme/theme-toggle.tsx
- `Task 2: Quiet Panel sidebar + gliding highlight` --references--> `ThemeToggle()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-sidebar-quiet-panel.md → components/theme/theme-toggle.tsx

## Import Cycles
- None detected.

## Communities (27 total, 6 thin omitted)

### Community 0 - "Portfolio Redesign: "Clean Pro""
Cohesion: 0.08
Nodes (23): 10. Content Bryan still needs to provide (blocking only the sections named), 11. Verification, 12. Left to the builder, 1. Intent and why, 2. Goals, non-goals, anti-goals, 3. Constraints, 4. Approaches considered, 5.1 Look (+15 more)

### Community 1 - "sidebar.tsx"
Cohesion: 0.07
Nodes (43): LinkIcon(), LinkRow(), LinksPage(), metadata, host(), metadata, ResourceRow(), ResourcesPage() (+35 more)

### Community 2 - "theme-toggle.tsx"
Cohesion: 0.11
Nodes (27): getServerSnapshot(), getSnapshot(), subscribe(), ThemeLamp(), warm(), getServerSnapshot(), getSnapshot(), subscribe() (+19 more)

### Community 3 - "projects/[slug]/page.tsx"
Cohesion: 0.13
Nodes (22): Facts(), fonts, generateMetadata(), generateStaticParams(), host(), NextProject(), OutLink(), ProjectPage() (+14 more)

### Community 4 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, lucide-react, @mdx-js/loader, @mdx-js/react, next, @next/mdx, react, react-dom (+2 more)

### Community 5 - "layout.tsx"
Cohesion: 0.10
Nodes (20): geistMono, geistSans, metadata, newsreader, RootLayout(), robots(), sitemap(), staticRoutes (+12 more)

### Community 6 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, tailwindcss, @tailwindcss/postcss, @testing-library/jest-dom, @testing-library/react (+7 more)

### Community 9 - "gear-grid.tsx"
Cohesion: 0.14
Nodes (17): GearPage(), metadata, ease(), FramePlayer(), playTo(), render(), frames, GearGrid() (+9 more)

### Community 11 - "projects/page.tsx"
Cohesion: 0.12
Nodes (23): count(), Group(), isLive(), metadata, ProjectLink(), ProjectRow(), ProjectsPage(), Status() (+15 more)

### Community 12 - "Sidebar: "Quiet Panel" (short design)"
Cohesion: 0.29
Nodes (6): Approaches, Constraints, Design, Intent, Non-goals, Sidebar: "Quiet Panel" (short design)

### Community 13 - "app/page.tsx"
Cohesion: 0.07
Nodes (32): Home(), HOME_POSTS, homePosts, CertShowcase(), ExperienceList(), cell(), GithubActivity(), LEVEL_FILL (+24 more)

### Community 14 - "content.ts"
Cohesion: 0.07
Nodes (39): CertificationsPage(), count(), GroupHeading(), metadata, slug(), topics, CertCard(), issuerMark() (+31 more)

### Community 15 - "package.json"
Cohesion: 0.12
Nodes (14): name, private, version, jsdom, @mdx-js/loader, @mdx-js/react, tailwindcss, @tailwindcss/postcss (+6 more)

### Community 16 - "command-palette.tsx"
Cohesion: 0.10
Nodes (24): CommandPalette(), choose(), close(), onKeyDown(), GROUPS, Kbd(), buildItems(), PaletteGroup (+16 more)

### Community 17 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, start, test, test:watch

### Community 18 - "app/page.tsx"
Cohesion: 0.05
Nodes (44): AboutPage(), count(), GroupHeading(), metadata, BlogPage(), metadata, BlogPostPage(), dynamicParams (+36 more)

### Community 19 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 20 - "next.config.ts"
Cohesion: 0.50
Nodes (3): nextConfig, withMDX, @next/mdx

### Community 22 - "stack/page.tsx"
Cohesion: 0.17
Nodes (15): push, introText(), neofetch(), stackOutput(), whoami(), Entry, TerminalShell(), closeTerminal() (+7 more)

### Community 43 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 145 - "Bryan Jhade — Portfolio"
Cohesion: 0.40
Nodes (4): Adding a blog post, Bryan Jhade — Portfolio, Commands, Editing content

## Knowledge Gaps
- **10 isolated node(s):** `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `@tailwindcss/postcss`, `@types/node` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 211 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `app/page.tsx` to `sidebar.tsx`, `theme-toggle.tsx`, `projects/[slug]/page.tsx`, `layout.tsx`, `gear-grid.tsx`, `projects/page.tsx`, `app/page.tsx`, `content.ts`, `package.json`, `command-palette.tsx`, `next.config.ts`, `stack/page.tsx`?**
  _High betweenness centrality (0.204) - this node is a cross-community bridge._
- **What connects `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio Redesign: "Clean Pro"` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `app/page.tsx` to `sidebar.tsx`, `theme-toggle.tsx`, `projects/[slug]/page.tsx`, `layout.tsx`, `gear-grid.tsx`, `projects/page.tsx`, `content.ts`, `package.json`, `command-palette.tsx`, `app/page.tsx`, `vitest.config.mts`, `stack/page.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `sidebar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07043650793650794 - nodes in this community are weakly interconnected._
- **Why does `react` connect `theme-toggle.tsx` to `sidebar.tsx`, `projects/[slug]/page.tsx`, `layout.tsx`, `gear-grid.tsx`, `projects/page.tsx`, `app/page.tsx`, `content.ts`, `package.json`, `command-palette.tsx`, `app/page.tsx`, `stack/page.tsx`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Should `theme-toggle.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10756302521008404 - nodes in this community are weakly interconnected._