import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { MeshGrid } from "@/components/ui/mesh-grid";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { cn } from "@/lib/utils";

export type PageHeroProps = {
  eyebrow: string;
  /** Plain string or JSX (e.g. gold highlight spans) */
  title: ReactNode;
  lead: string;
  /** Optional slot under the lead (CTAs, filters, …) */
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
};

/**
 * Shared inner-page hero — Projects atmosphere, reusable everywhere.
 * Typography: `section-eyebrow` + `page-title` + `section-lead-lg`.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  className,
  contentClassName,
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative overflow-hidden border-b border-border/50 pt-40 pb-24 md:pt-44 md:pb-28",
        className,
      )}
    >
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.10] via-primary/[0.03] to-transparent dark:from-primary/[0.16] dark:via-primary/[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-muted/30 dark:to-muted/15" />

        <div className="absolute left-[22%] top-[42%] h-[min(50vw,480px)] w-[min(50vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.16] blur-[110px] dark:bg-primary/[0.22]" />
        <div className="absolute right-[-4%] top-[12%] h-[300px] w-[300px] rounded-full bg-primary/[0.12] blur-[95px] dark:bg-primary/[0.16]" />

        <div
          className="absolute inset-0 text-primary/55 dark:text-primary/45"
          style={{
            maskImage:
              "radial-gradient(ellipse 95% 85% at 50% 42%, black 0%, black 45%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 95% 85% at 50% 42%, black 0%, black 45%, transparent 82%)",
          }}
        >
          <MeshGrid size={64} fineSize={16} className="opacity-70 dark:opacity-80" />
        </div>

        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 65% at 58% 48%, black 5%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 65% at 58% 48%, black 5%, transparent 72%)",
          }}
        >
          <FlickeringGrid
            className="absolute inset-0"
            squareSize={3}
            gridGap={13}
            flickerChance={0.04}
            maxOpacity={0.28}
            color="hsl(var(--primary))"
          />
        </div>

        <div
          className="absolute inset-0 text-primary/45 dark:text-primary/35"
          style={{
            maskImage:
              "linear-gradient(128deg, transparent 48%, black 58%, black 70%, transparent 84%)",
            WebkitMaskImage:
              "linear-gradient(128deg, transparent 48%, black 58%, black 70%, transparent 84%)",
          }}
        >
          <StripedPattern
            direction="left"
            width={12}
            height={12}
            className="opacity-70 dark:opacity-80"
          />
        </div>

        <div className="absolute inset-0 opacity-[0.22] mix-blend-multiply dark:opacity-[0.45] dark:mix-blend-soft-light">
          <NoiseTexture
            frequency={0.75}
            octaves={2}
            slope={0.08}
            noiseOpacity={0.5}
            className="opacity-100"
          />
        </div>

        <div className="absolute left-6 top-28 hidden h-9 w-9 border-l border-t border-primary/40 md:left-10 md:block lg:left-14 dark:border-primary/50" />
        <div className="absolute bottom-12 right-6 hidden h-9 w-9 border-b border-r border-primary/35 md:right-10 md:block lg:right-14 dark:border-primary/45" />

        <div className="absolute inset-x-[8%] bottom-[18%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent dark:via-primary/40" />

        <div className="absolute inset-0 bg-gradient-to-r from-background/45 via-transparent to-transparent md:from-background/30" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/50 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container-zenora relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={cn("max-w-4xl", contentClassName)}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="section-eyebrow">{eyebrow}</span>
          </div>
          <h1 className="page-title mb-6">{title}</h1>
          <p className="section-lead-lg max-w-2xl">{lead}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </motion.div>
      </motion.div>
    </section>
  );
}
