import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { strategicFeatures } from "@/data/strategic-insight";
import { pickLocale } from "@/data/locale";
import ABOUT_IMAGE from "@/assets/photos/about-team.svg";

export const StrategicInsightSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-zenora relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 relative rounded-lg overflow-hidden aspect-square group"
          >
            <img
              src={ABOUT_IMAGE}
              alt={language === "fr" ? "Équipe travaillant sur des solutions digitales" : "Team working on digital solutions"}
              className="object-cover w-full h-full transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-border rounded-lg pointer-events-none" />

          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 flex flex-col gap-8"
          >
            <h2 className="section-title">
              {language === "fr" ? "Une équipe technique," : "A technical team,"}{" "}
              <br />
              <span className="text-gradient-gold">
                {language === "fr" ? "un engagement écrit." : "a written commitment."}
              </span>
            </h2>

            <p className="section-lead max-w-none">
              {language === "fr"
                ? "Chaque projet est cadré par un devis, un planning et un référent unique. Le code, les accès et la documentation vous appartiennent — livrés sur votre dépôt, sur votre infrastructure."
                : "Every project is framed by a written quote, a schedule and a single point of contact. Code, credentials and documentation belong to you — delivered on your repository, on your infrastructure."}
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4 mt-4">
              {strategicFeatures.map((feature, index) => {
                const title = pickLocale(language, feature.title);
                const description = pickLocale(language, feature.description);
                return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group cursor-default flex items-start gap-1 p-2 rounded-sm bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <motion.span
                    className="relative cursor-default flex h-12 w-12 shrink-0 items-center justify-center"
                   
                  >
                    <feature.icon className="h-11 w-11" />
                  </motion.span>
                  <div>
                    <h4 className="cursor-default text-foreground font-bold text-lg">{title}</h4>
                    <p className="cursor-default card-copy mt-1">{description}</p>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
