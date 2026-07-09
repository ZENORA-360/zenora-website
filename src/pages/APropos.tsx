import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Eye, Lightbulb, Target, Users, Award, Compass, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import APROPOS_IMAGE from "@/assets/photos/apropos-team.jpg";

const APropos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const refEngagements = useRef(null);
  const isEngagementsInView = useInView(refEngagements, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const benefits = [
    t("about.benefit1"),
    t("about.benefit2"),
    t("about.benefit3"),
    t("about.benefit4"),
  ];

  const values = [
    { icon: Target, title: t("about.value.results"), description: t("about.value.resultsDesc") },
    { icon: Users, title: t("about.value.transparency"), description: t("about.value.transparencyDesc") },
    { icon: Lightbulb, title: t("about.value.innovation"), description: t("about.value.innovationDesc") },
    { icon: Eye, title: t("about.value.support"), description: t("about.value.supportDesc") },
  ];

  const engagements = [
    { icon: Shield, title: t("about.engagement.reliability"), description: t("about.engagement.reliabilityDesc") },
    { icon: Compass, title: t("about.engagement.guidance"), description: t("about.engagement.guidanceDesc") },
    { icon: Zap, title: t("about.engagement.responsiveness"), description: t("about.engagement.responsivenessDesc") },
    { icon: Award, title: t("about.engagement.excellence"), description: t("about.engagement.excellenceDesc") },
  ];

  const missionPoints = [
    t("about.mission.point1"),
    t("about.mission.point2"),
    t("about.mission.point3"),
  ];

  const visionPoints = [
    t("about.vision.point1"),
    t("about.vision.point2"),
    t("about.vision.point3"),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t("nav.about")}
        description={t("about.description")}
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-40 pb-24 md:pt-48 md:pb-32 relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
            <div className="absolute top-1/2 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary/8 blur-[130px] translate-x-1/3" />
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
                  {t("about.title")}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02] tracking-tight mb-6">
                {t("about.title")} <span className="text-gradient-gold">{t("about.titleHighlight")}</span>
              </h1>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {t("about.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main About Section */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-muted/50 to-transparent" />

          <div className="container-zenora relative" ref={ref}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Image with frame */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-xl overflow-hidden shadow-elegant">
                  <div className="absolute inset-0 border-2 border-primary/30 rounded-xl z-10 pointer-events-none" />
                  <img
                    src={APROPOS_IMAGE}
                    alt={t("about.imageAlt")}
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-card/95 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                      <p className="font-display text-lg italic text-foreground">
                        « <span className="text-gradient-gold">{t("about.quote")}</span>{t("about.quoteText")} »
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {t("about.presentation")} <span className="text-gradient-gold">{t("about.presentationHighlight")}</span>
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">ZENORA</strong> {t("about.presentationText1")}
                </p>

                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("about.presentationText2")}
                </p>

                {/* Benefits list */}
                <div className="pt-4">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    {t("about.whatWeEnable")}
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </span>
                        <span className="text-foreground">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Values grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-20"
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                {t("about.values")} <span className="text-gradient-gold">{t("about.valuesHighlight")}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-gold"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Engagements Section */}
        <section className="section-padding bg-muted/30" ref={refEngagements}>
          <div className="container-zenora">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isEngagementsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("about.engagements")} <span className="text-gradient-gold">{t("about.engagementsHighlight")}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("about.engagementsDesc")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {engagements.map((engagement, index) => (
                <motion.div
                  key={engagement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isEngagementsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-gold"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-gold-shine flex items-center justify-center mb-4">
                    <engagement.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h4 className="font-display text-xl font-semibold text-foreground mb-2">
                    {engagement.title}
                  </h4>
                  <p className="text-muted-foreground">{engagement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="section-padding bg-background">
          <div className="container-zenora">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {t("about.reasonTitle")} <span className="text-gradient-gold">{t("about.reasonHighlight")}</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-gold rounded-2xl p-8 md:p-10 shadow-elegant"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Target className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary-foreground">
                    {t("about.mission.title")}
                  </h3>
                </div>
                <p className="text-primary-foreground/90 leading-relaxed mb-6">
                  {t("about.mission.text")}
                </p>
                <ul className="space-y-3">
                  {missionPoints.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-primary-foreground/90">
                      <Check className="w-5 h-5 text-primary-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-secondary rounded-2xl p-8 md:p-10 shadow-elegant"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-secondary-foreground">
                    {t("about.vision.title")}
                  </h3>
                </div>
                <p className="text-secondary-foreground/90 leading-relaxed mb-6">
                  {t("about.vision.text")}
                </p>
                <ul className="space-y-3">
                  {visionPoints.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-secondary-foreground/90">
                      <Check className="w-5 h-5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default APropos;
