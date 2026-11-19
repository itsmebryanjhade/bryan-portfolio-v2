# Sidebar: "Quiet Panel" (short design)

**Date:** 2026-11-18 · **Status:** approved by Bryan ("build it now") · **Size:** small change

## Intent
The current sidebar works but reads as a copy of the references. Bryan wants it simple, elegant, easy to read and navigate, and cool. He chose option **G, "Quiet Panel"**, out of 16 explored (mockup: `.superpowers/brainstorm/512-1794969769/content/simple-sidebars.html`).

## Approaches
- **Restyle the existing `components/shell/sidebar.tsx` in place (chosen).** It is shared by the desktop sidebar and the mobile drawer, so one change covers both. Counts, "soon" tags, Ctrl K and the theme all keep working.
- Rebuild a new nav component: rejected. It's more work for the same result.
- Change placement (top pill, dock, island, etc.): considered as options J–P. Bryan chose to keep a sidebar.

## Design
- **Shape:** a floating rounded panel (18px radius) inset 14px from the viewport edge on desktop, with a soft shadow and a 1px border. It replaces the full-height strip.
- **Top:**
  - Serif "Bryan *Jhade*" (Newsreader, italic "Jhade") replaces the avatar/name/role block.
  - A bordered **Contact me** button with a mail icon (mailto).
  - Search with the Ctrl K hint.
- **Lists:**
  - "Portfolio" / "Explore" labels in quiet sans, not uppercase mono.
  - Icon + label + count rows, 38px or taller (44px min in the drawer, for touch).
- **Signature 1, gliding highlight:** one highlight element moves (transform only) to the hovered or focused item and settles back on the current page. It is instant under `prefers-reduced-motion`.
- **Footer:**
  - Green dot + "Available".
  - **Signature 2, live Manila clock:** `Asia/Manila`, en-US, updates every minute, rendered only after mount to avoid hydration mismatch.
  - A row of small icon buttons: theme toggle, GitHub, LinkedIn, email. External links keep the sr-only "(opens in a new tab)".
- **Mobile:** the same panel content inside the existing drawer.

## Non-goals
Collapse button, peek cards, and any change to routes, the palette, the terminal or other pages.

## Constraints
- Tokens only (no raw hex).
- Keep a11y: `aria-current`, focus rings, 44px touch targets, and the existing sidebar/drawer tests passing (update the ones that assert removed elements).
- Do not commit or merge; changes stay uncommitted for Bryan to review.
