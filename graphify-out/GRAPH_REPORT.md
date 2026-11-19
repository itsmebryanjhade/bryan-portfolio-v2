# Graph Report - bryan-portfolio  (2026-11-19)

## Corpus Check
- 141 files · ~55,765 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .ico 1, .css 1)

## Summary
- 580 nodes · 1339 edges · 27 communities (21 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79182b13`
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
- links/page.tsx
- mdx-components.tsx
- gear-grid.tsx
- projects/page.tsx
- Sidebar: "Quiet Panel" (short design)
- app/page.tsx
- content.ts
- package.json
- terminal-shell.tsx
- scripts
- app/page.tsx
- eslint.config.mjs
- next.config.ts
- vitest.config.mts
- compilerOptions
- Bryan Jhade — Portfolio
- AGENTS.md
- CLAUDE.md
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `vitest` - 39 edges
2. `next` - 38 edges
3. `@testing-library/react` - 31 edges
4. `react` - 25 edges
5. `lucide-react` - 22 edges
6. `BackButton()` - 21 edges
7. `compilerOptions` - 16 edges
8. `Home()` - 15 edges
9. `TerminalShell()` - 14 edges
10. `ProjectPage()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Task 8: Stack, Certifications and About pages` --references--> `CertCard()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/certs/cert-card.tsx
- `Task 4: App shell with sidebar and mobile drawer` --references--> `MobileBar()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/mobile-bar.tsx
- `Portfolio Redesign ("Clean Pro") Implementation Plan` --references--> `Shell()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/shell.tsx
- `Task 10: Command palette and terminal integration` --references--> `Shell()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/shell.tsx
- `Task 3: Content data and derived stats` --references--> `getStats()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → lib/content.ts

## Import Cycles
- None detected.

## Communities (27 total, 6 thin omitted)

### Community 0 - "Portfolio Redesign: "Clean Pro""
Cohesion: 0.08
Nodes (23): 10. Content Bryan still needs to provide (blocking only the sections named), 11. Verification, 12. Left to the builder, 1. Intent and why, 2. Goals, non-goals, anti-goals, 3. Constraints, 4. Approaches considered, 5.1 Look (+15 more)

### Community 1 - "sidebar.tsx"
Cohesion: 0.06
Nodes (54): buildMailto(), ContactDialog(), onSubmit(), ManilaStatus(), read(), CommandPalette(), choose(), close() (+46 more)

### Community 2 - "theme-toggle.tsx"
Cohesion: 0.11
Nodes (25): getServerSnapshot(), getSnapshot(), subscribe(), ThemeLamp(), warm(), getServerSnapshot(), getSnapshot(), subscribe() (+17 more)

### Community 3 - "projects/[slug]/page.tsx"
Cohesion: 0.14
Nodes (19): Facts(), fonts, generateMetadata(), generateStaticParams(), host(), NextProject(), OutLink(), ProjectPage() (+11 more)

### Community 4 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, lucide-react, @mdx-js/loader, @mdx-js/react, next, @next/mdx, react, react-dom (+2 more)

### Community 5 - "layout.tsx"
Cohesion: 0.14
Nodes (13): geistMono, geistSans, metadata, newsreader, RootLayout(), robots(), sitemap(), staticRoutes (+5 more)

### Community 6 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, tailwindcss, @tailwindcss/postcss, @testing-library/jest-dom, @testing-library/react (+7 more)

### Community 7 - "links/page.tsx"
Cohesion: 0.12
Nodes (23): LinkIcon(), LinkRow(), LinksPage(), metadata, host(), metadata, ResourceRow(), ResourcesPage() (+15 more)

### Community 9 - "gear-grid.tsx"
Cohesion: 0.18
Nodes (13): ease(), FramePlayer(), playTo(), render(), frames, GearGrid(), KeyWave(), Photo() (+5 more)

### Community 11 - "projects/page.tsx"
Cohesion: 0.12
Nodes (23): count(), Group(), isLive(), metadata, ProjectLink(), ProjectRow(), ProjectsPage(), Status() (+15 more)

### Community 12 - "Sidebar: "Quiet Panel" (short design)"
Cohesion: 0.29
Nodes (6): Approaches, Constraints, Design, Intent, Non-goals, Sidebar: "Quiet Panel" (short design)

### Community 13 - "app/page.tsx"
Cohesion: 0.07
Nodes (36): Home(), HOME_POSTS, homePosts, categories, metadata, slug(), StackPage(), CertShowcase() (+28 more)

### Community 14 - "content.ts"
Cohesion: 0.07
Nodes (40): CertificationsPage(), count(), GroupHeading(), metadata, slug(), topics, CertCard(), issuerMark() (+32 more)

### Community 15 - "package.json"
Cohesion: 0.12
Nodes (14): name, private, version, jsdom, @mdx-js/loader, @mdx-js/react, tailwindcss, @tailwindcss/postcss (+6 more)

### Community 16 - "terminal-shell.tsx"
Cohesion: 0.19
Nodes (14): push, introText(), neofetch(), stackOutput(), whoami(), Entry, TerminalShell(), closeTerminal() (+6 more)

### Community 17 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, start, test, test:watch

### Community 18 - "app/page.tsx"
Cohesion: 0.05
Nodes (41): AboutPage(), count(), GroupHeading(), metadata, BlogPage(), metadata, BlogPostPage(), dynamicParams (+33 more)

### Community 19 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 20 - "next.config.ts"
Cohesion: 0.50
Nodes (3): nextConfig, withMDX, @next/mdx

### Community 43 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 145 - "Bryan Jhade — Portfolio"
Cohesion: 0.40
Nodes (4): Adding a blog post, Bryan Jhade — Portfolio, Commands, Editing content

## Knowledge Gaps
- **10 isolated node(s):** `jsdom`, `@mdx-js/loader`, `@mdx-js/react`, `tailwindcss`, `@tailwindcss/postcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 210 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `app/page.tsx` to `sidebar.tsx`, `theme-toggle.tsx`, `projects/[slug]/page.tsx`, `layout.tsx`, `links/page.tsx`, `gear-grid.tsx`, `projects/page.tsx`, `app/page.tsx`, `content.ts`, `package.json`, `terminal-shell.tsx`, `next.config.ts`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **What connects `jsdom`, `@mdx-js/loader`, `@mdx-js/react` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio Redesign: "Clean Pro"` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `app/page.tsx` to `sidebar.tsx`, `theme-toggle.tsx`, `projects/[slug]/page.tsx`, `layout.tsx`, `links/page.tsx`, `gear-grid.tsx`, `projects/page.tsx`, `content.ts`, `package.json`, `terminal-shell.tsx`, `app/page.tsx`, `vitest.config.mts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `sidebar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05647517039922103 - nodes in this community are weakly interconnected._
- **Why does `react` connect `sidebar.tsx` to `theme-toggle.tsx`, `projects/[slug]/page.tsx`, `links/page.tsx`, `gear-grid.tsx`, `projects/page.tsx`, `app/page.tsx`, `package.json`, `terminal-shell.tsx`, `app/page.tsx`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Should `theme-toggle.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11174242424242424 - nodes in this community are weakly interconnected._