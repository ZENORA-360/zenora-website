import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({
  title,
  description,
  keywords,
  image = "/favicon.png",
  url,
  type = "website",
}: SEOProps) => {
  const { language } = useLanguage();
  
  const defaultTitle = language === "fr" 
    ? "ZENORA | Solutions Digitales - De Zéro au Zénith"
    : "ZENORA | Digital Solutions - From Zero to Zenith";
    
  const defaultDescription = language === "fr"
    ? "ZENORA, entreprise technologique spécialisée dans la digitalisation, le marketing digital et le design graphique. Transformation digitale en Afrique et à l'international."
    : "ZENORA, technology company specialized in digitalization, digital marketing and graphic design. Digital transformation in Africa and internationally.";
    
  const defaultKeywords = language === "fr"
    ? "ZENORA, transformation digitale, développement web, marketing digital, design graphique, Cameroun, Afrique, solutions numériques, site web, application web"
    : "ZENORA, digital transformation, web development, digital marketing, graphic design, Cameroon, Africa, digital solutions, website, web application";

  const finalTitle = title ? `${title} | ZENORA` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="ZENORA" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === "fr" ? "fr_FR" : "en_US"} />
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@zenora_officiel" />
      
      {/* Canonical + hreflang */}
      <link rel="canonical" href={url || (typeof window !== "undefined" ? window.location.href : "https://zenora36.lovable.app")} />
      <link rel="alternate" hrefLang="fr" href={url || "https://zenora36.lovable.app"} />
      <link rel="alternate" hrefLang="en" href={url || "https://zenora36.lovable.app"} />
      <link rel="alternate" hrefLang="x-default" href="https://zenora36.lovable.app" />
    </Helmet>
  );
};
