import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PageCTAProps = {
  title: ReactNode;
  lead: string;
  primaryLabel: string;
  primaryHref?: string;
  /** `up-right` = ArrowUpRight (projects), `right` = ArrowRight (default) */
  primaryIcon?: "right" | "up-right";
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

/**
 * Shared page CTA — gold atmosphere, section-title / section-lead.
 * Single or dual actions (home-style).
 */
export function PageCTA({
  title,
  lead,
  primaryLabel,
  primaryHref = "/contact",
  primaryIcon = "right",
  secondaryLabel,
  secondaryHref,
  className,
}: PageCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const PrimaryIcon = primaryIcon === "up-right" ? ArrowUpRight : ArrowRight;

  return (
    <section
      ref={ref}
      className={cn(
        "section-padding relative overflow-hidden border-t border-border bg-background",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gold-gradient-radial opacity-60" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary opacity-5 blur-[100px]" />

      <div className="container-zenora relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
        >
          <h2 className="section-title font-black">{title}</h2>
          <p className="section-lead mx-auto text-center max-w-xl">{lead}</p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              variant="hero"
              size="lg"
              className="group relative px-4 py-2 text-sm transition-all duration-500 md:px-6"
              asChild
            >
              <Link to={primaryHref}>
                <span className="flex items-center gap-2">
                  {primaryLabel}
                  <PrimaryIcon
                    className={cn(
                      "h-5 w-5 transition-transform",
                      primaryIcon === "up-right"
                        ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        : "group-hover:translate-x-1",
                    )}
                  />
                </span>
              </Link>
            </Button>

            {secondaryLabel && secondaryHref ? (
              <Button
                variant="heroOutline"
                size="lg"
                className="group px-4 py-2 text-sm backdrop-blur-md md:px-6"
                asChild
              >
                <Link to={secondaryHref}>
                  <span className="flex items-center gap-2">{secondaryLabel}</span>
                </Link>
              </Button>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
