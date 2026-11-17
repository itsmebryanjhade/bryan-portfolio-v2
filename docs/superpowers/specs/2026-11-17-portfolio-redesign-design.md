# Portfolio Redesign: "Clean Pro"

**Date:** 2026-11-17
**Owner:** Bryan Jhade (codebyjhade)
**Status:** Draft, awaiting approval (builder check done; questions answered 2026-11-18)

## 1. Intent and why

Bryan's portfolio is one long editorial page with four projects and six certificates. It has a clear identity, but it feels thin and doesn't read as a "real" developer portfolio. Bryan wants it to look professional, at the level of two reference sites (marwieang.com and bryllim.com), while staying honest that he is a first-year BS IT student and keeping his own identity.

The core story the site should tell, in Bryan's words: he was a Grade 12 HUMSS student (not a tech strand) and, as an officer of the Odizee Student Council (OSC), used self-taught web skills to help his team run the school's voting system. He is now a first-year BS IT (AI-Powered Product Development) student at Mapúa Malayan Digital College, building web apps and AI tools.

**Who it's for:** recruiters and reviewers for internships and junior roles, collaborators, and classmates and peers.
**What success looks like:** a visitor understands in about 10 seconds who Bryan is and what he has built, can browse projects, stack and credentials in depth, and the site looks as polished as the references without inventing anything.

## 2. Goals, non-goals, anti-goals

**Goals**
- A multi-page portfolio with a persistent sidebar, in two groups:
  - **Portfolio:** Home, Projects, Stack, Certifications, About me
  - **Explore:** Blog, Gear, Links, Resources
- The approved visual direction **T, "Clean Pro"** (section 5), in both dark (default) and light themes.
- Every claim on the site is true and comes from content Bryan has provided.
- Adding a project, certificate, link, gear item or blog post means editing one data file or adding one Markdown file.
- Good fundamentals: accessible (WCAG 2.2 AA contrast, keyboard, focus, reduced motion), responsive from 375px up, fast (optimised images, no layout shift), and SEO metadata on every page.

**Non-goals (not in this project)**
- A CMS or admin dashboard.
- A contact form with a backend (email links stay).
- Analytics, comments, newsletter, i18n.
- Rewriting the projects themselves (Omnave, kisap., Framori, Halalan).

**Anti-goals (failure even if it "works")**
- Fabricated or padded content: fake stats, invented experience, made-up testimonials or recommendations, or placeholder blog posts presented as real.
- A copy of either reference: same layout, same wording, or same branding.
- Empty-looking sections. If a section has no real content yet, it shows an honest "coming soon" empty state or is hidden from navigation.
- A regression in accessibility or performance compared with the current site.

## 3. Constraints

- **Stack (existing):** Next.js 16.3.6 (App Router), React 19.2.8, TypeScript 5, Tailwind CSS 4, ESLint 9. `AGENTS.md` warns this Next.js version has breaking changes, so the builder must read the relevant guide in `node_modules/next/dist/docs/` before using any Next API (layouts, metadata, dynamic routes, MDX, images).
- **Hosting:** Vercel (current setup). No paid services.
- **Assets:** existing images in `public/images/**`, `public/profile.png` and certificate PDFs in `public/certificates/`. The `public/googlee4db25355c5d0539.html` Search Console file must stay.
- **Fonts:** Geist (sans), Newsreader (serif, name only) and JetBrains Mono (labels), all already loaded via `next/font/google` in `app/layout.tsx`.
- **Repo tooling:** after code changes, run `graphify update .` (see `CLAUDE.md`). Verify with `npm run lint` and `npm run build`.

## 4. Approaches considered

| Approach | Trade-off | Decision |
|---|---|---|
| **1. Rebuild inside the current Next.js app.** Routes per page, a shared sidebar layout, content in typed TS data files, blog in MDX. | Free, fast, fully owned; content changes need a code edit and a push. | **Chosen by Bryan.** |
| 2. Same site with a headless CMS (Sanity, Notion…). | Edit from a dashboard, but more setup, an external dependency and more maintenance, which is overkill for the current content volume. | Rejected. |
| 3. Start from an open-source portfolio template. | Fastest start, but fights the chosen design and looks generic. | Rejected. |

