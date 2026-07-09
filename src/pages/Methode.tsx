import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Lightbulb,
  Code,
  Rocket,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import marbleBg from "@/assets/marble-bg.jpg";

const Methode = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const refTrust = useRef(null);
  const isTrustInView = useInView(refTrust, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: Search,
      title: t("method.step1.title"),
      description: t("method.step1.description"),
      details: [
        t("method.step1.detail1"),
        t("method.step1.detail2"),
        t("method.step1.detail3"),
        t("method.step1.detail4"),
      ],
    },
    {
      number: "02",
      icon: Lightbulb,
      title: t("method.step2.title"),
      description: t("method.step2.description"),
      details: [
        t("method.step2.detail1"),
        t("method.step2.detail2"),
        t("method.step2.detail3"),
        t("method.step2.detail4"),
      ],
    },
    {
      number: "03",
      icon: Code,
      title: t("method.step3.title"),
      description: t("method.step3.description"),
      details: [
        t("method.step3.detail1"),
        t("method.step3.detail2"),
        t("method.step3.detail3"),
        t("method.step3.detail4"),
      ],
    },
    {
      number: "04",
      icon: Rocket,
      title: t("method.step4.title"),
      description: t("method.step4.description"),
      details: [
        t("method.step4.detail1"),
        t("method.step4.detail2"),
        t("method.step4.detail3"),
        t("method.step4.detail4"),
      ],
    },
    {
      number: "05",
      icon: HeartHandshake,
      title: t("method.step5.title"),
      description: t("method.step5.description"),
      details: [
        t("method.step5.detail1"),
        t("method.step5.detail2"),
        t("method.step5.detail3"),
        t("method.step5.detail4"),
      ],
    },
  ];

  const trustPoints = [
    t("method.trust.point1"),
    t("method.trust.point2"),
    t("method.trust.point3"),
    t("method.trust.point4"),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t("nav.method")}
        description={t("method.description")}
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-40 pb-24 md:pt-48 md:pb-32 relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
            <div className="absolute top-1/3 left-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary/8 blur-[130px] -translate-x-1/3" />
            <div className="absolute inset-0 grid-pattern opacity-[0.1]" />
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
                  {t("method.title")}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02] tracking-tight mb-6">
                {t("method.title")} <span className="text-gradient-gold">{t("method.titleHighlight")}</span> {t("method.titleEnd")}
              </h1>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {t("method.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section
          className="section-padding relative overflow-hidden"
          style={{
            backgroundImage: `url(${marbleBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
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
                      <div className="bg-card p-6 md:p-8 rounded-xl shadow-elegant border border-border hover:border-primary/30 transition-all duration-300 group">
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
                        <p className="text-muted-foreground leading-relaxed mb-4">
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
                      <div className="w-16 h-16 rounded-full bg-gradient-gold-shine flex items-center justify-center shadow-gold">
                        <step.icon className="w-7 h-7 text-primary-foreground" />
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

        {/* Trust Section */}
        <section className="section-padding bg-background" ref={refTrust}>
          <div className="container-zenora">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTrustInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-gradient-gold rounded-2xl p-8 md:p-12 shadow-elegant"
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-8 text-center">
                {t("method.trust.title")}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {trustPoints.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isTrustInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-5 text-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-primary-foreground mx-auto mb-3" />
                    <p className="text-primary-foreground font-medium">{item}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Button variant="dark" size="lg" asChild>
                  <Link to="/contact">
                    {t("method.trust.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Methode;
