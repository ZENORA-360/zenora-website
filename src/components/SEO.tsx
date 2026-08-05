import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_NAME, SITE_URL, absoluteUrl, canonicalPath, publicImages } from "@/lib/site";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export const SEO = ({
  title,
  description,
  keywords,
  image = publicImages.og,
  url,
  type = "website",
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const { language } = useLanguage();
  const location = useLocation();

  const defaultTitle =
    language === "fr"
      ? `${SITE_NAME} | Solutions Digitales — De Zéro au Zénith`
      : `${SITE_NAME} | Digital Solutions — From Zero to Zenith`;

  const defaultDescription =
    language === "fr"
      ? "ZENORA, studio technologique à Yaoundé : développement web, marketing digital, design graphique et ERP métiers pour entreprises et institutions en Afrique et à l'international."
      : "ZENORA, technology studio in Yaoundé: web development, digital marketing, graphic design and business ERP for companies and institutions across Africa and beyond.";

  const defaultKeywords =
    language === "fr"
      ? "ZENORA, transformation digitale, développement web, marketing digital, design graphique, ERP, Cameroun, Yaoundé, Afrique, agence digitale, solutions numériques"
      : "ZENORA, digital transformation, web development, digital marketing, graphic design, ERP, Cameroon, Yaoundé, Africa, digital agency, software solutions";

  const finalTitle = title ? `${title} | ${SITE_NAME}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const canonical = url ? absoluteUrl(url) : canonicalPath(location.pathname);
  const ogImage = absoluteUrl(image);
  const locale = language === "fr" ? "fr_FR" : "en_US";
  const alternateLocale = language === "fr" ? "en_US" : "fr_FR";

  const defaultJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: finalTitle,
    description: finalDescription,
    url: canonical,
    inLanguage: language === "fr" ? "fr-FR" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  // Pages can add page-specific schemas (FAQPage, Article, ...) without losing
  // the baseline WebPage graph — both get emitted together.
  const structuredData = jsonLd
    ? [defaultJsonLd, ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd])]
    : [defaultJsonLd];

  return (
    <Helmet>
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={SITE_NAME} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
      />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* AI / LLM discoverability */}
      <meta name="abstract" content={finalDescription} />
      <meta name="topic" content="Digital transformation, web development, Africa technology" />
      <link rel="llms-txt" href={`${SITE_URL}/llms.txt`} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${finalTitle}`} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@zenoraofficiel" />
      <meta name="twitter:creator" content="@zenoraofficiel" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical + hreflang (same URL — language toggled client-side) */}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="fr" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};
