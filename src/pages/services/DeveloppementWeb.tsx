import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  Monitor,
  ShoppingCart,
  Building2,
  GraduationCap,
  Layers,
  Clock,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { PageCTA } from "@/components/sections/PageCTA";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Icon3DGlobe, Icon3DZap, Icon3DShield } from "@/components/icons/Zenora3DIcons";

export default function DeveloppementWeb() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = [
    {
      icon: Monitor,
      title: t("webDev.service1.title"),
      description: t("webDev.service1.desc"),
    },
    {
      icon: Layers,
      title: t("webDev.service2.title"),
      description: t("webDev.service2.desc"),
    },
    {
      icon: ShoppingCart,
      title: t("webDev.service3.title"),
      description: t("webDev.service3.desc"),
    },
    {
      icon: Building2,
      title: t("webDev.service4.title"),
      description: t("webDev.service4.desc"),
    },
    {
      icon: GraduationCap,
      title: t("webDev.service5.title"),
      description: t("webDev.service5.desc"),
    },
    {
      icon: Globe,
      title: t("webDev.service6.title"),
      description: t("webDev.service6.desc"),
    },
  ];

  const advantages = [
    {
      icon: Icon3DZap,
      title: t("webDev.advantage1.title"),
      description: t("webDev.advantage1.desc"),
    },
    {
      icon: Icon3DShield,
      title: t("webDev.advantage2.title"),
      description: t("webDev.advantage2.desc"),
    },
    {
      icon: Clock,
      title: t("webDev.advantage3.title"),
      description: t("webDev.advantage3.desc"),
    },
  ];

  const processSteps = [
    { step: "01", title: t("webDev.process1"), desc: t("webDev.process1.desc") },
    { step: "02", title: t("webDev.process2"), desc: t("webDev.process2.desc") },
    { step: "03", title: t("webDev.process3"), desc: t("webDev.process3.desc") },
    { step: "04", title: t("webDev.process4"), desc: t("webDev.process4.desc") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t("webDev.titleHighlight")}
        description={t("webDev.description")}
      />
      <Header />
      <main>
        <div className="container-zenora pt-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("serviceDetail.back")}
          </Link>
        </div>

        <PageHero
          eyebrow={t("webDev.label")}
          title={
            <>
              {t("webDev.title")} <span className="text-gradient-gold">{t("webDev.titleHighlight")}</span>
            </>
          }
          lead={t("webDev.description")}
        >
          <div className="flex items-center gap-4">
            <Icon3DGlobe className="h-14 w-14" />
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
                {t("serviceDetail.solutions").split(" ")[0]} <span className="text-gradient-gold">{t("serviceDetail.solutions").split(" ")[1]}</span>
              </h2>
              <p className="section-lead mx-auto max-w-2xl">
                {t("webDev.solutionsDesc")}
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
              <h2 className="section-title mb-4">
                {t("serviceDetail.whyChoose").split(" ").slice(0, 2).join(" ")} <span className="text-gradient-gold">{t("serviceDetail.whyChoose").split(" ").slice(2).join(" ")}</span>
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
                  <advantage.icon className="h-14 w-14 text-primary mx-auto mb-4" />
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

        {/* Process */}
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
                {t("serviceDetail.process").split(" ")[0]} <span className="text-gradient-gold">{t("serviceDetail.process").split(" ")[1]}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-display font-bold text-primary/20 mb-2">
                    {item.step}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <PageCTA
          title={
            <>
              {t("webDev.cta.title")} <span className="text-gradient-gold">{t("webDev.cta.titleHighlight")}</span> ?
            </>
          }
          lead={t("webDev.cta.description")}
          primaryLabel={t("serviceDetail.contactUs")}
        />
      </main>
      <Footer />
    </div>
  );
}
