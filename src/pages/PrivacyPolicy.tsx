import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { PrivacyPolicyContent } from "@/components/sections/PrivacyPolicyContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { privacyPageCopy } from "@/data/privacy";
import { pickLocale } from "@/data/locale";

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={pickLocale(language, privacyPageCopy.seoTitle)}
        description={pickLocale(language, privacyPageCopy.seoDescription)}
      />
      <Header />
      <main>
        <PageHero
          eyebrow={pickLocale(language, privacyPageCopy.hero.eyebrow)}
          title={
            <>
              {pickLocale(language, privacyPageCopy.hero.titleStart)}
              <span className="text-gradient-gold">
                {pickLocale(language, privacyPageCopy.hero.titleHighlight)}
              </span>
            </>
          }
          lead={pickLocale(language, privacyPageCopy.hero.lead)}
        />

        <PrivacyPolicyContent />
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
