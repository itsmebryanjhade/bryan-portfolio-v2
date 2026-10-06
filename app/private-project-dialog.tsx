"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

export function PrivateProjectDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDialog();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function closeDialog() {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function handleBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) closeDialog();
  }

  return (
    <>
      <button ref={triggerRef} type="button" className="preview-project preview-project-private" data-reveal aria-haspopup="dialog" aria-expanded={open} aria-describedby="halalan-access" onClick={() => setOpen(true)}>
        <span className="preview-project-content">{children}</span>
        <span className="visually-hidden" id="halalan-access">Preview only. This school system is private and has no public live link. Open the private project brief.</span>
      </button>

      {open && <div className="private-dialog-overlay" onMouseDown={handleBackdrop}>
        <div className="private-dialog" role="dialog" aria-modal="true" aria-labelledby="halalan-dialog-title" aria-describedby="halalan-dialog-summary">
          <div className="private-dialog-bar"><span>02.A / PRIVATE CASE NOTE</span><span>PREVIEW DOCUMENTATION ONLY</span><button ref={closeRef} type="button" onClick={closeDialog} aria-label="Close OSC Halalan project brief">×</button></div>
          <div className="private-dialog-body">
            <div className="private-dialog-visual"><Image src="/images/projects/halalan-2026-preview.png" alt="OSC Halalan 2026 student voter verification interface" fill sizes="(max-width: 640px) 90vw, 44vw" /></div>
            <div className="private-dialog-copy">
              <p className="mono-label">School election / Private</p>
              <h2 id="halalan-dialog-title">OSC Halalan 2026</h2>
              <p id="halalan-dialog-summary">A focused school-election workflow for verifying student voters and guiding them into the ballot process.</p>
              <dl>
                <div><dt>Purpose</dt><dd>Support a clearer, more controlled voting experience for a school election.</dd></div>
                <div><dt>Core flow</dt><dd>Student voter verification followed by private ballot access.</dd></div>
                <div><dt>Privacy boundary</dt><dd>No public deployment, credentials, voter information, or operational access is shared.</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
