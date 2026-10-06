"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { id: "top", label: "Profile" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "feature", label: "Omnave" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

const sectionOrder = ["top", "work", "about", "feature", "credentials", "contact"] as const;

export function SectionNav() {
  const [activeId, setActiveId] = useState<string>("top");
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const readingLine = Math.min(window.innerHeight * 0.28, 210);
      let current = "top";

      for (const id of sectionOrder) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) current = id;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = "contact";
      }

      setActiveId(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <nav aria-label="Primary navigation">
        {links.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={activeId === id ? "location" : undefined}>{label}</a>)}
      </nav>
      <details className="mobile-nav" ref={menuRef}>
        <summary>Menu</summary>
        <div>
          {links.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={activeId === id ? "location" : undefined} onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>{label}</a>)}
        </div>
      </details>
    </>
  );
}
