"use client";

import Image from "next/image";
import { useState } from "react";
import { Part } from "./part";

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

/**
 * Omnave's study flow: pick a step on the left, see that screen on a phone standing on the
 * site's dot-grid stage. Black-and-white at rest, colour on hover, like the other project shots.
 */
export function OmnaveDossier() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];

  return (
    <Part id="omnave-flow-title" title="The flow">
      <div className="grid gap-6 md:grid-cols-[1fr_250px]">
        <div role="group" aria-label="Explore Omnave screens" className="flex flex-col gap-2">
          {screens.map((item, index) => (
            <button
              type="button"
              key={item.label}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className="group/step flex min-h-12 items-center gap-3 rounded-card border border-border bg-card px-4 text-left text-sm text-muted transition-colors duration-150 hover:border-border-hover hover:text-fg aria-pressed:border-border-hover aria-pressed:bg-hover aria-pressed:text-fg"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 flex-none rounded-full bg-border-hover transition-colors duration-150 group-aria-pressed/step:bg-fg"
              />
              <span>{item.label}</span>
            </button>
          ))}
          <p className="mt-3 text-sm leading-6 text-muted" aria-live="polite">
            {screen.caption}
          </p>
        </div>

        <div className="group relative overflow-hidden rounded-[22px] border border-border bg-card px-6 pt-7">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--color-fg)_20%,transparent)_1px,transparent_1.2px)] bg-[length:12px_12px] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
          />
          <div className="relative mx-auto aspect-[9/17] w-full max-w-[200px] overflow-hidden rounded-t-[26px] border-[5px] border-b-0 border-border-hover bg-panel transition-[translate] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5 motion-reduce:transition-none">
            <Image
              key={screen.image}
              src={screen.image}
              alt={screen.alt}
              fill
              sizes="200px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </Part>
  );
}
