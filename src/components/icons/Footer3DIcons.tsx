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
    <filter id={`${id}-shadow`} x="-35%" y="-25%" width="170%" height="170%">
      <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="hsl(38, 70%, 20%)" floodOpacity="0.45" />
    </filter>
  </defs>
);

/** Isometric envelope */
export const Icon3DMail = ({ className, ...props }: IconProps) => {
  const id = "ft-mail";
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden {...props}>
      <GoldDefs id={id} />
      <ellipse cx="32" cy="56" rx="18" ry="3.5" fill="hsl(38, 50%, 15%)" opacity="0.3" />
      <g filter={`url(#${id}-shadow)`}>
        <path d="M12 22 L52 22 L52 46 L12 46 Z" fill={`url(#${id}-side)`} />
        <path d="M12 22 L52 22 L48 18 L16 18 Z" fill={`url(#${id}-top)`} />
        <path d="M12 22 L12 46 L16 42 L16 18 Z" fill={`url(#${id}-dark)`} />
        <rect x="14" y="22" width="36" height="22" rx="1.5" fill={`url(#${id}-face)`} />
        <path d="M14 24 L32 36 L50 24" stroke={`url(#${id}-dark)`} strokeWidth="2.2" strokeLinejoin="round" fill="none" opacity="0.55" />
        <path d="M16 42 L26 32" stroke={`url(#${id}-dark)`} strokeWidth="1.6" opacity="0.35" />
        <path d="M48 42 L38 32" stroke={`url(#${id}-dark)`} strokeWidth="1.6" opacity="0.35" />
        <circle cx="44" cy="20" r="5.5" fill={`url(#${id}-top)`} stroke="hsl(38, 70%, 35%)" strokeWidth="1" />
        <path d="M42 20 H46 M44 18 V22" stroke="hsl(0, 0%, 12%)" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  );
};

/** Isometric phone handset / device */
export const Icon3DPhone = ({ className, ...props }: IconProps) => {
  const id = "ft-phone";
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden {...props}>
      <GoldDefs id={id} />
      <ellipse cx="32" cy="56" rx="14" ry="3.5" fill="hsl(38, 50%, 15%)" opacity="0.3" />
      <g filter={`url(#${id}-shadow)`}>
        <rect x="24" y="10" width="20" height="40" rx="4" fill={`url(#${id}-side)`} transform="rotate(12 34 30)" />
        <rect x="22" y="8" width="18" height="38" rx="3.5" fill={`url(#${id}-face)`} transform="rotate(12 31 27)" />
        <rect x="24.5" y="12" width="13" height="26" rx="1.5" fill={`url(#${id}-dark)`} transform="rotate(12 31 25)" opacity="0.9" />
        <path
          d="M26 14 L34 15.5 L33 36 L25 34.5 Z"
          fill="hsl(44, 100%, 80%)"
          opacity="0.12"
          transform="rotate(12 30 25)"
        />
        <circle cx="31" cy="43" r="2" fill={`url(#${id}-top)`} transform="rotate(12 31 43)" />
        <path d="M40 16 L44 14 M42 20 L47 17 M43 24 L49 20" stroke={`url(#${id}-top)`} strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
      </g>
    </svg>
  );
};

/** Isometric map pin */
export const Icon3DMapPin = ({ className, ...props }: IconProps) => {
  const id = "ft-pin";
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden {...props}>
      <GoldDefs id={id} />
      <ellipse cx="32" cy="54" rx="12" ry="4" fill="hsl(38, 50%, 15%)" opacity="0.35" />
      <g filter={`url(#${id}-shadow)`}>
        <path
          d="M32 8 C42 8 50 16 50 26 C50 38 32 52 32 52 C32 52 14 38 14 26 C14 16 22 8 32 8 Z"
          fill={`url(#${id}-side)`}
        />
        <path
          d="M32 11 C40 11 46.5 17.5 46.5 25.5 C46.5 35 32 47 32 47 C32 47 17.5 35 17.5 25.5 C17.5 17.5 24 11 32 11 Z"
          fill={`url(#${id}-face)`}
        />
        <circle cx="32" cy="25" r="7" fill={`url(#${id}-dark)`} />
        <circle cx="32" cy="25" r="3.5" fill={`url(#${id}-top)`} />
        <ellipse cx="27" cy="18" rx="3" ry="2" fill="hsl(45, 100%, 85%)" opacity="0.45" />
      </g>
    </svg>
  );
};
