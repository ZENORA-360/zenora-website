import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { mentionsLegalesSections } from "@/data/mentions-legales";
import { pickLocale } from "@/data/locale";

/** Legal mentions sections — publisher/hosting key-value blocks + free-form paragraphs. */
export const MentionsLegalesContent = () => {
  const { language } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container-zenora max-w-4xl">
        <div className="space-y-8">
          {mentionsLegalesSections.map((section, index) => {
            const title = pickLocale(language, section.title);
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-8 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors duration-300"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground pt-2">{title}</h2>
                </div>
                <div className="pl-16">
                  {section.items ? (
                    <div className="space-y-3">
                      {section.items.map((item) => {
                        const label = pickLocale(language, item.label);
                        return (
                          <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
                            <span className="text-sm font-semibold text-foreground min-w-[180px]">
                              {label}
                            </span>
                            <span className="text-muted-foreground">
                              {pickLocale(language, item.value)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content ? pickLocale(language, section.content) : ""}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
