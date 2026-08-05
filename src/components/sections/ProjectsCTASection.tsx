import { useLanguage } from "@/contexts/LanguageContext";
import { PageCTA } from "@/components/sections/PageCTA";
import { projectsPageCopy } from "@/data/projects";
import { pickLocale } from "@/data/locale";

/** Thin wrapper — Projects CTA on the shared PageCTA standard. */
export const ProjectsCTASection = () => {
  const { language } = useLanguage();
  const copy = projectsPageCopy.cta;

  return (
    <PageCTA
      title={pickLocale(language, copy.title)}
      lead={pickLocale(language, copy.lead)}
      primaryLabel={pickLocale(language, copy.button)}
      primaryHref="/contact"
      primaryIcon="up-right"
    />
  );
};
