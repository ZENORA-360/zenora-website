import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye } from "lucide-react";

export const MissionVisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-zenora" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            MISSION & VISION
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Notre <span className="text-gradient-gold">Raison d'Être</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div className="h-full bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 shadow-elegant hover:shadow-gold">
              {/* Header */}
              <div className="bg-gradient-gold p-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                    <Target className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-primary-foreground">
                    Notre Mission
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Concevoir et déployer des{" "}
                  <strong className="text-foreground">solutions numériques simples, fiables et adaptées</strong>{" "}
                  aux réalités locales pour optimiser la gestion et la performance des organisations.
                </p>

                <div className="mt-6 pt-6 border-t border-border">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground">Solutions adaptées aux réalités africaines</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground">Optimisation de la performance organisationnelle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground">Accompagnement durable et personnalisé</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group"
          >
            <div className="h-full bg-secondary text-secondary-foreground rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 shadow-elegant hover:shadow-gold">
              {/* Header */}
              <div className="bg-gradient-to-r from-secondary to-foreground/90 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-secondary-foreground">
                    Notre Vision
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-lg text-secondary-foreground/80 leading-relaxed">
                  Devenir un{" "}
                  <strong className="text-gradient-gold">acteur de référence de la transformation digitale en Afrique</strong>,{" "}
                  en rendant la technologie accessible, utile et durable pour tous les secteurs.
                </p>

                <div className="mt-6 pt-6 border-t border-secondary-foreground/20">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-secondary-foreground">Leadership en transformation digitale</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-secondary-foreground">Technologie accessible pour tous</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-secondary-foreground">Impact durable sur le continent africain</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
