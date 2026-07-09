import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Grid3X3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, lazy, Suspense } from "react";

// Lazy load 3D scene — WebGL is heavy, only load when hero renders
const NetworkScene = lazy(() =>
  import("@/components/three/NetworkScene").then((m) => ({ default: m.NetworkScene }))
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
      {/* Refined background — restraint over spectacle */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute inset-0 bg-gold-gradient-radial opacity-20" />
        <div className="absolute inset-0 grid-pattern opacity-[0.15]" />
      </div>

      {/* WebGL 3D network — subtle, ambient, ESN metaphor */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[70vh] max-h-[600px] pointer-events-none opacity-30 md:opacity-40 mix-blend-luminosity dark:mix-blend-screen">
        <Suspense fallback={null}>
          <NetworkScene />
        </Suspense>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/50 via-transparent to-background/70" />



      {/* Decorative border frame */}
      <motion.div 
        className="absolute inset-6 md:inset-10 border border-primary/10 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Content */}
      <motion.div 
        className="container-zenora relative z-10 py-20 md:py-28"
        style={{ y, opacity }}
      >
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">


          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter mb-8"
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
            className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-12"
          >
            {t("hero.pitch") || "Nous concevons des plateformes web, des ERP métiers et des identités de marque pour les entreprises et institutions africaines qui exigent un standard international."}
          </motion.p>


          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16"
          >
            <Button
              variant="hero"
              size="xl"
              className="group relative min-w-[220px] h-16 text-lg glow-gold hover:glow-gold-lg transition-all duration-500"
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
              size="xl"
              className="group min-w-[220px] h-16 text-lg backdrop-blur-md"
              asChild
            >
              <Link to="/services">
                <span className="flex items-center gap-2">
                  {t("hero.cta.discover")}
                  <Grid3X3 className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </span>
              </Link>
            </Button>
          </motion.div>

          {/* Key figures — real, measurable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 gap-6 md:gap-16 pt-10 border-t border-border/40 w-full max-w-2xl"
          >
            {[
              { value: "10+", label: t("hero.stat.projects") || "Projets livrés" },
              { value: "6", label: t("hero.stat.sectors") || "Secteurs couverts" },
              { value: "3", label: t("hero.stat.countries") || "Pays d'intervention" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground">{s.value}</div>
                <div className="mt-1 text-[10px] md:text-xs text-muted-foreground tracking-[0.15em] uppercase">{s.label}</div>
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
