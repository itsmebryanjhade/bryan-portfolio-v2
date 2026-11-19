# Bryan Jhade — Portfolio

A personal portfolio built with Next.js 16, React 19 and Tailwind 4. A fixed sidebar (top bar and drawer below 1024px) leads to Projects, Stack, Certifications, About, Blog, Gear, Links and Resources. A command palette (Ctrl K) includes a small terminal easter egg. GitHub: [itsmebryanjhade](https://github.com/itsmebryanjhade).

## Commands

```bash
npm run dev     # dev server on http://localhost:3000
npm test        # vitest
npm run lint    # eslint
npm run build   # production build
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) so the sitemap, robots and Open Graph URLs use the real domain.

## Editing content

All content is typed data in `content/`. Stats, nav counts and credential totals are computed, so they update automatically.

- **Project:** add an entry to `content/projects.ts` (fields in `content/types.ts`: slug, title, tagline, description, year, status, kind, team, featured, href, repo, image, imageAlt, stack, hasDetail). `hasDetail: true` alone gives the project a generic detail page through `app/projects/[slug]/page.tsx` and adds it to the sitemap. Optional extra sections (like the Omnave dossier) are added in that file, selected by slug. The optional `note` field (e.g. "Play Store: coming soon") shows as plain text beside the links.
- **Certificate:** add to `content/certifications.ts` (slug, title, issuer, year, image, imageAlt, pdf, featured) and put files in `public/certificates/`.
- **Badge:** add to `content/badges.ts` (name, issuer, image). Set `certification` to a certificate slug if it duplicates one, so it is not double counted.
- **Link, gear item, resource:** add to `content/links.ts`, `content/gear.ts` or `content/resources.ts`.
- **Stack:** `content/stack.ts`.

## Adding a blog post

1. Create `content/blog/<slug>.mdx`.
2. In `content/blog/index.ts`, add an entry to BOTH `posts` (slug, title, date, summary) and `postModules` (`"<slug>": () => import("./<slug>.mdx")`).

Both are needed: a template-string dynamic import breaks the Turbopack build when no `.mdx` files exist.

Blog posts appear in the sitemap automatically once they are in `posts`.
