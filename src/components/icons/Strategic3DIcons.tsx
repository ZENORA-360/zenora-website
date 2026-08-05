import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const GoldDefs = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={`${id}-face`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="hsl(44, 100%, 72%)" />
      <stop offset="45%" stopColor="hsl(42, 95%, 55%)" />
      <stop offset="100%" stopColor="hsl(38, 85%, 40%)" />
    </linearGradient>
    <linearGradient id={`${id}-side`} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(38, 80%, 42%)" />
      <stop offset="100%" stopColor="hsl(32, 70%, 28%)" />
    </linearGradient>
    <linearGradient id={`${id}-top`} x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="hsl(45, 100%, 78%)" />
      <stop offset="100%" stopColor="hsl(42, 95%, 58%)" />
    </linearGradient>
    <linearGradient id={`${id}-dark`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="hsl(0, 0%, 22%)" />
      <stop offset="100%" stopColor="hsl(0, 0%, 8%)" />
    </linearGradient>
    <linearGradient id={`${id}-metal`} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(0, 0%, 55%)" />
      <stop offset="50%" stopColor="hsl(0, 0%, 28%)" />
      <stop offset="100%" stopColor="hsl(0, 0%, 12%)" />
    </linearGradient>
    <filter id={`${id}-shadow`} x="-30%" y="-20%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="hsl(38, 70%, 30%)" floodOpacity="0.35" />
    </filter>
  </defs>
);

/** Isometric clipboard — framing & iteration */
export const Icon3DClipboard = ({ className, ...props }: IconProps) => {
  const id = "clip3d";
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden {...props}>
      <GoldDefs id={id} />
      <ellipse cx="32" cy="56" rx="16" ry="4" fill="hsl(38, 50%, 20%)" opacity="0.25" />
      <g filter={`url(#${id}-shadow)`}>
        {/* Board depth */}
        <path d="M18 18 L46 18 L50 22 L50 50 L22 50 L18 46 Z" fill={`url(#${id}-side)`} />
        <path d="M18 18 L46 18 L42 14 L14 14 Z" fill={`url(#${id}-top)`} />
        <path d="M18 18 L18 46 L14 42 L14 14 Z" fill={`url(#${id}-dark)`} />
        {/* Face */}
        <rect x="20" y="18" width="26" height="30" rx="2" fill={`url(#${id}-face)`} />
        {/* Clip */}
        <rect x="26" y="10" width="12" height="10" rx="2" fill={`url(#${id}-metal)`} />
        <rect x="28" y="12" width="8" height="4" rx="1" fill="hsl(42, 95%, 70%)" opacity="0.9" />
        {/* Checklist rows */}
        <rect x="24" y="26" width="4" height="4" rx="1" fill="hsl(0, 0%, 12%)" />
        <path d="M25 28 L26 29.5 L28 26.5" stroke="hsl(44, 100%, 75%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="30" y="26.5" width="12" height="2.5" rx="1" fill="hsl(0, 0%, 18%)" opacity="0.55" />
        <rect x="24" y="34" width="4" height="4" rx="1" fill="hsl(0, 0%, 12%)" />
        <path d="M25 36 L26 37.5 L28 34.5" stroke="hsl(44, 100%, 75%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="30" y="34.5" width="10" height="2.5" rx="1" fill="hsl(0, 0%, 18%)" opacity="0.55" />
        <rect x="24" y="42" width="4" height="4" rx="1" fill="hsl(0, 0%, 12%)" opacity="0.7" />
        <rect x="30" y="42.5" width="8" height="2.5" rx="1" fill="hsl(0, 0%, 18%)" opacity="0.4" />
      </g>
    </svg>
  );
};

/** Isometric shield — code under control */
export const Icon3DShield = ({ className, ...props }: IconProps) => {
  const id = "shld3d";
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden {...props}>
      <GoldDefs id={id} />
      <ellipse cx="32" cy="56" rx="15" ry="4" fill="hsl(38, 50%, 20%)" opacity="0.25" />
      <g filter={`url(#${id}-shadow)`}>
        {/* Back plate */}
        <path
          d="M32 8 L50 14 L50 34 C50 44 40 52 32 56 C24 52 14 44 14 34 L14 14 Z"
          fill={`url(#${id}-side)`}
        />
        {/* Front face inset */}
        <path
          d="M32 12 L46 17 L46 33 C46 41 38 48 32 51.5 C26 48 18 41 18 33 L18 17 Z"
          fill={`url(#${id}-face)`}
        />
        {/* Inner panel */}
        <path
          d="M32 18 L42 22 L42 32 C42 38 36 43 32 45.5 C28 43 22 38 22 32 L22 22 Z"
          fill={`url(#${id}-dark)`}
          opacity="0.85"
        />
        {/* Lock body */}
        <rect x="27" y="30" width="10" height="8" rx="1.5" fill={`url(#${id}-top)`} />
        <path
          d="M29 30 V27 C29 25.3 30.3 24 32 24 C33.7 24 35 25.3 35 27 V30"
          stroke="hsl(44, 100%, 72%)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="32" cy="34" r="1.4" fill="hsl(0, 0%, 12%)" />
      </g>
    </svg>
  );
};

/** Isometric headset — post-launch support */
export const Icon3DHeadset = ({ className, ...props }: IconProps) => {
  const id = "hs3d";
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden {...props}>
      <GoldDefs id={id} />
      <ellipse cx="32" cy="56" rx="16" ry="4" fill="hsl(38, 50%, 20%)" opacity="0.25" />
      <g filter={`url(#${id}-shadow)`}>
        {/* Headband */}
        <path
          d="M16 30 C16 16 48 16 48 30"
          stroke={`url(#${id}-metal)`}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M18 29 C18 18 46 18 46 29"
          stroke={`url(#${id}-face)`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left ear cup */}
        <ellipse cx="15" cy="34" rx="7" ry="9" fill={`url(#${id}-side)`} />
        <ellipse cx="15" cy="34" rx="5" ry="7" fill={`url(#${id}-face)`} />
        <ellipse cx="15" cy="34" rx="2.5" ry="3.5" fill={`url(#${id}-dark)`} />
        {/* Right ear cup */}
        <ellipse cx="49" cy="34" rx="7" ry="9" fill={`url(#${id}-side)`} />
        <ellipse cx="49" cy="34" rx="5" ry="7" fill={`url(#${id}-face)`} />
        <ellipse cx="49" cy="34" rx="2.5" ry="3.5" fill={`url(#${id}-dark)`} />
        {/* Mic boom */}
        <path
          d="M15 40 C10 44 12 50 18 50"
          stroke={`url(#${id}-metal)`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="19" cy="50" r="3.2" fill={`url(#${id}-face)`} />
        <circle cx="19" cy="50" r="1.4" fill={`url(#${id}-dark)`} />
      </g>
    </svg>
  );
};
