import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { PageCTA } from "@/components/sections/PageCTA";
import { ServicesGridSection } from "@/components/sections/ServicesGridSection";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("nav.services")} description={t("services.description")} />
      <Header />
      <main>
        <PageHero
          eyebrow={t("services.title")}
          title={
            <>
              {t("services.title")}{" "}
              <span className="text-gradient-gold">{t("services.titleHighlight")}</span>{" "}
              {t("services.titleEnd")}
            </>
          }
          lead={t("services.description")}
        />

        <ServicesGridSection />

        <PageCTA
          title={
            <>
              {t("services.cta.title")}{" "}
              <span className="text-gradient-gold">{t("services.cta.titleHighlight")}</span> ?
            </>
          }
          lead={t("services.cta.description")}
          primaryLabel={t("services.cta.button")}
        />
      </main>
      <Footer />
    </div>
  );
}