The visual direction was chosen through mockups. Bryan reviewed about 20 directions (layouts, palettes, monochrome variants, typography) and chose **T, "Clean Pro"**.

## 5. Visual design (decided by Bryan)

Reference mockup: `.superpowers/brainstorm/1500-1794928646/content/final-directions.html`, option T (git-ignored, local only).

### 5.1 Look
- **Monochrome graphite.** No brand accent colour. The only colour on the page is a small green "Available" status dot. Project screenshots provide the rest of the colour.
- **Background:** near-black graphite with a very faint white radial glow at the top centre of the main column.
- **Surfaces:** cards one step lighter than the background, with a 1px border and 12px radius. On hover the border brightens and the card lifts 1px.
- **Sidebar:** full height, fixed on the left, slightly lighter than the page, with a right border.
- **Name:** "Bryan *Jhade*" in Newsreader, with "Jhade" in italic. This is the only serif on the site and acts as a signature.
- **Body text:** Geist. **Labels and section headers:** JetBrains Mono, uppercase, letter-spaced (e.g. `01 — PROJECTS`, `ALL PROJECTS →`).
- **Intro pills:** inside the intro sentence, small bordered pills with an icon for the key terms: BS IT, web apps, AI tools, election system.

### 5.2 Design tokens (dark default; light theme mirrors them)

| Token | Dark | Light (builder may tune for AA contrast) |
|---|---|---|
| `--bg` | `#0b0b0c` | `#fafafa` |
| `--panel` (sidebar) | `#0e0e10` | `#f4f4f5` |
| `--card` | `#111113` | `#ffffff` |
| `--hover` (active nav / pill bg) | `#19191c` | `#ececee` |
| `--fg` | `#f4f4f5` | `#0a0a0b` |
| `--muted` | `#a1a1aa` | `#52525b` |
| `--faint` | `#6b6b73` | `#71717a` |
| `--border` | `#222226` | `#e4e4e7` |
| `--border-hover` | `#4a4a50` | `#a1a1aa` |
| `--status` | `#4ade80` | `#16a34a` |
| radius | 12px cards, 8px nav items, 6px pills, 50% portrait | same |

All text-on-background pairs must meet 4.5:1 (3:1 for large text). The builder must check `--faint` on `--bg` in both themes and lighten or darken it if it fails. Tokens are CSS variables exposed to Tailwind 4 via `@theme`. Components never use raw hex values.

### 5.3 Icons
`lucide-react`, 1.6 stroke, 16px in nav and 12px in pills, `aria-hidden` when beside visible text. No emoji as icons.

### 5.4 Motion
Only hover and focus transitions (150–200ms) and a subtle fade-in when the page loads. Everything is disabled under `prefers-reduced-motion`. No scroll-jacking or parallax.

## 6. Information architecture

### 6.1 Sidebar (all pages)
- **Profile block:** small round avatar, "Bryan Jhade", "Developer · PH".
- **Search button** showing a `⌘K` (or `Ctrl K`) hint, which opens the command palette (6.4).
- **PORTFOLIO:** Home, Projects (count), Stack, Certifications (count), About me.
- **EXPLORE:** Blog, Gear, Links, Resources.
- **Bottom:** a "Contact me" button (mailto) and the "Available for internships" status line with the green dot.
- The active route is highlighted. Counts come from the data files.
- **Mobile (< 1024px):** the sidebar collapses into a top bar (name, search, menu button). The menu opens the same nav as a drawer with a close button, focus trap and `Esc` to close.

### 6.2 Routes

