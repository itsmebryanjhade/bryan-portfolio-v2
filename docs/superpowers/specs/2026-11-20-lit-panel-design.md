# Edge-lit sidebar: surface rework (short design)

## Why
On the live site the grain did the job tone should do: about twice as strong as the reference
(page 4.0 vs 2.2, sidebar 6.6 vs 4.1) while the sidebar was only +4 brightness above the page.
A first pass lifted the sidebar into a lighter grey card, which fixed the numbers but read as a copy of
marwieang.com's panel. Bryan wants the sidebar to stand out with the site's own identity.

## Goals / non-goals
- Goal: sidebar (and phone menu) clearly distinct from the page, by light rather than a lighter fill.
- Goal: calm page grain (std-dev about 2), a step stronger grain inside the panel.
- Goal: larger, bolder nav type.
- Non-goal: layout, content, navigation or motion changes. Anti-goal: a lighter grey card (their recipe).

## Approaches considered
- Lifted lit card (built, then rejected): reads as the reference's recipe.
- **Edge-lit slab (chosen):** the panel keeps the page's dark tone; light catches its rim, brightest at the
  top-left corner and fading around the sides, with a faint sheen just inside that corner. Ties to the
  Gear lamp: the lamp lights edges, not surfaces.
- Recessed well (sidebar sunk into the page): distinct but quieter. Film strip (sprocket holes): most
  on-theme but risks looking gimmicky.

## Design
- **Page:** grain about 2, gentle edge vignette, existing top light pool.
- **Slab** (`.edge-lit`, desktop sidebar and phone menu): fill about the page's tone; 1px rim drawn as a
  gradient border (hot top-left → cool sides → slight return at the far corner); radial sheen inside the
  top-left; soft deep shadow; own grain about 3.5.
- **Current page:** a "lit groove" (`.lit-groove`): a fill fading to the right plus a hairline rim lit at
  its top-left, echoing the slab. Used by the gliding pill and the phone menu's current row.
- **Type:** nav labels 13.5 → 15px medium (phone menu 14 → 16px), current page semibold, section labels
  12.5px medium, footer text a step larger and semibold where it was medium.
- **Light theme:** the same idea in reverse: near-white slab with a dark rim catching at the top-left.
