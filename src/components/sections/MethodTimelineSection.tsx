import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { methodPageSteps } from "@/data/method-page";
import marbleBg from "@/assets/marble-bg.jpg";

export const MethodTimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const steps = methodPageSteps.map((step) => ({
    number: step.number,
    icon: step.icon,
    title: t(step.titleKey),
    description: t(step.descriptionKey),
    details: step.detailKeys.map((key) => t(key)),
  }));

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        backgroundImage: `url(${marbleBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // Avoid fixed attachment — expensive paint on mobile / low-end GPUs
        backgroundAttachment: "scroll",
      }}
    >
      <div className="absolute inset-0 bg-background/80" />

      <div className="container-zenora relative" ref={ref}>
        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 transform md:-translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div
                  className={`flex-1 ml-20 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
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
                    <p className="section-lead max-w-none mb-4">
                      {step.description}
                    </p>

                    {/* Details list */}
                    <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {step.details.map((detail, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-2 text-sm text-muted-foreground ${
                            index % 2 === 0 ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center icon */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <div className="w-16 h-16 rounded-full bg-card border border-primary/30 flex items-center justify-center shadow-gold">
                    <step.icon className="h-12 w-12" />
                  </div>
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
