import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MeshGrid } from "@/components/ui/mesh-grid";
import { NoiseTexture } from "@/components/ui/noise-texture";

export interface SiteLoaderProps {
  /** 0-100. Driven by the parent boot sequence, not simulated internally. */
  progress?: number;
  /** Triggers the exit fade; parent unmounts once the transition completes. */
  fading?: boolean;
  className?: string;
}

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Full-screen boot loader shown once while fonts/critical chunks settle.
 * Pure CSS + SVG (no three.js) — a rotating conic-gradient ring standing in
 * for a soft 3D gold orb, with an SVG progress arc reporting real progress.
 */
export function SiteLoader({ progress = 0, fading = false, className }: SiteLoaderProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  const dashOffset = CIRCUMFERENCE * (1 - clamped / 100);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="ZENORA — chargement"
      initial={false}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-background",
        fading && "pointer-events-none",
        className,
      )}
    >
      {/* Ambient background — same DNA as PageHero, kept subtle */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(0_0%_2%)]" />
        <div
          className="absolute inset-0 text-primary/30"
          style={{
            maskImage: "radial-gradient(ellipse 60% 55% at 50% 48%, black 0%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 48%, black 0%, transparent 78%)",
          }}
        >
          <MeshGrid size={64} fineSize={16} />
        </div>
        <div className="absolute inset-0 opacity-[0.3] mix-blend-soft-light">
          <NoiseTexture frequency={0.75} octaves={2} slope={0.06} noiseOpacity={0.4} />
        </div>
      </div>

      {/* Gold orb + wordmark */}
      <div className="relative z-10 flex flex-col items-center gap-9">
        <div className="relative h-36 w-36 md:h-40 md:w-40">
          {/* Ambient glow, slow breathing */}
          <div className="motion-safe:animate-pulse-slow absolute inset-[-35%] rounded-full bg-primary/25 blur-3xl" />

          {/* Rotating conic rim — reads as a soft 3D gold ring */}
          <div
            className="motion-safe:animate-spin absolute inset-0 rounded-full [animation-duration:4s]"
            style={{
              background:
                "conic-gradient(from 0deg, hsl(var(--primary)) 0deg, transparent 100deg, hsl(var(--primary)) 190deg, transparent 290deg, hsl(var(--primary)) 360deg)",
              maskImage: "radial-gradient(closest-side, transparent 76%, black 78%, black 100%)",
              WebkitMaskImage: "radial-gradient(closest-side, transparent 76%, black 78%, black 100%)",
              filter: "blur(0.5px)",
            }}
          />

          {/* Inner sphere — dark glass with a soft specular highlight */}
          <div
            className="absolute inset-[14%] rounded-full border border-primary/25"
            style={{
              background:
                "radial-gradient(circle at 32% 26%, hsl(0 0% 16%) 0%, hsl(0 0% 6%) 45%, hsl(0 0% 1%) 100%)",
              boxShadow:
                "inset 0 1px 14px rgba(255,255,255,0.06), 0 0 42px -10px hsla(42, 90%, 55%, 0.55)",
            }}
          />

          {/* Progress ring */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="hsl(var(--primary) / 0.14)" strokeWidth="1.5" />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.35s ease-out" }}
            />
          </svg>

          {/* Monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-gradient-gold select-none font-display text-5xl font-bold"
              style={{ filter: "drop-shadow(0 0 16px hsla(42, 90%, 55%, 0.35))" }}
            >
              Z
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-lg font-semibold tracking-[0.35em] text-foreground">ZENORA</p>
          <p className="section-eyebrow !text-[10px]">De Zéro au Zénith</p>

          <div className="mt-2 h-[3px] w-44 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-gold-shine"
              style={{ width: `${clamped}%`, transition: "width 0.3s ease-out" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
