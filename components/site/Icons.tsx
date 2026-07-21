import type { IconKey } from "@/lib/site-data";

type P = { className?: string };

const s = (className?: string) => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* Brand mark — eight-point Islamic star with an inner glow */
export function Logo({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id="al-gold" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0" stopColor="#e6c877" />
          <stop offset="1" stopColor="#a9832f" />
        </linearGradient>
      </defs>
      <path
        d="M24 2l5.6 8.9L40 8l-2.9 10.4L46 24l-8.9 5.6L40 40l-10.4-2.9L24 46l-5.6-8.9L8 40l2.9-10.4L2 24l8.9-5.6L8 8l10.4 2.9L24 2z"
        fill="url(#al-gold)"
      />
      <circle cx="24" cy="24" r="8.5" fill="#0a1f44" />
      <path d="M27.5 20.2a5 5 0 10.3 6.6 6 6 0 11-.3-6.6z" fill="#e6c877" />
    </svg>
  );
}

const paths: Record<IconKey, React.ReactNode> = {
  quran: (
    <>
      <path d="M4 5.5A2.5 2.5 0 016.5 3H19v15H6.5A2.5 2.5 0 004 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 016.5 18H19v3H6.5A2.5 2.5 0 014 18.5" />
      <path d="M9.5 8.5c1.6-1.2 3.4-1.2 4 0M11.5 8.5v4" />
    </>
  ),
  arabic: (
    <>
      <path d="M5 17c2 0 3-1 3-3V7" />
      <path d="M13 7v6c0 2 1 3 3 3M19 7v10" />
      <circle cx="8" cy="18.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  studies: (
    <>
      <path d="M12 4L3 8l9 4 9-4-9-4z" />
      <path d="M7 10.5V15c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5" />
      <path d="M21 8v5" />
    </>
  ),
  seerah: (
    <>
      <path d="M17 4a8 8 0 100 16 6.5 6.5 0 010-16z" />
      <path d="M13 8.5l1 1.6 1.8.3-1.3 1.3.3 1.8-1.8-.9-1.8.9.3-1.8-1.3-1.3 1.8-.3z" />
    </>
  ),
  hifz: (
    <>
      <path d="M12 21c-4-2-7-5-7-9V5l7-2 7 2v7c0 4-3 7-7 9z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  trial: (
    <>
      <path d="M9 11l2 2 4-4" />
      <path d="M12 3l2.3 1.4 2.7-.2.9 2.5 2.1 1.6-1 2.5 1 2.5-2.1 1.6-.9 2.5-2.7-.2L12 21l-2.3-1.4-2.7.2-.9-2.5L4 14.9l1-2.5-1-2.5L6.1 8.2 7 5.7l2.7.2z" />
    </>
  ),
  "class-size": (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0111 0" />
      <path d="M16 6.5a3 3 0 010 5.8M17.5 19a5.5 5.5 0 00-2.3-4.5" />
    </>
  ),
  teacher: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0113 0" />
      <path d="M12 4.8V3" />
    </>
  ),
  schedule: (
    <>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9h17M8 3v3M16 3v3" />
      <path d="M12 12.5v3l2 1.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.5v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V5.5L12 3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="9" r="2.4" />
      <circle cx="16" cy="9" r="2.4" />
      <path d="M3.5 19a4.5 4.5 0 019 0M11.5 19a4.5 4.5 0 019 0" />
    </>
  ),
  device: (
    <>
      <rect x="3.5" y="4.5" width="17" height="12" rx="2" />
      <path d="M8 20h8M12 16.5V20" />
      <path d="M9.5 9.5l2.5 2 2.5-2" />
    </>
  ),
  refund: (
    <>
      <path d="M4 12a8 8 0 108-8" />
      <path d="M4 4v4h4" />
      <path d="M12 8v4l2.5 1.5" />
    </>
  ),
  chat: (
    <>
      <path d="M5 5.5h14a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0119 16.5h-7l-4 3v-3H5A1.5 1.5 0 013.5 15V7A1.5 1.5 0 015 5.5z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
};

export function Icon({ name, className }: { name: IconKey } & P) {
  return <svg {...s(className)}>{paths[name]}</svg>;
}

export const ArrowRight = ({ className }: P) => (
  <svg {...s(className)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Plus = ({ className }: P) => (
  <svg {...s(className)}><path d="M12 5v14M5 12h14" /></svg>
);
export const Check = ({ className }: P) => (
  <svg {...s(className)}><path d="M5 12l4 4L19 7" /></svg>
);
export const Mail = ({ className }: P) => (
  <svg {...s(className)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>
);
export const Phone = ({ className }: P) => (
  <svg {...s(className)}><path d="M6 3.5h3l1.5 4-2 1.5a12 12 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014 5.7 2 2 0 016 3.5z" /></svg>
);
export const Send = ({ className }: P) => (
  <svg {...s(className)}><path d="M4 12l16-7-7 16-2.5-6.5L4 12z" /></svg>
);
export const Close = ({ className }: P) => (
  <svg {...s(className)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Menu = ({ className }: P) => (
  <svg {...s(className)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Chevron = ({ className }: P) => (
  <svg {...s(className)}><path d="M6 9l6 6 6-6" /></svg>
);
export const Sparkle = ({ className }: P) => (
  <svg {...s(className)}><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" /></svg>
);
export const Lock = ({ className }: P) => (
  <svg {...s(className)}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 018 0v3" />
  </svg>
);
export const Chat = ({ className }: P) => (
  <svg {...s(className)}>
    <path d="M5 5h14a1.6 1.6 0 011.6 1.6v8A1.6 1.6 0 0119 16.2h-7l-4 3v-3H5A1.6 1.6 0 013.4 14.6V6.6A1.6 1.6 0 015 5z" />
    <path d="M8 9.6h8M8 12.4h5" />
  </svg>
);
