import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Eye, Lightbulb, Target, Users } from "lucide-react";
import ABOUT_IMAGE from "@/assets/photos/about-team.svg";

const benefits = [
  "Renforcer votre visibilité digitale",
  "Valoriser votre image de marque",
  "Structurer vos processus numériques",
  "Préparer la croissance de votre activité",
];

const values = [
  { icon: Target, title: "Résultats", description: "Approche orientée performance" },
  { icon: Users, title: "Transparence", description: "Communication claire et continue" },
  { icon: Lightbulb, title: "Innovation", description: "Solutions évolutives et modernes" },
  { icon: Eye, title: "Accompagnement", description: "Support personnalisé" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apropos" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle marble texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-muted/50 to-transparent" />

      <div className="container-zenora relative" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            À PROPOS
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Présentation <span className="text-gradient-gold">Générale</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image with frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-elegant">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-xl z-10 pointer-events-none" />
              <img
                src={ABOUT_IMAGE}
                alt="Équipe ZENORA au travail"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
              
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-card/95 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <p className="font-display text-lg italic text-foreground">
                    « <span className="text-gradient-gold">Zenora</span>, de Zéro au Zénith »
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
            <p className="text-lg text-muted-foreground leading-relaxed">
              <strong className="text-foreground">ZENORA</strong> est une entreprise technologique 
              spécialisée dans la digitalisation, la structuration numérique et la visibilité des 
              organisations. Elle accompagne entreprises, entrepreneurs et institutions à chaque 
              étape de leur transformation digitale.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              De la conception initiale jusqu'au déploiement de solutions numériques fiables, 
              performantes et évolutives, ZENORA s'engage à proposer des outils adaptés aux 
              réalités locales, conçus pour améliorer durablement l'efficacité, l'organisation 
              et l'impact de ses partenaires.
            </p>

            {/* Benefits list */}
            <div className="pt-4">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Ce que ZENORA vous permet de faire
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
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-gold"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                {value.title}
              </h4>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
