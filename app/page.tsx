import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { TerminalShell } from "./terminal-shell";
import { SectionNav } from "./section-nav";
import { OmnaveDossier } from "./omnave-dossier";
import { ScrollReveal } from "./scroll-reveal";
import { PrivateProjectDialog } from "./private-project-dialog";

type Project = {
  index: string;
  title: string;
  discipline: string;
  description: string;
  year: string;
  href?: string;
  image: string;
  alt: string;
  imagePosition?: string;
  imageShape: "portrait" | "landscape" | "wide" | "framori";
  latest?: boolean;
  private?: boolean;
  status?: string;
};

const projects: Project[] = [
  { index: "01", title: "Omnave", discipline: "AI study companion / PWA", description: "Turns course PDFs into study guides, spaced flashcards, practice quizzes, and document-aware AI conversations—with offline review and secure sync.", year: "2026", href: "https://omnave.vercel.app/", status: "Live beta", image: "/images/projects/omnave-preview-new.png", alt: "New Omnave AI study companion landing page", imageShape: "landscape", latest: true },
  { index: "02", title: "kisap.", discipline: "Private photo booth / Web app", description: "Captures four photos and the ten seconds around each moment, then creates a personalized strip and GIF entirely on the user's device.", year: "2026", href: "https://kisap.vercel.app/", status: "Live", image: "/images/projects/kisap-preview.png", alt: "Kisap private web photo booth landing page", imageShape: "landscape" },
  { index: "03", title: "OSC Halalan 2026", discipline: "School election / Private", description: "A private school voting flow for student voter verification and ballots.", year: "2026", image: "/images/projects/halalan-2026-preview.png", alt: "OSC Halalan 2026 voter verification screen", private: true, imageShape: "landscape" },
  { index: "04", title: "Framori", discipline: "Batch photo framing / Web app", description: "Matches photos with portrait or landscape event frames and exports the finished batch in one ZIP.", year: "2026", href: "https://framori.vercel.app/", image: "/images/projects/framori-preview.png", alt: "Framori batch photo framing website", imageShape: "framori" },
];

