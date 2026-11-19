"use client";

import { useState } from "react";

/**
 * A gear tile's list item. With a mouse, hover drives its effects (colour, the monitor turning on,
 * the keyboard wave). On touch, tapping the tile toggles the same effects through [data-tapped]
 * (see globals.css), since phones have no hover.
 */
export function TapTile({ className, children }: { className: string; children: React.ReactNode }) {
  const [tapped, setTapped] = useState(false);
  return (
    <li
      className={`press ${className}`}
      data-tapped={tapped ? "" : undefined}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") setTapped((t) => !t);
      }}
    >
      {children}
    </li>
  );
}
