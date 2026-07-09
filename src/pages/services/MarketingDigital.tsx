import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Megaphone,
  Mail,
  Search,
  Globe,
  FileText,
  BarChart3,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MarketingDigital() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = [
    {
      icon: Megaphone,
      title: t("marketing.service1.title"),
      description: t("marketing.service1.desc"),
    },
    {
      icon: Mail,
      title: t("marketing.service2.title"),
      description: t("marketing.service2.desc"),
    },
    {
      icon: Globe,
      title: t("marketing.service3.title"),
      description: t("marketing.service3.desc"),
    },
    {
      icon: FileText,
      title: t("marketing.service4.title"),
      description: t("marketing.service4.desc"),
    },
    {
      icon: Search,
      title: t("marketing.service5.title"),
      description: t("marketing.service5.desc"),
    },
    {
      icon: BarChart3,
      title: t("marketing.service6.title"),
      description: t("marketing.service6.desc"),
    },
  ];

  const advantages = [
    {
      icon: Target,
      title: t("marketing.advantage1.title"),
      description: t("marketing.advantage1.desc"),
    },
    {
      icon: TrendingUp,
      title: t("marketing.advantage2.title"),
      description: t("marketing.advantage2.desc"),
    },
    {
      icon: Users,
      title: t("marketing.advantage3.title"),
      description: t("marketing.advantage3.desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t("marketing.titleHighlight")}
        description={t("marketing.description")}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-accent/20 via-muted/10 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
          <div className="absolute top-10 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
          
          <div className="container-zenora relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
              <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                {t("serviceDetail.back")}
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Megaphone className="w-8 h-8 text-primary" />
                </motion.div>
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  {t("marketing.label")}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t("marketing.title")} <span className="text-gradient-gold">{t("marketing.titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t("marketing.description")}
              </p>
              <Button variant="hero" asChild>
                <Link to="/contact">
                  {t("serviceDetail.quote")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding" ref={ref}>
          <div className="container-zenora">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {t("serviceDetail.services").split(" ")[0]} <span className="text-gradient-gold">{t("serviceDetail.services").split(" ")[1]}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("marketing.servicesDesc")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="section-padding bg-accent/30">
          <div className="container-zenora">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
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
                  <p className="text-muted-foreground">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary text-secondary-foreground">
          <div className="container-zenora text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                {t("marketing.cta.title")} <span className="text-gradient-gold">{t("marketing.cta.titleHighlight")}</span>
              </h2>
              <p className="text-secondary-foreground/70 max-w-2xl mx-auto mb-8">
                {t("marketing.cta.description")}
              </p>
              <Button variant="hero" asChild>
                <Link to="/contact">
                  {t("serviceDetail.contactUs")}
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
