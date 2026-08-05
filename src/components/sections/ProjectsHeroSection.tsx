import { useLanguage } from "@/contexts/LanguageContext";
import { PageHero } from "@/components/sections/PageHero";
import { projectsPageCopy } from "@/data/projects";
import { pickLocale } from "@/data/locale";

/** Thin wrapper — Projects uses the shared PageHero standard. */
export const ProjectsHeroSection = () => {
  const { language } = useLanguage();
  const copy = projectsPageCopy.hero;

  return (
    <PageHero
      eyebrow={pickLocale(language, copy.eyebrow)}
      title={pickLocale(language, copy.title)}
      lead={pickLocale(language, copy.lead)}
    />
  );
};
