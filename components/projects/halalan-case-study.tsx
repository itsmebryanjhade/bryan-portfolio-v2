import { Part } from "./part";

/** Halalan's story, in the same side-labelled layout as the rest of the project page. */
export function HalalanCaseStudy() {
  return (
    <Part id="halalan-story-title" title="The story">
      <p className="text-[15px] leading-7 text-muted">
        As an officer of our student council, I helped my team run the school election on a web system for voter
        verification and ballots, used by more than 800 students.
      </p>
      <p className="mt-3 text-sm leading-6 text-faint">More details about this project are coming.</p>
    </Part>
  );
}
