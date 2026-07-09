import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Shield, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import STRATEGIC_IMAGE from "@/assets/photos/strategic-team.jpg";

export const StrategicInsightSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  const features = [
    {
      icon: CheckCircle2,
      title: language === "fr" ? "Cadrage & itération" : "Framing & iteration",
      description: language === "fr"
        ? "Cahier des charges rédigé, sprints courts, livrables validés à chaque étape."
        : "Written brief, short sprints, deliverables validated at every step.",
    },
    {
      icon: Shield,
      title: language === "fr" ? "Code sous contrôle" : "Code under control",
      description: language === "fr"
        ? "Revue de code, tests, CI/CD, sauvegardes et journalisation dès le premier commit."
        : "Code review, tests, CI/CD, backups and logging from the first commit.",
    },
    {
      icon: HeadphonesIcon,
      title: language === "fr" ? "Suivi post-livraison" : "Post-launch support",
      description: language === "fr"
        ? "Maintenance corrective et évolutive, SLA écrit, un interlocuteur unique."
        : "Corrective and evolutive maintenance, written SLA, a single point of contact.",
    },
  ];

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
            className="order-2 md:order-1 relative rounded-2xl overflow-hidden aspect-square group"
          >
            <img
              src={STRATEGIC_IMAGE}
              alt={language === "fr" ? "Équipe travaillant sur des solutions digitales" : "Team working on digital solutions"}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-border rounded-2xl pointer-events-none" />

          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 flex flex-col gap-8"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-foreground">
              {language === "fr" ? "Une équipe technique," : "A technical team,"}{" "}
              <br />
              <span className="text-gradient-gold">
                {language === "fr" ? "un engagement écrit." : "a written commitment."}
              </span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {language === "fr"
                ? "Chaque projet est cadré par un devis, un planning et un référent unique. Le code, les accès et la documentation vous appartiennent — livrés sur votre dépôt, sur votre infrastructure."
                : "Every project is framed by a written quote, a schedule and a single point of contact. Code, credentials and documentation belong to you — delivered on your repository, on your infrastructure."}
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4 mt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <feature.icon className="w-6 h-6 text-primary mt-0.5 flex-shrink-0 drop-shadow-[0_0_8px_hsla(42,70%,50%,0.4)]" />
                  <div>
                    <h4 className="text-foreground font-bold text-lg">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