| Route | Content |
|---|---|
| `/` | **Hero:** portrait, name, intro with pills, social links. **Stats row:** projects shipped, certs and badges, started BSIT year. **Sections:** `01 — Projects` (3 featured cards, "All projects →"), `02 — Certifications` (3 featured, "All N →"), `03 — GitHub` (contribution graph, "@codebyjhade ↗"). |
| `/projects` | Every project as a card grid with screenshot, name, status tag, one-line description, year and stack chips. |
| `/projects/[slug]` | A detail page per project: overview, what it does, the stack, links (live, repo if public) and screenshots. **Omnave** reuses the existing interactive screen walkthrough (`omnave-dossier.tsx`, restyled). **OSC Halalan 2026** is a case study (the problem, Bryan's role, what was built, the outcome). |
| `/stack` | Tools grouped by category (Frontend, Backend & data, AI, Tools), with icons where they exist. |
| `/certifications` | All 6 certificates (image, issuer, year, link to PDF) and the 11 badges in a grid. |
| `/about` | Longer bio, the HUMSS → OSC → BSIT **journey timeline**, education (MMDC, ASU collaboration note), interests (photography, video), and contact. |
| `/blog`, `/blog/[slug]` | MDX posts with title, date and reading time. If there are no posts: an honest empty state ("First posts coming soon"). |
| `/gear` | Bryan's setup (hardware and software) as a list grouped by category. |
| `/links` | Bryan's profiles and useful links (link-in-bio style). |
| `/resources` | Learning resources Bryan recommends, grouped. |
| `not-found` | Styled 404 with a link home. |

### 6.3 Home content (all from existing material)
- **Intro:** "I'm a first-year [BS IT] student who builds [web apps] and [AI tools]. I came from HUMSS, taught myself to code, and built my school's [election system]."
- **Stats:**
  - **7** projects shipped (see 6.6)
  - **14** credentials: 6 certificates plus the 8 badges that aren't the same achievement as one of those certificates. The Google AI Professional, Linux Unhatched and Prompt Like an Engineer badges duplicate certificates, so they are linked to them and not counted twice. *(Builder's call, recorded here; the stat is derived from the data.)*
  - **2026** started BSIT
- **Featured projects:** Omnave (Live beta), OSC Halalan 2026 (Case study), PondoPath (Hackathon). Every other project appears on `/projects`.
- **Featured certs:** CS50x (Harvard), Google AI Professional Certificate (Google), Linux Unhatched (Cisco).

### 6.4 Command palette (⌘K / Ctrl K)
A modal dialog with a search input. Items are grouped:
- **Pages:** every route.
- **Projects:** each project.
- **Actions:** toggle theme, copy email, open terminal.

It has keyboard navigation (↑ ↓ Enter Esc), a focus trap, returns focus on close, and ARIA combobox/listbox semantics. The existing **BryanOS terminal** (`terminal-shell.tsx`) stays as an easter egg launched from the palette's "Open terminal" action. Its commands are updated to the new routes and its styling to the new tokens.

### 6.5 GitHub contributions
The graph shows real data for `codebyjhade`, fetched on the server and cached (revalidated daily). If the fetch fails, the section shows a plain "View activity on GitHub ↗" link instead of a broken graph. It needs a text summary for screen readers (e.g. "N contributions in the last year").

### 6.6 Project list (confirmed by Bryan, 2026-11-18)

All repos are public on GitHub under `codebyjhade`. The builder looks up each repo URL there. If a project's repo can't be found, it ships without a repo link and the gap is noted.

| Project | Kind | Live | Stack | Detail page |
|---|---|---|---|---|
| **Omnave** | Personal, featured | omnave.vercel.app, "Live beta". A Play Store release is coming soon; show a "Play Store: coming soon" note with no link. | Next.js, Supabase | Yes. Reuses the Omnave screen walkthrough. |
| **OSC Halalan 2026** | School council (OSC officer) | Private system; the screenshot may be public (`halalan-2026-preview.png`) | not given | Yes, a case study (section 10 fallback for facts) |
| **PondoPath** | Hackathon: Bryan's first, "Product Business Edition" build-off, team SoloForge | pondopath.sanx.dev | not given | Card only, with a "Hackathon" tag. One-liner from the live site: a cash-flow action planner for small Philippine B2B teams that combines unpaid invoices, payment promises and expenses into a 30-day cash plan. |
| **Throwback PH (ASL)** | School project | throwback-ph.vercel.app | not given | Card only, with a "School project" tag. One-liner: an interactive tour of Philippine pop culture, 2000–2010. |
| **Wholeturn** | School project | wholeturn.vercel.app | not given | Card only, with a "School project" tag. One-liner from the live site's tagline: "Bringing your day into view." Bryan to confirm a better description. |
| **kisap.** | Personal | kisap.vercel.app | not given | Card only (detail skipped for now) |
| **Framori** | Personal | framori.vercel.app | not given | Card only (detail skipped for now) |

