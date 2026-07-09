import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { CorePillarsSection } from "@/components/sections/CorePillarsSection";
import { StrategicInsightSection } from "@/components/sections/StrategicInsightSection";
import { HorizontalScrollSection } from "@/components/sections/HorizontalScrollSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <Header />
      <main>
        <HeroSection />
        <TrustedBySection />
        <CorePillarsSection />
        <HorizontalScrollSection />
        <StrategicInsightSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

