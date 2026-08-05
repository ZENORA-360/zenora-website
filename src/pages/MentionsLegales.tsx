import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { MentionsLegalesContent } from "@/components/sections/MentionsLegalesContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { mentionsLegalesCopy } from "@/data/mentions-legales";
import { pickLocale } from "@/data/locale";

const MentionsLegales = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={pickLocale(language, mentionsLegalesCopy.seoTitle)}
        description={pickLocale(language, mentionsLegalesCopy.seoDescription)}
      />
      <Header />
      <main>
        <PageHero
          eyebrow={pickLocale(language, mentionsLegalesCopy.hero.eyebrow)}
          title={
            <>
              {pickLocale(language, mentionsLegalesCopy.hero.titleStart)}
              <span className="text-gradient-gold">
                {pickLocale(language, mentionsLegalesCopy.hero.titleHighlight)}
              </span>
            </>
          }
          lead={pickLocale(language, mentionsLegalesCopy.hero.lead)}
        />

        <MentionsLegalesContent />
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
