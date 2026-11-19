"use client";

// Must be a client component: `typeof window` is always undefined in a server component.
// text/javascript on the server runs the script; text/plain on the client avoids React's
// "script tag while rendering" dev warning. See preventing-flash-before-hydration.md.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
