import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { aboutEngagements } from "@/data/about-page";

export const AboutEngagementsSection = () => {
  const refEngagements = useRef(null);
  const isEngagementsInView = useInView(refEngagements, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const engagements = aboutEngagements.map((e) => ({
    icon: e.icon,
    title: t(e.titleKey),
    description: t(e.descriptionKey),
  }));

  return (
    <section className="section-padding bg-muted/30" ref={refEngagements}>
      <div className="container-zenora">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isEngagementsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            {t("about.engagements")} <span className="text-gradient-gold">{t("about.engagementsHighlight")}</span>
          </h2>
          <p className="section-lead mx-auto max-w-2xl">
            {t("about.engagementsDesc")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isEngagementsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-gold"
            >
              <engagement.icon className="h-11 w-11 mb-4" />
              <h4 className="font-display text-xl font-semibold text-foreground mb-2">
                {engagement.title}
              </h4>
              <p className="card-copy-md">{engagement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
