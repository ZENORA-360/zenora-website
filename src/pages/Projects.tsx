import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { ProjectsHeroSection } from "@/components/sections/ProjectsHeroSection";
import { ProjectsGridSection } from "@/components/sections/ProjectsGridSection";
import { ProjectsCTASection } from "@/components/sections/ProjectsCTASection";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectsPageCopy } from "@/data/projects";
import { pickLocale } from "@/data/locale";

const Projects = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={pickLocale(language, projectsPageCopy.seoTitle)}
        description={pickLocale(language, projectsPageCopy.seoDescription)}
      />
      <Header />
      <main>
        <ProjectsHeroSection />
        <ProjectsGridSection />
        <ProjectsCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
