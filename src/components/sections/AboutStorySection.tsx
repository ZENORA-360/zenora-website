import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { aboutBenefitKeys, aboutValuesPage } from "@/data/about-page";
import APROPOS_IMAGE from "@/assets/photos/apropos-team.svg";

export const AboutStorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const benefits = aboutBenefitKeys.map((key) => t(key));

  const values = aboutValuesPage.map((v) => ({
    icon: v.icon,
    title: t(v.titleKey),
    description: t(v.descriptionKey),
  }));

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-muted/50 to-transparent" />

      <div className="container-zenora relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image with frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-elegant">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-lg z-10 pointer-events-none" />
              <img
                src={APROPOS_IMAGE}
                alt={t("about.imageAlt")}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-card/95 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <p className="font-display text-lg italic text-foreground">
                    « <span className="text-gradient-gold">{t("about.quote")}</span>{t("about.quoteText")} »
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="section-title">
              {t("about.presentation")} <span className="text-gradient-gold">{t("about.presentationHighlight")}</span>
            </h2>

            <p className="section-lead max-w-none text-lg">
              <strong className="text-foreground">ZENORA</strong> {t("about.presentationText1")}
            </p>

            <p className="card-copy-md">
              {t("about.presentationText2")}
            </p>

            {/* Benefits list */}
            <div className="pt-4">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                {t("about.whatWeEnable")}
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </span>
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="section-title text-center mb-10 text-2xl md:text-3xl">
            {t("about.values")} <span className="text-gradient-gold">{t("about.valuesHighlight")}</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-gold"
              >
                <value.icon className="h-11 w-11 mx-auto mb-4" />
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="card-copy">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
