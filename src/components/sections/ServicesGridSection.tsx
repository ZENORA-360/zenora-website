import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { servicesPageCards } from "@/data/services-page";

export function ServicesGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = useMemo(
    () =>
      servicesPageCards.map((s) => ({
        ...s,
        title: t(s.titleKey),
        description: t(s.descriptionKey),
        features: s.featureKeys.map((k) => t(k)),
      })),
    [t],
  );

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-zenora">
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/services/${service.id}`} className="group block h-full">
                <div className="relative h-full overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <service.icon className="h-12 w-12" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="section-lead mb-6 max-w-none">{service.description}</p>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 font-medium text-primary">
                    {t("services.learnMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
