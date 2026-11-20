"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Certification } from "@/content/types";

/**
 * Certificates as cards: a full preview (black-and-white until hover), then the title and issuer.
 * Clicking one opens it large in an in-page viewer; nothing downloads.
 */
export function CertGrid({ certs, verified = [] }: { certs: Certification[]; verified?: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const openers = useRef<(HTMLButtonElement | null)[]>([]);

  function close() {
    const i = open;
    setOpen(null);
    if (i !== null) openers.current[i]?.focus();
  }

  return (
    <>
      <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-6 p-0 sm:grid-cols-3 sm:gap-4">
        {certs.map((c, i) => (
          <li key={c.slug}>
            <button
              ref={(el) => {
                openers.current[i] = el;
              }}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View ${c.title}`}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-[1.414/1] overflow-hidden rounded-card border border-border bg-white p-1 transition-[transform,translate,scale,rotate,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 group-hover:border-border-hover motion-reduce:transition-none">
                <span className="relative block h-full w-full">
                  <Image
                    loading="eager"
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    sizes="(min-width: 640px) 220px, 100vw"
                    className="object-contain grayscale transition-[filter] duration-700 group-hover:grayscale-0 group-focus-visible:grayscale-0 motion-reduce:transition-none"
                  />
                </span>
              </span>
              <span className="mt-2.5 block text-[13px] leading-snug text-fg sm:mt-3 sm:text-sm">{c.title}</span>
              <span className="mt-0.5 block text-[11px] text-faint sm:text-xs">
                {c.issuer} · {c.year}
                {verified.includes(c.slug) && <span> · Verified badge</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <CertViewer cert={certs[open]} onClose={close} />}
    </>
  );
}

/** Large view of one certificate. Closes with the X, Escape, or a click outside. */
export function CertViewer({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8">
      <button type="button" tabIndex={-1} aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-bg/80 backdrop-blur-sm" />
      <div role="dialog" aria-modal="true" aria-label={cert.title} className="relative w-full max-w-3xl">
        <div className="relative aspect-[1.414/1] overflow-hidden rounded-[14px] bg-white p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
          <div className="relative h-full w-full">
            <Image src={cert.image} alt={cert.imageAlt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-contain" />
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[15px] text-fg">{cert.title}</p>
            <p className="mt-0.5 text-xs text-faint">
              {cert.issuer} · {cert.year}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-pill border border-border text-muted transition-colors hover:border-border-hover hover:text-fg"
          >
            <X size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
