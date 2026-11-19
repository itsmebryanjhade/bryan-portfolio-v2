import * as React from "react";

type VT = React.ComponentType<React.ViewTransitionProps>;
// Next's bundled React has <ViewTransition>; plain React (tests) may not, so fall back to no animation.
const ViewTransition = (React as unknown as { ViewTransition?: VT }).ViewTransition;

/**
 * Marks an element as the same object across pages: give the thumbnail and its big version the same
 * `name`, and the browser morphs one into the other during navigation (see `.morph` in globals.css).
 * `default="none"` keeps it still during unrelated transitions.
 */
export function Morph({ name, children }: { name: string; children: React.ReactNode }) {
  if (!ViewTransition) return <>{children}</>;
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
