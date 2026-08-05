import { useCallback, useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children?: ReactNode;
  className?: string;
  /** Spotlight radius in px */
  gradientSize?: number;
  /** Spotlight fill color (follows cursor) */
  gradientColor?: string;
  gradientOpacity?: number;
  /** Border glow start */
  gradientFrom?: string;
  /** Border glow end */
  gradientTo?: string;
}

/**
 * Interactive card: gold border + spotlight that track the pointer.
 * Tuned for ZENORA (gold / charcoal), works in light and dark.
 */
export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = "rgba(197, 146, 42, 0.18)",
  gradientOpacity = 0.9,
  gradientFrom = "#E8B84A",
  gradientTo = "#C5922A",
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const sizeRef = useRef(gradientSize);

  useEffect(() => {
    sizeRef.current = gradientSize;
  }, [gradientSize]);

  const reset = useCallback(() => {
    const off = -sizeRef.current;
    mouseX.set(off);
    mouseY.set(off);
  }, [mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    const onGlobalOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset();
    };
    const onBlur = () => reset();
    const onVisibility = () => {
      if (document.visibilityState !== "visible") reset();
    };

    window.addEventListener("pointerout", onGlobalOut);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointerout", onGlobalOut);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reset]);

  const borderBackground = useMotionTemplate`
    linear-gradient(hsl(var(--card)) 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      hsl(var(--border)) 100%
    ) border-box
  `;

  const spotlightBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 70%
    )
  `;

  return (
    <motion.div
      className={cn(
        "group relative isolate h-full overflow-hidden rounded-xl border border-transparent",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerEnter={reset}
      style={{
        background: borderBackground,
      }}
    >
      {/* Opaque card surface */}
      <div className="pointer-events-none absolute inset-px z-20 rounded-[inherit] bg-card" />

      {/* Cursor spotlight — visible on hover only */}
      <motion.div
        className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: spotlightBackground,
          // CSS opacity above; keep a soft multiplier via color alpha in gradientColor
          ["--spotlight-strength" as string]: String(gradientOpacity),
        }}
      />

      <div className="relative z-40 h-full">{children}</div>
    </motion.div>
  );
}
