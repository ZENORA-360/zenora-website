import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, lazy, Suspense } from "react";

const NetworkScene = lazy(() =>
  import("@/components/three/NetworkScene").then((m) => ({ default: m.NetworkScene }))
);

const NeuralBackground = lazy(() =>
  import("@/components/three/NeuralBackground").then((m) => ({ default: m.NeuralBackground }))
);

export const HeroSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute inset-0 bg-gold-gradient-radial opacity-20" />
        <div className="absolute inset-0 grid-pattern opacity-[0.15]" />
      </div>

      {/* Neural flow field — soft ambient gold trails */}
      <div className="absolute inset-0 opacity-45 md:opacity-60 dark:opacity-30 dark:md:opacity-35">
        <Suspense fallback={null}>
          <NeuralBackground particleCount={420} speed={0.75} trailOpacity={0.06} />
        </Suspense>
      </div>

      {/* Zenora network globe — Yaoundé hub, gold arcs Africa → world */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[72vh] max-h-[640px] pointer-events-none opacity-70 md:opacity-80 dark:opacity-50 dark:md:opacity-65 z-[1]">
        <Suspense fallback={null}>
          <NetworkScene ambient />
        </Suspense>
      </div>

      <div className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-b from-background/35 via-transparent to-background/70 dark:from-background/45 dark:to-background/75" />

      {/* Content */}
      <motion.div
        className="container-zenora relative z-10 py-28 md:py-32"
        style={{ y, opacity }}
      >
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter mb-8"
          >
            <span className="text-foreground">{t("hero.slogan.from")}</span>
            <span className="text-foreground"> </span>
            <span className="text-foreground">{t("hero.slogan.zero")}</span>
            <br className="md:hidden" />
            <span className="text-foreground"> </span>
            <span className="text-gradient-gold">{t("hero.slogan.to")} {t("hero.slogan.zenith")}</span>
          </motion.h1>


          {/* Subtitle — corporate, factual */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-12"
          >
            {t("hero.pitch") || "Nous concevons des plateformes web, des ERP métiers et des identités de marque pour les entreprises et institutions africaines qui exigent un standard international."}
          </motion.p>


          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4"
          >
            <Button
              variant="hero"
              size="lg"
              className="group relative px-4 md:px-6 py-2 text-sm  transition-all duration-500"
              asChild
            >
              <Link to="/contact">
                <span className="flex items-center gap-2">
                  {t("hero.cta.start")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              className="group px-4 md:px-6 py-2 text-sm backdrop-blur-md"
              asChild
            >
              <Link to="/services">
                <span className="flex items-center gap-2">
                  {t("hero.cta.discover")}
                </span>
              </Link>
            </Button>
          </motion.div>

          {/* Key figures — real, measurable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 items-start gap-6 md:gap-16 pt-4 mt-6 border-t border-border/40 w-full max-w-2xl"
          >
            {[
              { value: "10+", label: t("hero.stat.projects") || "Projets livrés" },
              { value: "6", label: t("hero.stat.sectors") || "Secteurs couverts" },
              { value: "3", label: t("hero.stat.countries") || "Pays d'intervention" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground">{s.value}</div>
                <div className="mt-1.5 text-[10px] md:text-xs text-muted-foreground tracking-[0.15em] uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

    </section>
  );
};
