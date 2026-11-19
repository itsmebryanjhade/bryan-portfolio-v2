import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/**
 * A small back link, the first line of a page, right above the title.
 * Goes to Home, or to the parent list on detail pages.
 */
export function BackButton({ href = "/", label = "Home" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="group -ml-1 mb-5 inline-flex items-center gap-0.5 text-[14.5px] text-faint transition-colors duration-150 hover:text-fg"
    >
      <ChevronLeft
        size={17}
        strokeWidth={1.8}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none"
      />
      {label}
    </Link>
  );
}
