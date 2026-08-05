import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { servicesCatalog } from "@/data/services";

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = useMemo(
    () =>
      servicesCatalog.map((service) => ({
        id: service.id,
        icon: service.icon,
        title: t(service.titleKey),
        description: t(service.descriptionKey),
        items: service.items.map((item) => ({
          icon: item.icon,
          label: t(item.labelKey),
        })),
      })),
    [t],
  );

  const [activeService, setActiveService] = useState(servicesCatalog[0].id);
  const currentService = services.find((s) => s.id === activeService)!;

  return (
    <section id="services" className="section-padding bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-zenora relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
            {t("services.label")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            {t("services.title")} <span className="text-gradient-gold">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            {t("services.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                activeService === service.id
                  ? "bg-gradient-gold-shine text-primary-foreground shadow-gold"
                  : "bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/20"
              }`}
            >
              <service.icon className="h-7 w-7" />
              <span className="hidden sm:inline">{service.title.split("&")[0].trim()}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-elegant border border-primary/20"
        >
          <div className="bg-gradient-gold p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <currentService.icon className="h-11 w-11" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                {currentService.title}
              </h3>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-muted-foreground text-lg mb-8">
              {currentService.description}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentService.items.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
