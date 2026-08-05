import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DotPattern } from "@/components/ui/dot-pattern";
import { capabilityCards } from "@/data/capabilities";
import { pickLocale } from "@/data/locale";

/**
 * HorizontalScrollSection — pinned panel, horizontal track driven by vertical scroll.
 * Travel distance is measured so every card is fully visible before the section ends.
 */

export const HorizontalScrollSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [travelX, setTravelX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const { language } = useLanguage();

  // Measure how far the track must move so the last card is fully in view
  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;

    const measure = () => {
      const overflow = track.scrollWidth - sticky.clientWidth;
      // Small end padding so the last card isn't flush against the edge
      setTravelX(Math.max(0, overflow + 24));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(sticky);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [language]);

  // Direct scrub (no spring lag) — guarantees we reach the last card before unpinning
  const x = useTransform(scrollYProgress, [0, 1], [0, -travelX]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "3%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.6, 0.25]);

  return (
    <section
      ref={targetRef}
      // Tall enough to scrub through all 6 cards at a comfortable pace
      className="relative h-[380vh] bg-background"
      aria-label={language === "fr" ? "Nos expertises" : "Our expertise"}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-[-8%] pointer-events-none"
          style={{ x: bgX, y: bgY }}
        >
          <div className="absolute inset-0 bg-background" />
          <DotPattern
            width={20}
            height={20}
            cr={1.1}
            glow
            className="opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-80" />
        </motion.div>

        <div className="relative z-10 w-full">
          <motion.div
            className="container-zenora mb-10 md:mb-14"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-foreground/25" />
              <span className="section-eyebrow">
                {language === "fr" ? "Nos expertises" : "Our expertise"}
              </span>
            </div>
            <h2 className="section-title max-w-3xl">
              {language === "fr"
                ? "Six piliers, un standard international."
                : "Six pillars, one international standard."}
            </h2>
          </motion.div>

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-5 md:gap-7 pl-6 md:pl-16 pr-6 md:pr-16 will-change-transform"
          >
            {capabilityCards.map((card, i) => {
              const title = pickLocale(language, card.title);
              const desc = pickLocale(language, card.description);
              return (
              <article
                key={title}
                className="group relative w-[min(88vw,520px)] md:w-[560px] shrink-0 rounded-lg border border-border/70 bg-card/80 dark:bg-card/40 backdrop-blur-md shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)] overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-foreground/20"
              >
                <div className="relative h-full flex items-stretch gap-6 md:gap-10 p-7 md:p-10">
                  <div className="flex shrink-0 w-16 md:w-24 items-start pt-1">
                    <span className="font-display text-4xl md:text-6xl font-bold tabular-nums leading-none  text-primary/45 group-hover:text-primary/65 dark:text-primary/15 dark:group-hover:text-primary/25 transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="w-px self-stretch bg-border/80 shrink-0" />

                  <div className="flex flex-1 flex-col justify-center min-w-0 py-2">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mb-3 md:mb-4">
                      {title}
                    </h3>
                    <p className="card-copy-md max-w-md">
                      {desc}
                    </p>
                  </div>
                </div>
              </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
