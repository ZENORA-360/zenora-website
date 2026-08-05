import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { PageCTA } from "@/components/sections/PageCTA";
import { FaqPageContent } from "@/components/sections/FaqPageContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { faqPageCategories, faqPageCopy } from "@/data/faq-page";
import { pickLocale } from "@/data/locale";

const FAQ = () => {
  const { language } = useLanguage();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPageCategories.flatMap((category) =>
      category.questions.map((item) => ({
        "@type": "Question",
        name: pickLocale(language, item.question),
        acceptedAnswer: { "@type": "Answer", text: pickLocale(language, item.answer) },
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={pickLocale(language, faqPageCopy.seoTitle)}
        description={pickLocale(language, faqPageCopy.seoDescription)}
        jsonLd={faqJsonLd}
      />
      <Header />
      <main>
        <PageHero
          eyebrow={pickLocale(language, faqPageCopy.hero.eyebrow)}
          title={
            <>
              {pickLocale(language, faqPageCopy.hero.titleStart)}
              <span className="text-gradient-gold">
                {pickLocale(language, faqPageCopy.hero.titleHighlight)}
              </span>
            </>
          }
          lead={pickLocale(language, faqPageCopy.hero.lead)}
        />

        <FaqPageContent />

        <PageCTA
          title={pickLocale(language, faqPageCopy.cta.title)}
          lead={pickLocale(language, faqPageCopy.cta.lead)}
          primaryLabel={pickLocale(language, faqPageCopy.cta.button)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
