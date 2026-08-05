import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { ContactQuickFactsSection } from "@/components/sections/ContactQuickFactsSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactWhatsAppSection } from "@/components/sections/ContactWhatsAppSection";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("nav.contact")} description={t("contact.description")} />
      <Header />

      <main>
        <PageHero
          eyebrow={t("contact.label")}
          title={
            <>
              {t("contact.title")}{" "}
              <span className="text-gradient-gold">{t("contact.titleHighlight")}</span>
            </>
          }
          lead={t("contact.description")}
        />

        <ContactQuickFactsSection />
        <ContactFormSection />
        <ContactWhatsAppSection />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
