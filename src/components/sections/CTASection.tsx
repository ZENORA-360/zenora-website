import { useLanguage } from "@/contexts/LanguageContext";
import { PageCTA } from "@/components/sections/PageCTA";

/** Home CTA — dual actions on the shared PageCTA shell. */
export const CTASection = () => {
  const { language } = useLanguage();

  return (
    <PageCTA
      title={
        <>
          {language === "fr" ? "Prêt à atteindre votre" : "Ready to reach your"}{" "}
          <span className="text-gradient-gold text-glow-gold">
            {language === "fr" ? "Zénith" : "Zenith"}
          </span>
          ?
        </>
      }
      lead={
        language === "fr"
          ? "Collaborons pour construire les solutions digitales qui définiront votre avenir."
          : "Let's collaborate to build the digital solutions that will define your tomorrow."
      }
      primaryLabel={language === "fr" ? "Démarrer un projet" : "Start a Project"}
      primaryHref="/contact"
      secondaryLabel={language === "fr" ? "Nos Services" : "Our Services"}
      secondaryHref="/services"
    />
  );
};
