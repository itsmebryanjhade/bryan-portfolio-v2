# Graph Report - bryan-portfolio  (2026-11-20)

## Corpus Check
- 144 files · ~57,332 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .ico 1, .css 1)

## Summary
- 590 nodes · 1367 edges · 22 communities (17 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f865cb27`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Portfolio Redesign: "Clean Pro"
- links/page.tsx
- theme-toggle.tsx
- projects/[slug]/page.tsx
- stack/page.tsx
- devDependencies
- mdx-components.tsx
- gear-grid.tsx
- projects/page.tsx
- Sidebar: "Quiet Panel" (short design)
- app/page.tsx
- content.ts
- package.json
- sidebar.tsx
- app/page.tsx
- about/page.tsx
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
9. `TerminalShell()` - 14 edges
10. `ProjectPage()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Task 9: Explore pages (Blog, Gear, Links, Resources)` --references--> `EmptyState()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/ui/empty-state.tsx
- `Task 4: App shell with sidebar and mobile drawer` --references--> `MobileBar()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/mobile-bar.tsx
- `Portfolio Redesign ("Clean Pro") Implementation Plan` --references--> `Shell()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/shell.tsx
- `Task 10: Command palette and terminal integration` --references--> `Shell()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/shell/shell.tsx
- `Task 4: App shell with sidebar and mobile drawer` --references--> `ThemeToggle()`  [INFERRED]
  docs/superpowers/plans/2026-11-18-portfolio-redesign.md → components/theme/theme-toggle.tsx

## Import Cycles
- None detected.

## Communities (22 total, 5 thin omitted)

### Community 0 - "Portfolio Redesign: "Clean Pro""
Cohesion: 0.08
Nodes (23): 10. Content Bryan still needs to provide (blocking only the sections named), 11. Verification, 12. Left to the builder, 1. Intent and why, 2. Goals, non-goals, anti-goals, 3. Constraints, 4. Approaches considered, 5.1 Look (+15 more)

### Community 1 - "links/page.tsx"
Cohesion: 0.21
Nodes (13): LinkIcon(), LinkRow(), LinksPage(), metadata, CopyRow(), DiscordIcon(), FacebookIcon(), GitHubIcon() (+5 more)

### Community 2 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): geistMono, geistSans, metadata, newsreader, RootLayout(), getServerSnapshot(), getSnapshot(), subscribe() (+26 more)

### Community 3 - "projects/[slug]/page.tsx"
Cohesion: 0.14
Nodes (19): Facts(), fonts, generateMetadata(), generateStaticParams(), host(), NextProject(), OutLink(), ProjectPage() (+11 more)

### Community 4 - "stack/page.tsx"
Cohesion: 0.21
Nodes (11): categories, metadata, slug(), StackPage(), CORE, BRAND, PLAIN, ToolTile() (+3 more)

### Community 6 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, tailwindcss, @tailwindcss/postcss, @testing-library/jest-dom, @testing-library/react (+7 more)

### Community 9 - "gear-grid.tsx"
Cohesion: 0.11
Nodes (19): GearPage(), metadata, ease(), FramePlayer(), playTo(), render(), frames, GearGrid() (+11 more)

### Community 11 - "projects/page.tsx"
Cohesion: 0.11
Nodes (25): count(), Group(), isLive(), metadata, ProjectLink(), ProjectRow(), ProjectsPage(), Status() (+17 more)

### Community 12 - "Sidebar: "Quiet Panel" (short design)"
Cohesion: 0.29
Nodes (6): Approaches, Constraints, Design, Intent, Non-goals, Sidebar: "Quiet Panel" (short design)

### Community 13 - "app/page.tsx"
Cohesion: 0.09
Nodes (27): Home(), HOME_POSTS, homePosts, BlogList(), CertShowcase(), ExperienceList(), cell(), GithubActivity() (+19 more)

### Community 14 - "content.ts"
Cohesion: 0.06
Nodes (45): CertificationsPage(), count(), GroupHeading(), metadata, slug(), topics, host(), metadata (+37 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (38): eslintConfig, nextConfig, withMDX, dependencies, lucide-react, @mdx-js/loader, @mdx-js/react, next (+30 more)

### Community 16 - "sidebar.tsx"
Cohesion: 0.06
Nodes (51): ManilaStatus(), read(), CommandPalette(), choose(), close(), onKeyDown(), GROUPS, Kbd() (+43 more)

### Community 18 - "app/page.tsx"
Cohesion: 0.06
Nodes (35): BlogPage(), metadata, BlogPostPage(), dynamicParams, Props, robots(), sitemap(), staticRoutes (+27 more)

### Community 22 - "about/page.tsx"
Cohesion: 0.09
Nodes (28): AboutPage(), count(), GroupHeading(), metadata, GetInTouch(), Journey(), AboutPhoto, PHOTOS (+20 more)

### Community 43 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 145 - "Bryan Jhade — Portfolio"
Cohesion: 0.40
Nodes (4): Adding a blog post, Bryan Jhade — Portfolio, Commands, Editing content

## Knowledge Gaps
- **10 isolated node(s):** `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `@tailwindcss/postcss`, `@types/node` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 212 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `app/page.tsx` to `links/page.tsx`, `theme-toggle.tsx`, `projects/[slug]/page.tsx`, `stack/page.tsx`, `gear-grid.tsx`, `projects/page.tsx`, `app/page.tsx`, `content.ts`, `package.json`, `sidebar.tsx`, `about/page.tsx`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **What connects `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio Redesign: "Clean Pro"` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `gear-grid.tsx` to `links/page.tsx`, `theme-toggle.tsx`, `projects/[slug]/page.tsx`, `stack/page.tsx`, `projects/page.tsx`, `app/page.tsx`, `content.ts`, `package.json`, `sidebar.tsx`, `app/page.tsx`, `about/page.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `theme-toggle.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07777777777777778 - nodes in this community are weakly interconnected._
- **Why does `react` connect `projects/page.tsx` to `links/page.tsx`, `theme-toggle.tsx`, `projects/[slug]/page.tsx`, `gear-grid.tsx`, `app/page.tsx`, `content.ts`, `package.json`, `sidebar.tsx`, `app/page.tsx`, `about/page.tsx`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `projects/[slug]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14245014245014245 - nodes in this community are weakly interconnected._