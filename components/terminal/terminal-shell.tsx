"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/content/profile";
import { FOCUSABLE } from "@/lib/focus";
import { neofetch, stackOutput, whoami } from "./responses";
import type { FormEvent, KeyboardEvent, MouseEvent } from "react";

type Entry = { command?: string; output: string };

const commandHelp = `AVAILABLE COMMANDS
  help          show this command list
  ls            list portfolio directories
  pwd           print the current path
  whoami        identify the portfolio owner
  neofetch      display the builder profile
  work          open projects
  omnave        open the featured case study
  about         open the about page
  stack         print the active toolchain
  credentials   open certifications
  contact       open contact
  clear         clear terminal output`;

export function TerminalShell() {
  const [open, setOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const router = useRouter();
  const openerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [entries, setEntries] = useState<Entry[]>([
    { output: "BryanOS portfolio shell [Version 2026.10]\nType 'help' to list commands." },
  ]);

  useEffect(() => {
    function onOpen() {
      if (!dialogRef.current) openerRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }
    window.addEventListener("open-terminal", onOpen);
    return () => window.removeEventListener("open-terminal", onOpen);
  }, []);

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
    const el = openerRef.current;
    openerRef.current = null;
    window.requestAnimationFrame(() => el?.focus());
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeTerminal();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
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
      ls: "about/  certifications/  projects/  stack/  contact.link",
      pwd: "/home/jhade/portfolio",
      whoami: whoami(),
      neofetch: neofetch(),
      focus: "software/  ai/  frontend/  security-lab/",
      work: "cd /home/jhade/portfolio/projects\nOpening projects…",
      omnave: "cd /home/jhade/portfolio/projects/omnave\nOpening the Omnave case study…",
      about: "cat /home/jhade/portfolio/about/profile.txt\nOpening about…",
      stack: stackOutput(),
      credentials: "cd /home/jhade/portfolio/certifications\nOpening certifications…",
      contact: `mailto:${profile.email}\nOpening your mail app…`,
    };
    const output = responses[normalized] ?? `Command not found: ${raw}. Type 'help' to see available commands.`;

    setEntries((current) => [...current, { command: raw, output }]);

    const destinations: Record<string, string> = {
      work: "/projects",
      omnave: "/projects/omnave",
      about: "/about",
      stack: "/stack",
      credentials: "/certifications",
      contact: `mailto:${profile.email}`,
    };
    const destination = destinations[normalized];
    if (destination) {
      openerRef.current = null;
      setOpen(false);
      if (destination.startsWith("mailto:")) window.location.href = destination;
      else router.push(destination);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/70 px-4" onMouseDown={handleBackdropClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terminal-title"
        aria-describedby="terminal-intro"
        onKeyDown={handleDialogKeyDown}
        className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-card border border-border bg-panel"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <span>guest@jhade: ~/portfolio</span>
          <button
            type="button"
            onClick={closeTerminal}
            aria-label="Close portfolio terminal"
            className="inline-flex h-11 w-11 items-center justify-center rounded-nav text-muted transition-colors duration-150 hover:bg-hover hover:text-fg"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="px-4 pt-3">
          <h2 id="terminal-title" className="text-sm font-medium text-fg">Portfolio terminal</h2>
          <p id="terminal-intro" className="mt-1 text-xs text-muted">Navigate the portfolio with a compact command interface.</p>
        </div>
        <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs text-muted">
          {entries.map((entry, index) => (
            <div key={`${index}-${entry.command ?? "intro"}`} className="mb-2">
              {entry.command && <p className="text-fg"><span className="text-faint">jhade@portfolio:~$</span> {entry.command}</p>}
              <pre className="whitespace-pre-wrap font-mono">{entry.output}</pre>
            </div>
          ))}
        </div>
        <form onSubmit={runCommand} className="flex items-center gap-2 border-t border-border px-4 py-2">
          <label htmlFor="terminal-command" className="font-mono text-xs text-faint">
            <span aria-hidden="true">jhade@portfolio:~$</span>
            <span className="sr-only">Type a portfolio command</span>
          </label>
          <input
            ref={inputRef}
            id="terminal-command"
            value={command}
            onChange={(event) => { setCommand(event.target.value); setHistoryIndex(null); }}
            onKeyDown={handleCommandKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-describedby="terminal-hint"
            className="min-h-11 flex-1 bg-transparent font-mono text-xs text-fg focus:outline-none"
          />
          <button type="submit" className="min-h-11 rounded-nav border border-border px-3 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors duration-150 hover:border-border-hover hover:bg-hover hover:text-fg">
            Run <span aria-hidden="true">↵</span>
          </button>
        </form>
        <div className="flex justify-between border-t border-border px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-faint">
          <p id="terminal-hint">Type help for commands. Up/Down for history.</p>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
