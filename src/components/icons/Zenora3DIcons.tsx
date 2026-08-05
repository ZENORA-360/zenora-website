import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  Icon3DClipboard,
  Icon3DHeadset,
  Icon3DShield,
} from "@/components/icons/Strategic3DIcons";
import {
  Icon3DMail,
  Icon3DMapPin,
  Icon3DPhone,
} from "@/components/icons/Footer3DIcons";

export type Icon3D = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

type Props = SVGProps<SVGSVGElement> & { className?: string };

const Defs = ({ id }: { id: string }) => (
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
    <filter id={`${id}-shadow`} x="-35%" y="-25%" width="170%" height="170%">
      <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="hsl(38, 70%, 20%)" floodOpacity="0.4" />
    </filter>
  </defs>
);

const Base = ({
  id,
  className,
  children,
  ...props
}: Props & { id: string; children: ReactNode }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden {...props}>
    <Defs id={id} />
    <ellipse cx="32" cy="56" rx="15" ry="3.5" fill="hsl(38, 50%, 15%)" opacity="0.28" />
    <g filter={`url(#${id}-shadow)`}>{children}</g>
  </svg>
);

export const Icon3DGlobe = (p: Props) => (
  <Base id="z3d-globe" {...p}>
    <circle cx="32" cy="30" r="17" fill={`url(#z3d-globe-side)`} />
    <circle cx="32" cy="30" r="15" fill={`url(#z3d-globe-face)`} />
    <ellipse cx="32" cy="30" rx="6.5" ry="15" fill="none" stroke={`url(#z3d-globe-dark)`} strokeWidth="1.5" opacity="0.55" />
    <ellipse cx="32" cy="30" rx="15" ry="5.5" fill="none" stroke={`url(#z3d-globe-dark)`} strokeWidth="1.5" opacity="0.55" />
    <path d="M17 30 H47" stroke={`url(#z3d-globe-dark)`} strokeWidth="1.3" opacity="0.45" />
  </Base>
);

export const Icon3DMegaphone = (p: Props) => (
  <Base id="z3d-meg" {...p}>
    <path d="M14 28 L36 18 L40 42 L14 36 Z" fill={`url(#z3d-meg-side)`} />
    <path d="M14 28 L36 18 L34 16 L12 26 Z" fill={`url(#z3d-meg-top)`} />
    <path d="M36 18 L48 14 L52 38 L40 42 Z" fill={`url(#z3d-meg-face)`} />
    <rect x="10" y="30" width="8" height="10" rx="1.5" fill={`url(#z3d-meg-dark)`} />
    <path d="M48 22 L56 18 M50 30 L58 30 M48 38 L56 42" stroke={`url(#z3d-meg-top)`} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
  </Base>
);

export const Icon3DPalette = (p: Props) => (
  <Base id="z3d-pal" {...p}>
    <path d="M32 10 C46 10 52 22 52 32 C52 42 44 50 34 50 C30 50 28 47 30 44 C32 40 28 36 24 38 C18 41 12 36 12 28 C12 18 20 10 32 10 Z" fill={`url(#z3d-pal-side)`} />
    <path d="M32 13 C44 13 49 23 49 31 C49 39 42 46 34 46 C31 46 30 44 31 42 C33 38 29 35 25 37 C20 39 15 35 15 28 C15 20 22 13 32 13 Z" fill={`url(#z3d-pal-face)`} />
    <circle cx="24" cy="24" r="3" fill={`url(#z3d-pal-dark)`} />
    <circle cx="34" cy="20" r="2.5" fill={`url(#z3d-pal-top)`} />
    <circle cx="40" cy="28" r="2.5" fill={`url(#z3d-pal-dark)`} />
    <circle cx="28" cy="34" r="2.2" fill={`url(#z3d-pal-top)`} />
  </Base>
);

