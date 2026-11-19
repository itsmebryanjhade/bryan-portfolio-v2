/** Roles shown on the home page, newest first. */
export type Experience = {
  role: string;
  org: string;
  period: string;
  /** Shown when the row is opened. */
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Frontend Developer / UI Designer",
    org: "SanX",
    period: "Aug 2026 – Now",
    points: [
      "Design user interfaces and build responsive front ends for client projects: business websites, internal management systems and mobile apps.",
      "Turn client goals into clean, usable screens, with a focus on clear structure and a good user experience.",
      "Work in a three-person, family-led team in Isabela, alongside a full-stack lead and a principal-engineer mentor.",
      "Use AI-assisted development workflows to deliver faster without trading away quality.",
    ],
  },
  {
    role: "Solo builder, first hackathon",
    org: "Product Business Edition build-off",
    period: "2026",
    points: [
      "Joined my first hackathon as a first-year student, to learn how these events work from the inside.",
      "Built my submission, PondoPath, on my own while most competitors worked in teams.",
      "PondoPath turns unpaid invoices, payment promises and upcoming expenses into one 30-day cash plan for small Philippine B2B teams.",
      "Presented and demoed it to business owners and fellow builders, followed by a five-minute Q&A.",
    ],
  },
  {
    role: "Council officer, election system",
    org: "OSC Halalan",
    period: "2025",
    points: [
      "As a student council officer, helped run my school's student election on a web-based voting system.",
      "The system handled the whole flow: student voter verification first, then the digital ballot.",
      "More than 800 students cast their votes through it in the school computer lab.",
      "Worked with my council team on election day to keep voting smooth and orderly.",
    ],
  },
];
