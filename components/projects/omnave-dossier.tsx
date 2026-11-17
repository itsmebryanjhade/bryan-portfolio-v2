"use client";

import Image from "next/image";
import { useState } from "react";

const screens = [
  {
    label: "Upload",
    image: "/images/projects/omnave-upload-current.jpg",
    alt: "Omnave checking its upload service while a PDF study kit is processed",
    caption: "Upload a course PDF, see plan limits clearly, and follow each processing stage in real time.",
  },
  {
    label: "Study guide",
    image: "/images/projects/omnave-guide.jpg",
    alt: "A generated Omnave study guide open on a phone",
    caption: "Read the material as a structured, focused guide.",
  },
  {
    label: "Flashcards",
    image: "/images/projects/omnave-flashcards.jpg",
    alt: "An Omnave flashcard with study progress and recall choices",
    caption: "Move from reading to active recall with flashcards.",
  },
  {
    label: "Practice quiz",
    image: "/images/projects/omnave-quiz.jpg",
    alt: "An Omnave practice quiz question with an answer field",
    caption: "Check understanding with questions generated from the lesson.",
  },
  {
    label: "Ask AI",
    image: "/images/projects/omnave-chat.jpg",
    alt: "Omnave's in-lesson AI study companion and suggested questions",
    caption: "Ask follow-up questions without leaving the lesson.",
  },
] as const;

const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-faint";

export function OmnaveDossier() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];

  return (
    <section aria-labelledby="omnave-flow-title" className="mt-10 grid gap-8 md:grid-cols-[1fr_auto]">
      <div>
        <h2 id="omnave-flow-title" className={label}>
          Explore the flow <span aria-hidden="true">01—05</span>
        </h2>
        <div role="group" aria-label="Explore Omnave screens" className="mt-4 flex flex-col gap-2">
          {screens.map((item, index) => (
            <button
              type="button"
              key={item.label}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className="flex min-h-11 items-center gap-3 rounded-card border border-border bg-card px-4 text-left text-sm text-muted transition-colors duration-150 hover:border-border-hover hover:bg-hover hover:text-fg aria-pressed:border-border-hover aria-pressed:bg-hover aria-pressed:text-fg"
            >
              <span className="font-mono text-[11px] text-faint">0{index + 1}</span>
              <span>{item.label}</span>
              <span className="ml-auto" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[272px]">
        <div className={`mb-2 flex justify-between ${label}`}>
          <span>Product view / {String(selected + 1).padStart(2, "0")}</span>
          <span>Omnave / mobile</span>
        </div>
        <div className="relative aspect-[9/19] overflow-hidden rounded-card border border-border bg-panel">
          <Image src={screen.image} alt={screen.alt} fill sizes="272px" className="object-cover object-top" />
        </div>
        <p className="mt-3 text-sm leading-6 text-muted" aria-live="polite">
          <span className={`${label} block`}>0{selected + 1} / {screen.label}</span>
          {screen.caption}
        </p>
      </div>
    </section>
  );
}