Rules for the list:
- **Team projects** (PondoPath and the school projects) never claim solo authorship. Cards say "Team project" until Bryan states his role.
- **Projects without a detail page** link their card straight to the live site.
- **Stack chips** appear only where the stack is known.
- **Stat:** "Projects shipped" becomes **7**.
- **Screenshots:** the builder captures a screenshot of each new live site for its card (saved to `public/images/projects/`).
- **Home featured projects:** Omnave, OSC Halalan 2026, PondoPath.

## 7. Content model

Typed data in `content/` (or `lib/data/`), one file per collection, each exporting a typed array:
- `projects.ts`: `slug, title, tagline, description, year, status ("Live" | "Live beta" | "Case study" | "Private"), featured, href?, repo?, image, gallery?, stack[], body sections`
- `certifications.ts`: `title, issuer, year, image, pdf, featured, note?`
- `badges.ts`: `name, issuer, image, certification?` (the slug of the matching certificate, if any; matched badges are shown with their certificate and excluded from the credential count)
- `stack.ts`: `name, category, icon?`
- `gear.ts`, `links.ts`, `resources.ts`: `name, category, href?, note?`
- `profile.ts`: name, role line, intro segments (text plus pill entries), socials, email, availability text, journey timeline entries, education.
- Blog posts: `content/blog/*.mdx`, with frontmatter or exported metadata (`title, date, summary`).

Counts, stats and featured lists are derived from the data, not hard-coded.

## 8. SEO and metadata
- Per-page `metadata` (title template "Page — Bryan Jhade", description).
- Open Graph and Twitter cards. A generated OG image is a nice-to-have.
- `sitemap.ts` and `robots.ts`.
- Real `alt` text on every meaningful image.

## 9. What happens to current code
- **Replaced:** `app/page.tsx` (single page), `section-nav.tsx`, `scroll-reveal.tsx`, `private-project-dialog.tsx`, and most of `globals.css` (rewritten around the tokens).
- **Kept and restyled:** `theme-toggle.tsx` (theme stored in `localStorage`, no flash on load), `terminal-shell.tsx`, `omnave-dossier.tsx`.
- **Kept:** all `public/` assets and the certificate PDFs.

## 10. Content Bryan still needs to provide (blocking only the sections named)

| Needed | Blocks | Fallback if not provided at build time |
|---|---|---|
| OSC Halalan facts (voters, duration, Bryan's role, what was built). The screenshot is **approved as public**. | `/projects/osc-halalan-2026` case study | Short case study using only what is already known, with the screenshot |
| Bryan's role and stack for PondoPath, Throwback PH and Wholeturn; a better Wholeturn description | Those project cards | "Team project" tag, no stack chips, one-liner from the live site |
| Gear list | `/gear` | The route always exists and shows an honest empty state ("Setup list coming soon"). The sidebar item gets a small "soon" tag while its data is empty. *(Builder's call: routes, the palette and the sitemap stay static; only the tag and page body depend on the data.)* |
| Resources list | `/resources` | Same as Gear |
| Extra links beyond GitHub, LinkedIn and email | `/links` | Ship with the three known links |
| Blog posts | `/blog` | Empty state |
| Exact Grade 12 / OSC years | Journey timeline | Use 2025 (Grade 12) and 2026 (OSC election, BSIT start), to confirm with Bryan |

## 11. Verification
- `npm run lint` and `npm run build` pass.
- Every route renders in both themes at 375, 768, 1024 and 1440px, with no horizontal scroll.
- Keyboard-only pass: skip link, sidebar, drawer, command palette, terminal; focus is always visible and never hidden behind sticky UI.
- Contrast is checked for every token pair in both themes.
- `prefers-reduced-motion` is respected.
- No layout shift from images or fonts.
- `graphify update .` is run after code changes.

## 12. Left to the builder
- Exact Tailwind class structure, component breakdown and file names (within the routes and content model above).
- Light-theme token fine-tuning for contrast.
- The GitHub data source/endpoint, provided it is free and needs no secret in the client.
- Command-palette implementation (hand-built or a small library such as `cmdk`).
- Wording of empty states and microcopy, in Bryan's plain, honest voice.
