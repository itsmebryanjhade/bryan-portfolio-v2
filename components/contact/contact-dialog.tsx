"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { profile } from "@/content/profile";
import { FOCUSABLE } from "@/lib/focus";

const field =
  "w-full rounded-nav border border-border bg-bg px-3 text-sm text-fg outline-none transition-colors duration-150 placeholder:text-faint hover:border-border-hover focus:border-fg/60";

/** Builds the mailto link the form opens: subject names the sender, body carries the message and a reply address. */
export function buildMailto(to: string, data: { first: string; last: string; email: string; message: string }) {
  const name = `${data.first} ${data.last}`.trim();
  const subject = `Hello from ${name}`;
  const body = `${data.message}\n\n— ${name}\n${data.email}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLFormElement>(null);
  const titleId = useId();

  // Focus the first field on open; give focus back to whatever opened the dialog on close.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("input")?.focus();
    return () => {
      if (opener?.isConnected) opener.focus();
    };
  }, [open]);

  if (!open) return null;

  function onKeyDown(e: React.KeyboardEvent) {
    // Keep keys from reaching a parent dialog (the mobile drawer) through the portal.
    e.stopPropagation();
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== "Tab") return;
    const els = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!els || els.length === 0) return;
    const firstEl = els[0];
    const lastEl = els[els.length - 1];
    if ((e.shiftKey && document.activeElement === firstEl) || (!e.shiftKey && document.activeElement === lastEl)) {
      e.preventDefault();
      (e.shiftKey ? lastEl : firstEl).focus();
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    window.location.href = buildMailto(profile.email, {
      first: get("first"),
      last: get("last"),
      email: get("email"),
      message: get("message"),
    });
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <form
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={onSubmit}
        className="relative w-full max-w-md rounded-[18px] border border-border bg-panel p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="font-serif text-2xl leading-none text-fg">
              Let&apos;s <i>talk</i>
            </h2>
            <p className="mt-2 font-mono text-[11px] text-faint">{profile.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-nav border border-border text-muted transition-colors duration-150 hover:border-border-hover hover:bg-hover hover:text-fg"
          >
            <X size={16} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5 text-xs text-muted">
            First name
            <input name="first" required autoComplete="given-name" className={`${field} h-10`} />
          </label>
          <label className="flex flex-col gap-1.5 text-xs text-muted">
            Last name
            <input name="last" autoComplete="family-name" className={`${field} h-10`} />
          </label>
          <label className="col-span-2 flex flex-col gap-1.5 text-xs text-muted">
            Email
            <input name="email" type="email" required autoComplete="email" className={`${field} h-10`} />
          </label>
          <label className="col-span-2 flex flex-col gap-1.5 text-xs text-muted">
            Message
            <textarea name="message" required rows={5} className={`${field} resize-none py-2.5 leading-relaxed`} />
          </label>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-[11px] leading-snug text-faint">Opens your email app with this message ready to send.</p>
          <button
            type="submit"
            className="inline-flex h-10 flex-none items-center rounded-pill bg-fg px-5 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-85"
          >
            Send
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
