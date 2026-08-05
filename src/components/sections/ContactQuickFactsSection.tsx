import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { contactQuickFacts } from "@/data/contact";

export const ContactQuickFactsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border/50 py-10 md:py-12">
      <div className="container-zenora">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactQuickFacts.map((item, i) => (
            <motion.div
              key={item.labelKey}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-lg border border-border bg-card/80 p-5"
            >
              <item.icon className="h-11 w-11 shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">{t(item.labelKey)}</p>
                <p className="font-semibold text-foreground">{t(item.valueKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
