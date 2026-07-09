import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects } from "@/pages/Projects";

import { partnerImages } from "@/lib/site";

const partners = [
  { name: "K&C Services", logo: partnerImages.kcServices },
  { name: "NEXUS", logo: partnerImages.nexus },
  { name: "CAFCA", logo: partnerImages.cafca },
  { name: "Educate Young Girls", logo: partnerImages.eyg },
  { name: "Worketyamo", logo: partnerImages.worketyamo },
];

export const TrustedBySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section ref={ref} className="py-14 md:py-20 px-4 bg-background border-t border-border/60">
      <div className="container-zenora">
        {/* Partners — Trusted by */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold text-primary tracking-[0.3em] uppercase font-display">
              {language === "fr" ? "Ils nous font confiance" : "Trusted by"}
            </span>
            <span className="h-px w-8 bg-primary" />
          </div>

          {/* Infinite horizontal marquee with edge fade */}
          <div className="relative overflow-hidden marquee-mask">
            <div className="flex gap-8 md:gap-14 animate-marquee whitespace-nowrap py-2">
              {[...partners, ...partners, ...partners].map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className="group flex items-center justify-center h-14 md:h-16 shrink-0 px-4"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-10 md:max-h-12 w-auto object-contain opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 dark:invert-[0.05]"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Header — Featured projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold text-primary tracking-[0.3em] uppercase font-display">
                {language === "fr" ? "Réalisations récentes" : "Recent work"}
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-[1.05]">
              {language === "fr"
                ? "Des projets livrés, en production."
                : "Shipped projects, live in production."}
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            {language === "fr" ? "Voir tous les projets" : "View all projects"}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Featured projects — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.35)] transition-all duration-500"
            >
              <div className={`relative aspect-[16/10] overflow-hidden ${p.screenshotMode === "logo" ? "bg-gradient-to-br from-[#0a1a3a] via-[#0d2350] to-[#1a1030] flex items-center justify-center" : "bg-muted"}`}>
                <img
                  src={p.screenshot}
                  alt={p.name}
                  loading="lazy"
                  className={
                    p.screenshotMode === "logo"
                      ? "max-w-[70%] max-h-[70%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-[1.05]"
                      : "w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  }
                />
                {p.screenshotMode !== "logo" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
                )}
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span>{p.sector[language]}</span>
                  <span className="tabular-nums">{p.year}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                  {p.name}
                  <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {p.summary[language]}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
