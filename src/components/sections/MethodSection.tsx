import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import marbleBg from "@/assets/marble-bg.jpg";
import { methodSteps, methodTrustPoints } from "@/data/method";

export const MethodSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="methode"
      className="section-padding relative overflow-hidden"
      style={{
        backgroundImage: `url(${marbleBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80" />

      <div className="container-zenora relative" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            NOTRE MÉTHODE
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Notre <span className="text-gradient-gold">Processus</span> de Travail
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une approche structurée et transparente pour garantir le succès de votre projet
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 transform md:-translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-12">
            {methodSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div
                  className={`flex-1 ml-20 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="bg-card p-6 md:p-8 rounded-lg shadow-elegant border border-border hover:border-primary/30 transition-all duration-300 group">
                    <div
                      className={`flex items-center gap-4 mb-4 ${
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="font-display text-4xl font-bold text-gradient-gold">
                        {step.number}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center shadow-elegant">
                    <step.icon className="h-11 w-11" />
                  </div>
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-gold rounded-lg p-8 md:p-12 shadow-elegant">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
              Pourquoi nous faire confiance ?
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodTrustPoints.map((item, index) => (
                <div
                  key={index}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <p className="text-primary-foreground font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
