import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { PageCTA } from "@/components/sections/PageCTA";
import { AboutStorySection } from "@/components/sections/AboutStorySection";
import { AboutEngagementsSection } from "@/components/sections/AboutEngagementsSection";
import { AboutMissionVisionSection } from "@/components/sections/AboutMissionVisionSection";
import { useLanguage } from "@/contexts/LanguageContext";

const APropos = () => {
  const { t, language } = useLanguage();

  const ctaTitle = language === "fr" ? "Parlons de votre" : "Let's talk about your";
  const ctaTitleHighlight = language === "fr" ? "projet" : "project";
  const ctaButton = language === "fr" ? "Contactez-nous" : "Contact us";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("nav.about")}
        description={t("about.description")}
      />
      <Header />
      <main>
        <PageHero
          eyebrow={t("about.title")}
          title={
            <>
              {t("about.title")} <span className="text-gradient-gold">{t("about.titleHighlight")}</span>
            </>
          }
          lead={t("about.description")}
        />
        <AboutStorySection />
        <AboutEngagementsSection />
        <AboutMissionVisionSection />
        <PageCTA
          title={
            <>
              {ctaTitle} <span className="text-gradient-gold">{ctaTitleHighlight}</span>
            </>
          }
          lead={t("about.description")}
          primaryLabel={ctaButton}
        />
      </main>
      <Footer />
    </div>
  );
};

export default APropos;
