import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-5 py-24 sm:px-8">
      <p className="font-serif text-8xl text-fg">404</p>
      <h1 className="mt-4 text-lg text-muted">This page could not be found.</h1>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-150 hover:text-fg"
      >
        Back home <span aria-hidden="true">&nbsp;→</span>
      </Link>
    </div>
  );
}
