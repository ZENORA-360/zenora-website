import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqPageCategories } from "@/data/faq-page";
import { pickLocale } from "@/data/locale";

/** FAQ accordion — grouped by category, thin composition for the /faq page. */
export const FaqPageContent = () => {
  const { language } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container-zenora max-w-4xl">
        <div className="space-y-10">
          {faqPageCategories.map((category, catIndex) => {
            const categoryTitle = pickLocale(language, category.title);
            return (
              <motion.div
                key={categoryTitle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-1 bg-primary rounded-full" />
                  {categoryTitle}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem
                      key={qIndex}
                      value={`${catIndex}-${qIndex}`}
                      className="border border-border rounded-lg px-6 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/[0.02] transition-colors duration-300"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                        {pickLocale(language, item.question)}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {pickLocale(language, item.answer)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
