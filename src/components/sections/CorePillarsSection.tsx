import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Megaphone, Palette, Cloud, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const CorePillarsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  const pillars = [
    {
      icon: Globe,
      title: language === "fr" ? "Développement web & ERP" : "Web & ERP development",
      description: language === "fr"
        ? "Sites corporate, plateformes SaaS et ERP métier, conçus sur mesure et documentés."
        : "Corporate websites, SaaS platforms and business ERPs, built to spec and documented.",
      link: "/services/developpement-web",
    },
    {
      icon: Megaphone,
      title: language === "fr" ? "Marketing digital" : "Digital marketing",
      description: language === "fr"
        ? "Stratégie de contenu, SEO, campagnes payantes, avec un reporting mensuel chiffré."
        : "Content strategy, SEO, paid campaigns, with a measurable monthly report.",
      link: "/services/marketing-digital",
    },
    {
      icon: Palette,
      title: language === "fr" ? "Design & identité" : "Design & identity",
      description: language === "fr"
        ? "Identité visuelle, charte graphique, UI/UX. Un système cohérent, pas une image ponctuelle."
        : "Visual identity, brand system, UI/UX. A coherent system, not a one-off image.",
      link: "/services/design-graphic",
    },
    {
      icon: Cloud,
      title: language === "fr" ? "Solutions métiers" : "Business solutions",
      description: language === "fr"
        ? "Automatisation de processus, intégrations, hébergement et maintenance sous contrat."
        : "Process automation, integrations, hosting and maintenance under contract.",
      link: "/services/solutions-metiers",
    },
  ];

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
              <span className="text-primary font-bold tracking-widest text-sm uppercase">
                {language === "fr" ? "Notre Expertise" : "Our Expertise"}
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground leading-tight">
              {language === "fr" ? "Piliers Fondamentaux de l'" : "Core Pillars of "}
              <span className="text-muted-foreground">{language === "fr" ? "Innovation" : "Innovation"}</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-base max-w-md border-l-2 border-primary/30 pl-4"
          >
            {language === "fr"
              ? "Des solutions complètes conçues pour élever votre infrastructure et votre identité de marque vers de nouveaux sommets."
              : "Comprehensive solutions designed to elevate your business infrastructure and brand identity to new heights."}
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link
                to={pillar.link}
                className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] relative overflow-hidden h-full"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
                  <pillar.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="text-foreground text-lg font-bold group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-muted-foreground/80">
                    {pillar.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="relative z-10 mt-auto pt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  <span className="text-sm font-medium">
                    {language === "fr" ? "En savoir plus" : "Learn more"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
