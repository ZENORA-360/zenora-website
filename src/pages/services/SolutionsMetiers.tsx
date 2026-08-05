import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Settings,
  Cog,
  Building2,
  GraduationCap,
  Layers,
  Globe,
  Wrench,
  Database,
  LineChart,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { PageCTA } from "@/components/sections/PageCTA";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Icon3DGear } from "@/components/icons/Zenora3DIcons";

export default function SolutionsMetiers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = [
    {
      icon: Cog,
      title: t("solutions.service1.title"),
      description: t("solutions.service1.desc"),
    },
    {
      icon: Settings,
      title: t("solutions.service2.title"),
      description: t("solutions.service2.desc"),
    },
    {
      icon: Building2,
      title: t("solutions.service3.title"),
      description: t("solutions.service3.desc"),
    },
    {
      icon: Layers,
      title: t("solutions.service4.title"),
      description: t("solutions.service4.desc"),
    },
    {
      icon: GraduationCap,
      title: t("solutions.service5.title"),
      description: t("solutions.service5.desc"),
    },
    {
      icon: Globe,
      title: t("solutions.service6.title"),
      description: t("solutions.service6.desc"),
    },
  ];

  const advantages = [
    {
      icon: Wrench,
      title: t("solutions.advantage1.title"),
      description: t("solutions.advantage1.desc"),
    },
    {
      icon: Database,
      title: t("solutions.advantage2.title"),
      description: t("solutions.advantage2.desc"),
    },
    {
      icon: LineChart,
      title: t("solutions.advantage3.title"),
      description: t("solutions.advantage3.desc"),
    },
  ];

  const sectors = [
    t("solutions.sector1"),
    t("solutions.sector2"),
    t("solutions.sector3"),
    t("solutions.sector4"),
    t("solutions.sector5"),
    t("solutions.sector6"),
    t("solutions.sector7"),
    t("solutions.sector8"),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t("solutions.titleHighlight")}
        description={t("solutions.description")}
      />
      <Header />
      <main>
        <div className="container-zenora pt-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("serviceDetail.back")}
          </Link>
        </div>

        <PageHero
          eyebrow={t("solutions.label")}
          title={
            <>
              {t("solutions.title")} <span className="text-gradient-gold">{t("solutions.titleHighlight")}</span>
            </>
          }
          lead={t("solutions.description")}
        >
          <div className="flex items-center gap-4">
            <Icon3DGear className="h-14 w-14" />
            <Button variant="hero" asChild>
              <Link to="/contact">
                {t("serviceDetail.quote")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </PageHero>

        {/* Services Grid */}
        <section className="section-padding" ref={ref}>
          <div className="container-zenora">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                {t("serviceDetail.expertises").split(" ")[0]} <span className="text-gradient-gold">{t("serviceDetail.expertises").split(" ")[1]}</span>
              </h2>
              <p className="section-lead mx-auto max-w-2xl">
                {t("solutions.expertisesDesc")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="card-copy">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="section-padding bg-accent/30">
          <div className="container-zenora">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="section-title mb-4">
                {t("serviceDetail.sectors").split(" ")[0]} <span className="text-gradient-gold">{t("serviceDetail.sectors").split(" ").slice(1).join(" ")}</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {sectors.map((sector, index) => (
                <motion.span
                  key={sector}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-5 py-2 bg-card border border-border rounded-full text-foreground font-medium"
                >
                  {sector}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Advantages */}
        <section className="section-padding">
          <div className="container-zenora">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                {t("serviceDetail.advantages").split(" ")[0]} <span className="text-gradient-gold">{t("serviceDetail.advantages").split(" ")[1]}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {advantage.title}
                  </h3>
                  <p className="section-lead mx-auto">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <PageCTA
          title={
            <>
              {t("solutions.cta.title")} <span className="text-gradient-gold">{t("solutions.cta.titleHighlight")}</span>
            </>
          }
          lead={t("solutions.cta.description")}
          primaryLabel={t("serviceDetail.contactUs")}
        />
      </main>
      <Footer />
    </div>
  );
}