function SectionMarker({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="section-marker" data-reveal aria-hidden="true"><span>{index} / {children}</span><span className="section-rule" /></div>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Bryan Jhade, back to top">Bryan Jhade</a>
        <SectionNav />
        <ThemeToggle />
      </header>

      <main id="main">
        <section className="hero page-grid" id="top" aria-labelledby="hero-title">
          <div className="hero-name">
            <h1 id="hero-title"><span>Bryan</span><span>Jhade.</span></h1>
            <div className="identity-stack"><strong>Designer <i>+</i> Developer</strong></div>
            <div className="hero-description"><p>I build software, interfaces, and digital systems while exploring AI, frontend engineering, and security.</p><p>Student builder focused on practical projects, thoughtful interfaces, and emerging technology.</p></div>
            <div className="hero-personal-meta"><span>Philippines</span><span>BS Information Technology — AI PPD</span></div>
            <div className="hero-links" aria-label="Social and contact links">
              <a href="https://github.com/codebyjhade" target="_blank" rel="noreferrer"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.89 2.03 3.4 1.5.1-.74.4-1.25.72-1.54-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.06 1.14a10.6 10.6 0 0 1 5.58 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg><span>GitHub</span><span aria-hidden="true">↗</span></a>
              <a href="mailto:bryanjhade.e@gmail.com"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="m3.5 6 8.5 7 8.5-7" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg><span>Email</span><span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <figure className="portrait-figure">
            <div className="portrait-frame"><Image src="/profile.png" alt="Portrait of Bryan Jhade" fill priority unoptimized sizes="(max-width: 640px) 82vw, (max-width: 900px) 42vw, 28vw" /></div>
            <figcaption><span>Fig. 001</span><span>Bryan Jhade</span></figcaption>
          </figure>

          <aside className="technical-rail" aria-label="Current profile details">
            <div><span>Status</span><strong><b aria-hidden="true" /> Available</strong></div>
            <div><span>Base</span><strong>Philippines</strong></div>
            <div><span>Current</span><strong>BS Information Technology<br />AI PPD</strong></div>
            <div><span>Focus</span><strong>Software<br />AI<br />Frontend</strong></div>
          </aside>

        </section>

        <section className="selected-work-section page-grid" id="work" aria-labelledby="work-title">
          <div className="hero-work-preview">
            <div className="preview-heading" data-reveal><div className="chapter-heading"><span>02 /</span><h2 id="work-title">Selected Projects</h2></div><span className="section-rule" aria-hidden="true" /></div>
            {projects.map((project) => {
              const content = <><span>0{project.index}</span><strong>{project.title}{project.latest && <span className="project-latest">Latest</span>}</strong><em>{project.discipline}</em><small>{project.status ?? (project.private ? "Preview only" : project.year)}</small><b aria-hidden="true">{project.href ? "↗" : "◉"}</b><span className="work-hover-preview" aria-hidden="true"><span className="project-hover-copy"><span className="mono-label">Project / 0{project.index}</span><strong>{project.title}</strong><span>{project.discipline}</span><p>{project.description}</p>{project.latest && <span className="project-hover-tag">INSTALLABLE PWA</span>}{project.status && <span className="project-hover-tag">{project.status}</span>}{project.private && <span className="project-hover-tag">PRIVATE SYSTEM / PREVIEW ONLY</span>}</span><span className={`project-preview-image project-preview-image-${project.imageShape}`}><Image src={project.image} alt="" fill sizes="(max-width: 640px) 80vw, 22rem" style={{ objectPosition: project.imagePosition ?? "center top" }} /></span></span><span className="work-inline-preview" aria-hidden="true"><Image src={project.image} alt="" fill sizes="4rem" style={{ objectPosition: project.imagePosition ?? "center top" }} /></span></>;
              return project.href
                ? <a href={project.href} className="preview-project" data-reveal key={project.index} target="_blank" rel="noreferrer" aria-label={`${project.title} — ${project.discipline}, opens in a new tab`}><span className="preview-project-content">{content}</span><span className="visually-hidden">Preview: {project.alt}</span></a>
                : <PrivateProjectDialog key={project.index}>{content}</PrivateProjectDialog>;
            })}
          </div>
        </section>

        <section className="about-section page-grid" id="about" aria-labelledby="about-title">
          <div className="about-heading" data-reveal><div className="chapter-heading"><span>03 /</span><h2 id="about-title">About</h2></div><span className="section-rule" aria-hidden="true" /></div>
          <p className="about-statement" data-reveal>I’m still learning.<br />I build to find out.</p>
          <div className="about-copy">
            <div className="about-note"><span>01 / The person</span><p>I’m Bryan Jhade Bugauisan-Ebuan, an Information Technology student from the Philippines. I move between code and visual design because I care how a product works and how it feels to use.</p></div>
            <div className="about-note"><span>02 / Current questions</span><p>I’m exploring how AI can become useful software and how to build safer systems. Omnave makes that practical: turning PDFs into study kits has me thinking about clear flows, useful feedback, and reliability—not just the model’s response.</p><a className="about-project-link" href="https://omnave.vercel.app/" target="_blank" rel="noreferrer">See Omnave <span aria-hidden="true">↗</span></a></div>
            <div className="about-note"><span>03 / Outside code</span><p>Photography and video keep my eye on composition, rhythm, and story. Those interests shape the details I notice when I build.</p></div>
          </div>
          <dl className="about-details">
            <div><dt>Program</dt><dd>BS Information Technology<br />AI-Powered Product Development</dd></div>
            <div><dt>School</dt><dd>Mapúa Malayan Digital College (MMDC)</dd></div>
            <div><dt>Academic context</dt><dd>MMDC collaborates with Arizona State University (ASU)</dd></div>
          </dl>
        </section>

        <section className="toolchain-strip page-grid" aria-labelledby="toolchain-title">
          <h2 id="toolchain-title">Toolchain / in use</h2>
          <ul aria-label="Tools and technologies Bryan uses">
            <li>HTML / CSS</li>
            <li>JavaScript / TypeScript</li>
            <li>React / Next.js</li>
            <li>Firebase / Supabase</li>
            <li>Python / FastAPI</li>
            <li>Git / GitHub</li>
            <li>Tailwind CSS</li>
            <li>Gemini / Groq APIs</li>
          </ul>
        </section>

        <OmnaveDossier />

        <section className="credentials-section page-grid" id="credentials" aria-labelledby="credentials-title">
          <div className="section-chapter-heading credentials-heading" data-reveal>
            <div className="chapter-heading"><span>05 /</span><h2 id="credentials-title">Selected Credentials</h2></div>
            <span className="section-rule" aria-hidden="true" />
          </div>
          <div className="credentials-intro">
            <p className="mono-label">Learning, applied</p>
            <p className="credentials-statement">A few signals.<br />The work comes first.</p>
            <p>Selected training that supports the way I design, build, and experiment.</p>
          </div>
          <div className="credential-grid">
            <a className="credential-card" href="/certificates/bryan-ebuan-google-ai-professional.pdf" target="_blank" rel="noreferrer">
              <span className="credential-image"><Image src="/images/google-ai-professional-certificate.png" alt="Google AI Professional Certificate awarded to Bryan Jhade Ebuan" fill sizes="(max-width: 640px) 100vw, 32vw" /></span>
              <span className="credential-meta"><span>Google / Coursera · 2026</span><strong>Google AI Professional Certificate</strong><small>8-course professional certificate</small></span>
              <span className="credential-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="credential-card" href="/certificates/bryan-ebuan-dict-game-development.pdf" target="_blank" rel="noreferrer">
              <span className="credential-image"><Image src="/images/dict-game-development-certificate.png" alt="DICT game development certificate awarded to Bryan Jhade Ebuan" fill sizes="(max-width: 640px) 100vw, 32vw" /></span>
              <span className="credential-meta"><span>DICT Region VIII · 2026</span><strong>Press Start: Game Development</strong><small>Certificate of participation</small></span>
              <span className="credential-arrow" aria-hidden="true">↗</span>
            </a>
            <div className="credential-card credential-card-placeholder" aria-label="More credentials will be added later">
              <span className="credential-placeholder-mark">+</span>
              <span className="credential-meta"><span>Archive / Growing</span><strong>More credentials soon.</strong><small>A full credentials view will be added as the collection grows.</small></span>
            </div>
          </div>
        </section>

        <section className="contact-section page-grid" id="contact" aria-labelledby="contact-title">
          <SectionMarker index="06">Contact</SectionMarker>
          <div className="contact-statement" data-reveal>
            <p className="mono-label contact-kicker">Open channel / 2026</p>
            <h2 id="contact-title">Bring the problem.<br />Let’s find the signal.</h2>
            <p>I care about useful ideas, clear interfaces, and software that earns its place. If that sounds like what you need, send the first signal.</p>
          </div>
          <div className="contact-console" data-reveal aria-label="Choose a contact route">
            <div className="contact-console-bar"><span><i /><i /><i /></span><span>jhade@portfolio:~/contact</span><span>LOCAL / SECURE</span></div>
            <p className="contact-command"><span>guest@portfolio:~$</span> select --route</p>
            <a className="contact-route" href="mailto:bryanjhade.e@gmail.com?subject=Role%20opportunity%20for%20Bryan%20Jhade">
              <span className="contact-route-index">01</span><span><strong>Hire</strong><small>Junior frontend, full-stack, or AI-powered product roles</small></span><b aria-hidden="true">↗</b>
            </a>
            <a className="contact-route" href="mailto:bryanjhade.e@gmail.com?subject=Project%20collaboration%20with%20Bryan%20Jhade">
              <span className="contact-route-index">02</span><span><strong>Collaborate</strong><small>Web apps, interfaces, prototypes, and focused AI integrations</small></span><b aria-hidden="true">↗</b>
            </a>
            <div className="contact-console-foot"><span>STATUS: READY</span><a href="https://github.com/codebyjhade" target="_blank" rel="noreferrer">GITHUB / CODEBYJHADE ↗</a></div>
          </div>
          <div className="contact-status" aria-label="Availability"><span><b aria-hidden="true" /> Available</span><span>Philippines / Remote</span><a href="mailto:bryanjhade.e@gmail.com">bryanjhade.e@gmail.com</a></div>
        </section>
      </main>

      <footer className="footer"><span>© 2026 Bryan Jhade</span><span>Design × Build × Experiment</span><a href="#top">Back to top ↑</a></footer>
      <TerminalShell />
      <ScrollReveal />
    </>
  );
}
