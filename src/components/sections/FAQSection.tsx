import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: language === "fr"
        ? "Dans quels secteurs d'activité êtes-vous spécialisés ?"
        : "What specific industries do you specialize in?",
      answer: language === "fr"
        ? "Bien que nous ayons une expertise approfondie dans la FinTech, la Santé et le E-commerce, nos cadres de transformation digitale sont agnostiques en termes de secteur. Nous adaptons nos méthodologies de base pour correspondre aux paysages réglementaires et opérationnels uniques de chaque secteur."
        : "While we have deep expertise in FinTech, Healthcare, and E-commerce, our digital transformation frameworks are industry-agnostic. We adapt our core methodologies to fit the unique regulatory and operational landscapes of any sector.",
    },
    {
      question: language === "fr"
        ? "Comment fonctionne votre méthodologie agile pour les grandes entreprises ?"
        : "How does your agile methodology work for large enterprises?",
      answer: language === "fr"
        ? "Nous utilisons les principes du Scaled Agile Framework (SAFe) pour les grandes organisations. Cela garantit que, bien que les équipes individuelles avancent rapidement avec des sprints de 2 semaines, les objectifs organisationnels plus larges restent alignés, minimisant les risques tout en maximisant la vitesse d'innovation."
        : "We utilize Scaled Agile Framework (SAFe) principles for larger organizations. This ensures that while individual teams move fast with 2-week sprints, the broader organizational goals remain aligned, minimizing risk while maximizing innovation speed.",
    },
    {
      question: language === "fr"
        ? "Pouvez-vous vous intégrer à nos systèmes existants ?"
        : "Can you integrate with our existing legacy systems?",
      answer: language === "fr"
        ? "Absolument. « De Zéro au Zénith » signifie souvent combler le fossé entre l'ancien et le nouveau. Nous sommes spécialisés dans la connectivité pilotée par API et les architectures de microservices qui nous permettent de moderniser progressivement votre stack sans perturber les opérations commerciales critiques."
        : "Absolutely. \"From Zero to Zenith\" often means bridging the gap between old and new. We specialize in API-led connectivity and microservices architectures that allow us to modernize your stack incrementally without disrupting critical business operations.",
    },
    {
      question: language === "fr"
        ? "Quel est le délai typique pour un projet de transformation digitale ?"
        : "What is the typical timeline for a digital transformation project?",
      answer: language === "fr"
        ? "Les délais varient en fonction de la portée, mais un engagement typique commence par une phase de découverte de 2 à 4 semaines, suivie du développement du MVP qui prend généralement 3 à 6 mois. Nous privilégions la livraison de valeur tangible tôt dans le processus plutôt que d'attendre un lancement « big bang »."
        : "Timelines vary based on scope, but a typical engagement starts with a 2-4 week discovery phase, followed by MVP development which usually takes 3-6 months. We prioritize delivering tangible value early in the process rather than waiting for a \"big bang\" launch.",
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-secondary">
      <div className="container-zenora max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-widest text-sm uppercase">
            {language === "fr" ? "Questions Fréquentes" : "Common Questions"}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground mt-4 mb-6">
            {language === "fr" ? "Tout ce que vous devez savoir" : "Everything you need to know"}
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            {language === "fr"
              ? "Nous croyons en la transparence. Voici les réponses aux questions les plus courantes sur notre processus, nos services et la valeur que nous apportons."
              : "We believe in transparency. Here are answers to some of the most common questions about our process, services, and how we drive value."}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div
                className={`bg-card border rounded-xl overflow-hidden transition-all duration-500 ${
                  openIndex === index
                    ? "border-primary/40 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]"
                    : "border-border hover:border-border/80"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="text-foreground font-bold text-base md:text-lg pr-4 hover:text-primary transition-colors">
                    {faq.question}
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
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
