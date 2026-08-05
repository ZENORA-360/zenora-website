import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { PageCTA } from "@/components/sections/PageCTA";
import { BlogListingSection } from "@/components/sections/BlogListingSection";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Blog() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("blog.seo.title")} description={t("blog.seo.description")} />
      <Header />

      <main>
        <PageHero
          eyebrow={t("blog.title")}
          title={
            <>
              {t("blog.title")} <span className="text-gradient-gold">{t("blog.titleHighlight")}</span>
            </>
          }
          lead={t("blog.description")}
        />

        <BlogListingSection />

        <PageCTA
          title={t("blog.cta.title")}
          lead={t("blog.cta.description")}
          primaryLabel={t("blog.cta.button")}
        />
      </main>

      <Footer />
    </div>
  );
}
