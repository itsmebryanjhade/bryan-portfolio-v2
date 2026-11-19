import type { ShelfItem } from "@/components/home/app-shelf";
import { getProject } from "@/lib/content";

/** The three standout projects, shown as gradient cards on the home page and the Projects page. */
export const standouts: ShelfItem[] = [
  {
    project: getProject("omnave")!,
    meta: "Live beta · AI study app",
    blurb: "Turns your notes and PDFs into flashcards and quizzes, then keeps you reviewing until it sticks.",
    gradient: "linear-gradient(140deg, #3b2775 0%, #6a47a8 38%, #c4527a 72%, #f4a04a 100%)",
    logo: "/images/logos/omnave.png",
    actions: [{ kind: "play-soon" }, { kind: "web", href: getProject("omnave")!.href! }],
  },
  {
    project: getProject("pondopath")!,
    meta: "Live · First hackathon",
    blurb: "A 30-day cash plan for small Philippine B2B teams.",
    gradient: "linear-gradient(140deg, #0e3527 0%, #1e5341 55%, #5f8f78 100%)",
    logo: "/images/logos/pondopath-mark.png",
    actions: [{ kind: "web", href: getProject("pondopath")!.href! }],
  },
  {
    project: getProject("osc-halalan-2026")!,
    meta: "Case study · 800+ voters",
    blurb: "The voting system my school council ran its election on.",
    gradient: "linear-gradient(140deg, #10173a 0%, #222e66 55%, #9c7a2c 100%)",
    logo: "halalan",
    actions: [{ kind: "case", href: "/projects/osc-halalan-2026" }],
  },
];
