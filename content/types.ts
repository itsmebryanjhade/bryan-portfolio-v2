export type ProjectStatus = "Live" | "Live beta" | "Case study" | "Private";
export type ProjectKind = "Personal" | "School project" | "Hackathon" | "School council";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  status: ProjectStatus;
  kind: ProjectKind;
  team: boolean;
  featured: boolean;
  href?: string;
  repo?: string;
  image: string;
  imageAlt: string;
  stack: string[];
  hasDetail: boolean;
  note?: string;
  /** Detail page: what someone can do with it, one short line each. */
  highlights?: string[];
  /** Detail page: who built it and how, in a sentence or two. */
  role?: string;
};

export type Certification = {
  slug: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  imageAlt: string;
  pdf: string;
  /** Hide from the site without deleting it (set back to false to show it again). */
  hidden?: boolean;
  /** Groups the certifications page. */
  topic: "AI" | "Computer science" | "Game development";
  featured: boolean;
  note?: string;
};

/** `certification` is a `Certification.slug` when the badge duplicates a certificate. */
export type Badge = {
  name: string;
  issuer: string;
  image: string;
  certification?: string;
};

export type StackItem = {
  name: string;
  category: "Languages" | "Frontend" | "Backend & data" | "AI" | "Tools";
  /** Where it was learned, shown on hover. */
  from: string;
  /** Still being learned (in-progress course), drawn as a dashed tag. */
  learning?: boolean;
};

export type ListItem = {
  name: string;
  category: string;
  href?: string;
  note?: string;
  /** Text to copy on click instead of opening a link (e.g. a Discord username). */
  copy?: string;
};

export type Profile = {
  name: string;
  roleLine: string;
  intro: Array<string | { pill: string; icon: "code" | "monitor" | "sparkles" | "vote" }>;
  /** Continues the intro; the home page fades out partway through it, the About page shows it whole. */
  introMore: string;
  /** One short status line for the sidebar footer. */
  status: string;
  email: string;
  socials: { label: string; href: string }[];
  availability: string;
  journey: { year: string; title: string; detail: string }[];
  education: { school: string; program: string; note?: string }[];
};
