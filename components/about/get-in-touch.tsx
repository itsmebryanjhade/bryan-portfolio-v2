"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { ContactDialog } from "@/components/contact/contact-dialog";

export function GetInTouch() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-pill bg-fg px-5 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-85"
      >
        <Mail size={16} strokeWidth={1.6} aria-hidden="true" />
        Get in touch
      </button>
      <ContactDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
