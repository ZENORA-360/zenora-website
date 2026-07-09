import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium uppercase">{language === "fr" ? "EN" : "FR"}</span>
    </Button>
  );
};
