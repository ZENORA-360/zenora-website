import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagicCard } from "@/components/ui/magic-card";
import { corePillars } from "@/data/core-pillars";
import { pickLocale } from "@/data/locale";

export const CorePillarsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  return (
    <section ref={ref} className="section-padding bg-secondary">
      <div className="container-zenora">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="section-eyebrow">
                {language === "fr" ? "Notre Expertise" : "Our Expertise"}
              </span>
            </div>
            <h2 className="section-title">
              {language === "fr" ? "Piliers Fondamentaux de l'" : "Core Pillars of "}
              <span className="text-muted-foreground">
                {language === "fr" ? "Innovation" : "Innovation"}
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-lead-accent"
          >
            {language === "fr"
              ? "Des solutions complètes conçues pour élever votre infrastructure et votre identité de marque vers de nouveaux sommets."
              : "Comprehensive solutions designed to elevate your business infrastructure and brand identity to new heights."}
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar, index) => {
            const title = pickLocale(language, pillar.title);
            const description = pickLocale(language, pillar.description);
            return (
            <motion.div
              key={pillar.link}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="h-full"
            >
              <MagicCard
                className="transition-transform duration-500"
                gradientSize={240}
                gradientFrom="#F0C75E"
                gradientTo="#C5922A"
                gradientColor="rgba(197, 146, 42, 0.22)"
              >
                <Link
                  to={pillar.link}
                  className="group/card flex h-full min-h-[200px] flex-col gap-5 p-6"
                >
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover/card:text-primary">
                      {title}
                    </h3>
                    <p className="card-copy">
                      {description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-2 text-primary opacity-0 transition-all duration-300 translate-x-[-8px] group-hover/card:translate-x-0 group-hover/card:opacity-100">
                    <span className="text-sm font-medium">
                      {language === "fr" ? "En savoir plus" : "Learn more"}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </MagicCard>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
