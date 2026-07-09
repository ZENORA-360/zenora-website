import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Cpu, Layers, Rocket, Shield, Sparkles, Workflow } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * HorizontalScrollSection — Panel pinned during vertical scroll, content translates horizontally.
 * Glassmorphism cards, corporate premium tone.
 */

export const HorizontalScrollSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const { language } = useLanguage();

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-72%"]);

  const cards = [
    {
      icon: Cpu,
      title: language === "fr" ? "Architecture" : "Architecture",
      desc:
        language === "fr"
          ? "Systèmes modulaires, découplés, prêts pour la scalabilité horizontale."
          : "Modular, decoupled systems ready for horizontal scaling.",
    },
    {
      icon: Layers,
      title: language === "fr" ? "Design System" : "Design System",
      desc:
        language === "fr"
          ? "Tokens, composants, et cohérence visuelle pilotée par le design."
          : "Tokens, components, and visual consistency driven by design.",
    },
    {
      icon: Workflow,
      title: language === "fr" ? "Automatisation" : "Automation",
      desc:
        language === "fr"
          ? "Pipelines CI/CD, tests, déploiements. Zéro friction opérationnelle."
          : "CI/CD pipelines, tests, deployments. Zero operational friction.",
    },
    {
      icon: Shield,
      title: language === "fr" ? "Sécurité" : "Security",
      desc:
        language === "fr"
          ? "Audits, scans SAST/DAST, conformité, chiffrement et RBAC."
          : "Audits, SAST/DAST scans, compliance, encryption and RBAC.",
    },
    {
      icon: Rocket,
      title: language === "fr" ? "Performance" : "Performance",
      desc:
        language === "fr"
          ? "Core Web Vitals au vert, bundles optimisés, rendu instantané."
          : "Core Web Vitals in the green, optimised bundles, instant rendering.",
    },
    {
      icon: Sparkles,
      title: language === "fr" ? "Excellence" : "Excellence",
      desc:
        language === "fr"
          ? "Standards internationaux, revue de code, mentorat continu."
          : "International standards, code review, continuous mentorship.",
    },
  ];

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-background"
      aria-label={language === "fr" ? "Nos expertises" : "Our expertise"}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="relative z-10 w-full">
          {/* Section eyebrow */}
          <div className="container-zenora mb-10 md:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold text-primary tracking-[0.3em] uppercase font-display">
                {language === "fr" ? "Nos expertises" : "Our expertise"}
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.05]">
              {language === "fr"
                ? "Six piliers, un standard international."
                : "Six pillars, one international standard."}
            </h2>
          </div>

          {/* Horizontal track */}
          <motion.div style={{ x }} className="flex gap-6 md:gap-8 pl-6 md:pl-16">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className="group relative h-[380px] md:h-[440px] w-[300px] md:w-[420px] shrink-0 rounded-2xl overflow-hidden"
              >
                {/* Glassmorphism card */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl shadow-[0_20px_60px_-20px_hsla(42,80%,45%,0.15)]" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-60" />
                <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />

                <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center backdrop-blur">
                      <card.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-display text-5xl font-bold text-primary/20 tabular-nums">
                      0{i + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
