import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { faqs } from "@/data/faq";
import { pickLocale } from "@/data/locale";

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="section-padding bg-secondary relative overflow-hidden">
      {/* Ambient gold grid — atmosphere only */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, black 20%, transparent 75%)",
        }}
      >
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={10}
          gridGap={10}
          flickerChance={0.1}
          maxOpacity={0.19}
          color="hsl(42 95% 58%)"
        />
      </div>
      {/* Soft depth so cards stay readable */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-secondary/90 via-transparent to-secondary/85" />

      <div className="container-zenora max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <span className="section-eyebrow">
            {language === "fr" ? "Questions Fréquentes" : "Common Questions"}
          </span>
          <h2 className="section-title mt-4 mb-6">
            {language === "fr" ? "Tout ce que vous devez savoir" : "Everything you need to know"}
          </h2>
          <p className="section-lead max-w-xl mx-auto">
            {language === "fr"
              ? "Nous croyons en la transparence. Voici les réponses aux questions les plus courantes sur notre processus, nos services et la valeur que nous apportons."
              : "We believe in transparency. Here are answers to some of the most common questions about our process, services, and how we drive value."}
          </p>
        </motion.div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const question = pickLocale(language, faq.question);
            const answer = pickLocale(language, faq.answer);
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div
                className={`bg-card border rounded-sm overflow-hidden transition-all duration-500 ${
                  openIndex === index
                    ? "border-primary/40 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]"
                    : "border-border hover:border-border/80"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-3 text-left"
                >
                  <span className="text-foreground font-medium text-sm md:text-base pr-4 hover:text-primary transition-colors">
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="card-copy px-3 py-4 border-t border-border">
                    {answer}
                  </p>
                </motion.div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