export const Icon3DGear = (p: Props) => (
  <Base id="z3d-gear" {...p}>
    <path d="M32 12 L36 14 L38 18 L42 18 L44 22 L42 26 L44 30 L42 34 L38 34 L36 38 L32 40 L28 38 L26 34 L22 34 L20 30 L22 26 L20 22 L22 18 L26 18 L28 14 Z" fill={`url(#z3d-gear-side)`} />
    <circle cx="32" cy="26" r="12" fill={`url(#z3d-gear-face)`} />
    <circle cx="32" cy="26" r="5" fill={`url(#z3d-gear-dark)`} />
    <circle cx="32" cy="26" r="2.5" fill={`url(#z3d-gear-top)`} />
  </Base>
);

export const Icon3DSearch = (p: Props) => (
  <Base id="z3d-search" {...p}>
    <circle cx="28" cy="26" r="14" fill={`url(#z3d-search-side)`} />
    <circle cx="28" cy="26" r="12" fill={`url(#z3d-search-face)`} />
    <circle cx="28" cy="26" r="7" fill={`url(#z3d-search-dark)`} opacity="0.85" />
    <path d="M37 35 L48 48" stroke={`url(#z3d-search-side)`} strokeWidth="5" strokeLinecap="round" />
    <path d="M37 35 L46 46" stroke={`url(#z3d-search-top)`} strokeWidth="2.5" strokeLinecap="round" />
  </Base>
);

export const Icon3DLightbulb = (p: Props) => (
  <Base id="z3d-bulb" {...p}>
    <path d="M32 8 C42 8 48 16 48 24 C48 30 44 34 40 36 L40 42 L24 42 L24 36 C20 34 16 30 16 24 C16 16 22 8 32 8 Z" fill={`url(#z3d-bulb-side)`} />
    <path d="M32 11 C40 11 45 17 45 24 C45 29 41 32 38 34 L38 40 L26 40 L26 34 C23 32 19 29 19 24 C19 17 24 11 32 11 Z" fill={`url(#z3d-bulb-face)`} />
    <rect x="26" y="42" width="12" height="4" rx="1" fill={`url(#z3d-bulb-dark)`} />
    <rect x="28" y="46" width="8" height="3" rx="1" fill={`url(#z3d-bulb-top)`} />
    <path d="M32 18 V28 M27 23 H37" stroke={`url(#z3d-bulb-dark)`} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
  </Base>
);

export const Icon3DCode = (p: Props) => (
  <Base id="z3d-code" {...p}>
    <path d="M12 20 L52 16 L52 44 L12 48 Z" fill={`url(#z3d-code-side)`} />
    <path d="M14 22 L50 18.5 L50 42 L14 45.5 Z" fill={`url(#z3d-code-face)`} />
    <path d="M22 28 L16 32 L22 36" stroke={`url(#z3d-code-dark)`} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M42 28 L48 32 L42 36" stroke={`url(#z3d-code-dark)`} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M34 26 L28 38" stroke={`url(#z3d-code-dark)`} strokeWidth="2.2" strokeLinecap="round" />
  </Base>
);

export const Icon3DRocket = (p: Props) => (
  <Base id="z3d-rock" {...p}>
    <path d="M32 8 C40 18 42 30 40 40 L24 40 C22 30 24 18 32 8 Z" fill={`url(#z3d-rock-side)`} />
    <path d="M32 11 C38 20 39 30 38 38 L26 38 C25 30 26 20 32 11 Z" fill={`url(#z3d-rock-face)`} />
    <circle cx="32" cy="24" r="3.5" fill={`url(#z3d-rock-dark)`} />
    <path d="M24 40 L18 50 L26 44 Z" fill={`url(#z3d-rock-top)`} />
    <path d="M40 40 L46 50 L38 44 Z" fill={`url(#z3d-rock-top)`} />
    <path d="M28 40 L32 52 L36 40" fill={`url(#z3d-rock-side)`} opacity="0.85" />
  </Base>
);

export const Icon3DHandshake = (p: Props) => (
  <Base id="z3d-hand" {...p}>
    <path d="M10 34 L22 22 L30 28 L26 36 Z" fill={`url(#z3d-hand-side)`} />
    <path d="M54 34 L42 22 L34 28 L38 36 Z" fill={`url(#z3d-hand-side)`} />
    <path d="M22 28 L32 36 L42 28 L38 42 L26 42 Z" fill={`url(#z3d-hand-face)`} />
    <path d="M26 42 L32 50 L38 42" fill={`url(#z3d-hand-top)`} />
  </Base>
);

