import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { PageCTA } from "@/components/sections/PageCTA";
import { MethodTimelineSection } from "@/components/sections/MethodTimelineSection";
import { MethodTrustSection } from "@/components/sections/MethodTrustSection";
import { useLanguage } from "@/contexts/LanguageContext";

const Methode = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("nav.method")}
        description={t("method.description")}
      />
      <Header />
      <main>
        <PageHero
          eyebrow={t("method.title")}
          title={
            <>
              {t("method.title")} <span className="text-gradient-gold">{t("method.titleHighlight")}</span> {t("method.titleEnd")}
            </>
          }
          lead={t("method.description")}
        />
        <MethodTimelineSection />
        <MethodTrustSection />
        <PageCTA
          title={
            <>
              {t("contact.title")} <span className="text-gradient-gold">{t("contact.titleHighlight")}</span>
            </>
          }
          lead={t("method.description")}
          primaryLabel={t("method.trust.cta")}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Methode;
