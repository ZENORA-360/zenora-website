import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Icon3DTarget, Icon3DEye } from "@/components/icons/Zenora3DIcons";
import { useLanguage } from "@/contexts/LanguageContext";
import { aboutMissionKeys, aboutVisionKeys } from "@/data/about-page";

export const AboutMissionVisionSection = () => {
  const { t } = useLanguage();

  const missionPoints = aboutMissionKeys.map((key) => t(key));
  const visionPoints = aboutVisionKeys.map((key) => t(key));

  return (
    <section className="section-padding bg-background">
      <div className="container-zenora">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            {t("about.reasonTitle")} <span className="text-gradient-gold">{t("about.reasonHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-gold rounded-lg p-8 md:p-10 shadow-elegant"
          >
            <div className="flex items-center gap-4 mb-6">
              <Icon3DTarget className="h-12 w-12 flex-shrink-0" />
              <h3 className="font-display text-2xl font-bold text-primary-foreground">
                {t("about.mission.title")}
              </h3>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed mb-6">
              {t("about.mission.text")}
            </p>
            <ul className="space-y-3">
              {missionPoints.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-primary-foreground/90">
                  <Check className="w-5 h-5 text-primary-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-secondary rounded-lg p-8 md:p-10 shadow-elegant"
          >
            <div className="flex items-center gap-4 mb-6">
              <Icon3DEye className="h-12 w-12 flex-shrink-0" />
              <h3 className="font-display text-2xl font-bold text-secondary-foreground">
                {t("about.vision.title")}
              </h3>
            </div>
            <p className="text-secondary-foreground/90 leading-relaxed mb-6">
              {t("about.vision.text")}
            </p>
            <ul className="space-y-3">
              {visionPoints.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary-foreground/90">
                  <Check className="w-5 h-5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
