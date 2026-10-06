"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent, MouseEvent } from "react";

type Entry = { command?: string; output: string };

const commandHelp = `AVAILABLE COMMANDS
  help          show this command list
  ls            list portfolio directories
  pwd           print the current path
  whoami        identify the portfolio owner
  neofetch      display the builder profile
  work          open selected work
  omnave        open the featured case study
  about         open the about section
  stack         print the active toolchain
  credentials   open selected credentials
  contact       open contact
  clear         clear terminal output`;

export function TerminalShell() {
  const [open, setOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [entries, setEntries] = useState<Entry[]>([
    { output: "BryanOS portfolio shell [Version 2026.10]\nType 'help' to list commands." },
  ]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [entries, open]);

  function closeTerminal() {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeTerminal();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled])"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) closeTerminal();
  }

  function handleCommandKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      if (!commandHistory.length) return;
      event.preventDefault();
      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCommand(commandHistory[nextIndex]);
      return;
    }
    if (event.key === "ArrowDown" && historyIndex !== null) {
      event.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setCommand("");
      } else {
        setHistoryIndex(nextIndex);
        setCommand(commandHistory[nextIndex]);
      }
    }
  }

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = command.trim();
    if (!raw) return;
    const normalized = raw.toLowerCase();
    setCommandHistory((current) => current.at(-1) === raw ? current : [...current, raw]);
    setHistoryIndex(null);
    setCommand("");

    if (normalized === "clear") {
      setEntries([]);
      return;
    }

    const responses: Record<string, string> = {
      help: commandHelp,
      ls: "about/  credentials/  omnave/  stack/  work/  contact.link",
      pwd: "/home/jhade/portfolio",
      whoami: "bryan-jhade\nDesigner + Developer · Philippines",
      neofetch: `jhade@portfolio
---------------
OS: BryanOS / Web
Role: Designer + Developer
Focus: Software · AI · Frontend
Education: BS Information Technology — AI PPD
Shell: portfolio-sh
Status: Available`,
      focus: "software/  ai/  frontend/  security-lab/",
      work: "cd /home/jhade/portfolio/work\nOpening selected work…",
      omnave: "cd /home/jhade/portfolio/omnave\nOpening featured case study…",
      about: "cat /home/jhade/portfolio/about/profile.txt\nOpening profile…",
      stack: `ACTIVE TOOLCHAIN
HTML / CSS              React / Next.js
JavaScript / TypeScript Firebase / Supabase
Python / FastAPI        Git / GitHub
Tailwind CSS            Gemini / Groq APIs`,
      credentials: "cd /home/jhade/portfolio/credentials\nOpening selected credentials…",
      contact: "open /home/jhade/portfolio/contact.link\nContact details are being prepared.",
    };
    const output = responses[normalized] ?? `Command not found: ${raw}. Type 'help' to see available commands.`;

    setEntries((current) => [...current, { command: raw, output }]);

    const destinations: Record<string, string> = {
      work: "work",
      omnave: "feature",
      about: "about",
      credentials: "credentials",
      contact: "contact",
    };
    const destination = destinations[normalized];
    if (destination) {
      setOpen(false);
      window.setTimeout(() => document.getElementById(destination)?.scrollIntoView({ behavior: "smooth" }), 120);
    }
  }

  return (
    <>
      <button className="terminal-launcher" type="button" ref={launcherRef} onClick={() => setOpen(true)} aria-label="Open portfolio terminal" aria-haspopup="dialog" aria-expanded={open}>
        <span aria-hidden="true">&gt;_</span>
      </button>

      {open && <div className="terminal-overlay" onMouseDown={handleBackdropClick}>
        <div className="terminal-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="terminal-title" aria-describedby="terminal-intro" onKeyDown={handleDialogKeyDown}>
          <div className="terminal-dialog-bar">
            <span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span>
            <span>guest@jhade: ~/portfolio</span>
            <button type="button" onClick={closeTerminal} aria-label="Close portfolio terminal">×</button>
          </div>
          <div className="terminal-dialog-heading">
            <div><span>System utility / 01</span><h2 id="terminal-title">Portfolio terminal</h2></div>
            <span>Interactive / local</span>
          </div>
          <p className="terminal-intro" id="terminal-intro">Navigate the portfolio or inspect Bryan&apos;s work through a compact command interface.</p>
          <div className="terminal-log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
            {entries.map((entry, index) => (
              <div className="terminal-entry" key={`${index}-${entry.command ?? "intro"}`}>
                {entry.command && <p className="terminal-command"><span>jhade@portfolio:~$</span> {entry.command}</p>}
                <pre className="terminal-output">{entry.output}</pre>
              </div>
            ))}
          </div>
          <form className="terminal-form" onSubmit={runCommand}>
            <label htmlFor="terminal-command"><span>jhade@portfolio:~$</span><span className="visually-hidden">Type a portfolio command</span></label>
            <input ref={inputRef} id="terminal-command" value={command} onChange={(event) => { setCommand(event.target.value); setHistoryIndex(null); }} onKeyDown={handleCommandKeyDown} autoComplete="off" spellCheck={false} aria-describedby="terminal-hint" />
            <button type="submit">Run <span aria-hidden="true">↵</span></button>
          </form>
          <div className="terminal-footer"><p className="terminal-hint" id="terminal-hint">Type <strong>help</strong> for commands. Use ↑/↓ for history.</p><span>ESC to close</span></div>
        </div>
      </div>}
    </>
  );
}
