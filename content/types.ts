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
};

export type Certification = {
  slug: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  imageAlt: string;
  pdf: string;
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
  category: "Frontend" | "Backend & data" | "AI" | "Tools";
};

export type ListItem = {
  name: string;
  category: string;
  href?: string;
  note?: string;
};

export type Profile = {
  name: string;
  roleLine: string;
  intro: Array<string | { pill: string; icon: "code" | "monitor" | "sparkles" | "vote" }>;
  email: string;
  socials: { label: string; href: string }[];
  availability: string;
  journey: { year: string; title: string; detail: string }[];
  education: { school: string; program: string; note?: string }[];
};
