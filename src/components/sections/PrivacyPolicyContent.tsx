import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { privacySections, privacyPageCopy } from "@/data/privacy";
import { pickLocale } from "@/data/locale";

/** Privacy policy sections + closing contact block for the /politique-de-confidentialite page. */
export const PrivacyPolicyContent = () => {
  const { language } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container-zenora max-w-4xl">
        <div className="space-y-8">
          {privacySections.map((section, index) => {
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
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground pt-2">{title}</h2>
                </div>
                <div className="space-y-4 pl-16">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-muted-foreground leading-relaxed whitespace-pre-line"
                    >
                      {pickLocale(language, paragraph)}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-lg bg-primary/5 border border-primary/20 text-center"
        >
          <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            {pickLocale(language, privacyPageCopy.contact.title)}
          </h3>
          <p className="text-muted-foreground mb-4">
            {pickLocale(language, privacyPageCopy.contact.lead)}
          </p>
          <a
            href={`mailto:${privacyPageCopy.contact.email}`}
            className="text-primary font-semibold hover:underline"
          >
            {privacyPageCopy.contact.email}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
