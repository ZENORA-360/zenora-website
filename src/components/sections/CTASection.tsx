import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  return (
    <section
      ref={ref}
      className="section-padding bg-background relative overflow-hidden border-t border-border"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gold-gradient-radial opacity-60" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container-zenora relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground">
            {language === "fr" ? "Prêt à atteindre votre" : "Ready to reach your"}{" "}
            <span className="text-gradient-gold text-glow-gold">
              {language === "fr" ? "Zénith" : "Zenith"}
            </span>
            ?
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl">
            {language === "fr"
              ? "Collaborons pour construire les solutions digitales qui définiront votre avenir."
              : "Let's collaborate to build the digital solutions that will define your tomorrow."}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-4 w-full sm:w-auto">
            <Button
              variant="hero"
              size="xl"
              className="w-full sm:w-auto min-w-[200px] glow-gold"
              asChild
            >
              <Link to="/contact">
                {language === "fr" ? "Démarrer un projet" : "Start a Project"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              className="w-full sm:w-auto min-w-[200px]"
              asChild
            >
              <Link to="/contact">
                {language === "fr" ? "Nous contacter" : "Contact Sales"}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
