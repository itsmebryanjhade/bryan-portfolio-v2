// lucide-react ships no brand icons; these match its 1.6 stroke style.
export function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15Z" />
    </svg>
  );
}

export function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 5.5a14 14 0 0 0-3.5 1C3 9.5 2.5 13 3 16.5a14 14 0 0 0 4 2l1-2M15.5 5.5a14 14 0 0 1 3.5 1c2 3 2.5 6.5 2 10a14 14 0 0 1-4 2l-1-2" />
      <path d="M7 16.5c3.3 1.3 6.7 1.3 10 0M7.5 7.5c3-1 6-1 9 0" />
      <circle cx="9" cy="12.5" r="1" />
      <circle cx="15" cy="12.5" r="1" />
    </svg>
  );
}

/** SanX mark, redrawn as vector: an outlined diamond over an orange one. The outline follows the text colour. */
export function SanXLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="260 385 740 485" className={className} aria-hidden="true">
      <path d="M763 397 989 627 763 857 538 627Z" fill="#ff5410" />
      <path d="M503 397 733 627 503 857 273 627Z" fill="none" stroke="currentColor" strokeWidth="32" />
    </svg>
  );
}

/** OSC Halalan 2026 mark: a checked ballot dropping into a ballot box. Navy and gold. */
export function HalalanLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g transform="rotate(-8 32 22)">
        <rect x="21" y="6" width="22" height="28" rx="3.5" fill="#f2c14e" />
        <path d="M26.5 20.5l4 4 7.5-8.5" fill="none" stroke="#1b2552" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="10" y="30" width="44" height="26" rx="6" fill="#1b2552" />
      <rect x="20" y="29" width="24" height="4" rx="2" fill="#0d1433" />
      <rect x="18" y="44" width="28" height="3" rx="1.5" fill="#f2c14e" opacity=".85" />
    </svg>
  );
}
