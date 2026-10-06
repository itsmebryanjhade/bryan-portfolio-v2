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

export function OmnaveDossier() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];

  return (
    <section className="feature omnave-feature page-grid" id="feature" aria-labelledby="feature-section-title">
      <div className="section-chapter-heading">
        <div className="chapter-heading"><span>04 /</span><h2 id="feature-section-title">Featured Project</h2></div>
        <span className="section-rule" aria-hidden="true" />
      </div>

      <div className="omnave-story">
        <p className="mono-label">Project 001 / PWA / 2026</p>
        <h3>Omnave<span className="omnave-title-dot">.</span></h3>
        <p className="omnave-deck">A PDF is only the starting point.</p>
        <p className="omnave-summary">Omnave turns course material into study guides, spaced flashcards, practice quizzes, and document-aware AI conversations. Its PWA keeps cached study material available offline and safely synchronizes progress when the connection returns.</p>
        <a className="omnave-launch" href="https://omnave.vercel.app/" target="_blank" rel="noreferrer">Explore the live PWA <span aria-hidden="true">↗</span></a>

        <div className="omnave-selector" role="group" aria-label="Explore Omnave screens">
          <p className="mono-label">Explore the flow <span>01—05</span></p>
          {screens.map((item, index) => (
            <button
              className="omnave-step"
              type="button"
              key={item.label}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <span className="omnave-step-number">0{index + 1}</span>
              <span>{item.label}</span>
              <span className="omnave-step-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>

      <div className="omnave-visual">
        <div className="omnave-visual-top"><span>Product view / {String(selected + 1).padStart(2, "0")}</span><span>Omnave / mobile</span></div>
        <div className="omnave-device">
          <div className="omnave-screen"><Image src={screen.image} alt={screen.alt} fill sizes="(max-width: 40rem) 240px, 272px" /></div>
        </div>
        <p className="omnave-screen-caption" aria-live="polite"><span>0{selected + 1} / {screen.label}</span>{screen.caption}</p>
      </div>
    </section>
  );
}