export const Icon3DTarget = (p: Props) => (
  <Base id="z3d-tgt" {...p}>
    <circle cx="32" cy="30" r="18" fill={`url(#z3d-tgt-side)`} />
    <circle cx="32" cy="30" r="16" fill={`url(#z3d-tgt-face)`} />
    <circle cx="32" cy="30" r="10" fill={`url(#z3d-tgt-dark)`} />
    <circle cx="32" cy="30" r="5" fill={`url(#z3d-tgt-top)`} />
    <circle cx="32" cy="30" r="2" fill={`url(#z3d-tgt-dark)`} />
  </Base>
);

export const Icon3DUsers = (p: Props) => (
  <Base id="z3d-users" {...p}>
    <circle cx="24" cy="22" r="7" fill={`url(#z3d-users-face)`} />
    <path d="M12 44 C12 34 36 34 36 44 Z" fill={`url(#z3d-users-side)`} />
    <circle cx="42" cy="24" r="6" fill={`url(#z3d-users-top)`} />
    <path d="M34 44 C34 36 54 36 54 44 Z" fill={`url(#z3d-users-dark)`} />
  </Base>
);

export const Icon3DEye = (p: Props) => (
  <Base id="z3d-eye" {...p}>
    <path d="M8 32 C18 18 46 18 56 32 C46 46 18 46 8 32 Z" fill={`url(#z3d-eye-side)`} />
    <path d="M12 32 C20 22 44 22 52 32 C44 42 20 42 12 32 Z" fill={`url(#z3d-eye-face)`} />
    <circle cx="32" cy="32" r="8" fill={`url(#z3d-eye-dark)`} />
    <circle cx="32" cy="32" r="3.5" fill={`url(#z3d-eye-top)`} />
  </Base>
);

export const Icon3DCompass = (p: Props) => (
  <Base id="z3d-comp" {...p}>
    <circle cx="32" cy="30" r="18" fill={`url(#z3d-comp-side)`} />
    <circle cx="32" cy="30" r="15" fill={`url(#z3d-comp-face)`} />
    <path d="M32 18 L36 30 L32 42 L28 30 Z" fill={`url(#z3d-comp-dark)`} />
    <path d="M32 18 L34 30 L32 28 Z" fill={`url(#z3d-comp-top)`} />
    <circle cx="32" cy="30" r="2.5" fill={`url(#z3d-comp-top)`} />
  </Base>
);

export const Icon3DZap = (p: Props) => (
  <Base id="z3d-zap" {...p}>
    <path d="M36 8 L18 34 H30 L26 52 L48 26 H34 Z" fill={`url(#z3d-zap-side)`} />
    <path d="M35 11 L21 33 H31 L28 48 L45 27 H33 Z" fill={`url(#z3d-zap-face)`} />
  </Base>
);

export const Icon3DAward = (p: Props) => (
  <Base id="z3d-awd" {...p}>
    <circle cx="32" cy="24" r="14" fill={`url(#z3d-awd-side)`} />
    <circle cx="32" cy="24" r="11" fill={`url(#z3d-awd-face)`} />
    <path d="M26 34 L22 52 L32 44 L42 52 L38 34" fill={`url(#z3d-awd-dark)`} />
    <path d="M28 24 L31 30 L38 20" stroke={`url(#z3d-awd-dark)`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Base>
);

export const Icon3DMonitor = (p: Props) => (
  <Base id="z3d-mon" {...p}>
    <rect x="10" y="14" width="44" height="30" rx="2" fill={`url(#z3d-mon-side)`} />
    <rect x="13" y="17" width="38" height="22" rx="1" fill={`url(#z3d-mon-dark)`} />
    <rect x="28" y="44" width="8" height="4" fill={`url(#z3d-mon-face)`} />
    <rect x="22" y="48" width="20" height="3" rx="1" fill={`url(#z3d-mon-top)`} />
  </Base>
);

export {
  Icon3DClipboard,
  Icon3DHeadset,
  Icon3DShield,
  Icon3DMail,
  Icon3DMapPin,
  Icon3DPhone,
};
