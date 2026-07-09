import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Megaphone, Palette, Settings } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = [
    {
      id: "developpement-web",
      icon: Globe,
      title: t("services.webDev.title"),
      description: t("services.webDev.description"),
      features: [
        t("services.webDev.feature1"),
        t("services.webDev.feature2"),
        t("services.webDev.feature3"),
        t("services.webDev.feature4"),
      ],
    },
    {
      id: "marketing-digital",
      icon: Megaphone,
      title: t("services.marketing.title"),
      description: t("services.marketing.description"),
      features: [
        t("services.marketing.feature1"),
        t("services.marketing.feature2"),
        t("services.marketing.feature3"),
        t("services.marketing.feature4"),
      ],
    },
    {
      id: "design-graphic",
      icon: Palette,
      title: t("services.design.title"),
      description: t("services.design.description"),
      features: [
        t("services.design.feature1"),
        t("services.design.feature2"),
        t("services.design.feature3"),
        t("services.design.feature4"),
      ],
    },
    {
      id: "solutions-metiers",
      icon: Settings,
      title: t("services.solutions.title"),
      description: t("services.solutions.description"),
      features: [
        t("services.solutions.feature1"),
        t("services.solutions.feature2"),
        t("services.solutions.feature3"),
        t("services.solutions.feature4"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t("nav.services")}
        description={t("services.description")}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-24 md:pt-48 md:pb-32 relative overflow-hidden border-b border-border/60">
          {/* Ambient 3D-ish backdrop */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-primary/8 blur-[130px]" />
            <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
          </div>

          <div className="container-zenora relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold text-primary tracking-[0.3em] uppercase font-display">
                  {t("services.title")}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.02] mb-6">
                {t("services.title")}{" "}
                <span className="text-gradient-gold">{t("services.titleHighlight")}</span>{" "}
                {t("services.titleEnd")}
              </h1>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t("services.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding" ref={ref}>
          <div className="container-zenora">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/services/${service.id}`}
                    className="block h-full group"
                  >
                    <div className="relative h-full p-8 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 overflow-hidden">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-md bg-gradient-gold flex items-center justify-center mb-6 shadow-gold group-hover:scale-105 transition-transform duration-300">
                        <service.icon className="w-7 h-7 text-primary-foreground" />
                      </div>

                      {/* Content */}
                      <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Arrow */}
                      <div className="flex items-center gap-2 text-primary font-medium">
                        {t("services.learnMore")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-secondary text-secondary-foreground">
          <div className="container-zenora text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                {t("services.cta.title")} <span className="text-gradient-gold">{t("services.cta.titleHighlight")}</span> ?
              </h2>
              <p className="text-secondary-foreground/70 max-w-2xl mx-auto mb-8">
                {t("services.cta.description")}
              </p>
              <Button variant="hero" asChild>
                <Link to="/contact">
                  {t("services.cta.button")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
