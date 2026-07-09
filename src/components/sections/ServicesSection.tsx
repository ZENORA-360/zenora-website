import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Globe,
  Megaphone,
  Palette,
  Settings,
  Monitor,
  ShoppingCart,
  GraduationCap,
  Building2,
  Mail,
  Search,
  Video,
  FileText,
  Cog,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = [
    {
      id: "web",
      icon: Globe,
      title: t("services.webDev.title"),
      description: t("services.webDev.description"),
      items: [
        { icon: Monitor, label: t("services.webDev.feature1") },
        { icon: Layers, label: t("services.webDev.feature2") },
        { icon: ShoppingCart, label: t("services.webDev.feature3") },
        { icon: Building2, label: t("services.webDev.feature4") },
      ],
    },
    {
      id: "marketing",
      icon: Megaphone,
      title: t("services.marketing.title"),
      description: t("services.marketing.description"),
      items: [
        { icon: Megaphone, label: t("services.marketing.feature1") },
        { icon: Mail, label: t("services.marketing.feature2") },
        { icon: Search, label: t("services.marketing.feature3") },
        { icon: Globe, label: t("services.marketing.feature4") },
      ],
    },
    {
      id: "design",
      icon: Palette,
      title: t("services.design.title"),
      description: t("services.design.description"),
      items: [
        { icon: Palette, label: t("services.design.feature1") },
        { icon: Video, label: t("services.design.feature2") },
        { icon: FileText, label: t("services.design.feature3") },
        { icon: Video, label: t("services.design.feature4") },
      ],
    },
    {
      id: "expertise",
      icon: Settings,
      title: t("services.solutions.title"),
      description: t("services.solutions.description"),
      items: [
        { icon: Cog, label: t("services.solutions.feature1") },
        { icon: Settings, label: t("services.solutions.feature2") },
        { icon: Building2, label: t("services.solutions.feature3") },
        { icon: GraduationCap, label: t("services.solutions.feature4") },
      ],
    },
  ];

  const [activeService, setActiveService] = useState(services[0].id);
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
              <service.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{service.title.split("&")[0].trim()}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-elegant border border-primary/20"
        >
          <div className="bg-gradient-gold p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <currentService.icon className="w-7 h-7 text-primary-foreground" />
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
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/50 transition-all duration-300"
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
