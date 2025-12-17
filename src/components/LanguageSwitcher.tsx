import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      className="gap-2"
    >
      <Languages className="w-4 h-4" />
      {language === "ar" ? "English" : "عربي"}
    </Button>
  );
}