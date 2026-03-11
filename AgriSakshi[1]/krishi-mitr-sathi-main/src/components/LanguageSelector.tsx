import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
];

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
  selectedLanguage?: string;
}

export function LanguageSelector({ onLanguageSelect, selectedLanguage }: LanguageSelectorProps) {
  const [selected, setSelected] = useState(selectedLanguage || "");

  const handleSelect = (languageCode: string) => {
    setSelected(languageCode);
    onLanguageSelect(languageCode);
  };

  return (
    <div className="min-h-screen bg-gradient-earth flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center text-white space-y-2">
          <h1 className="text-3xl font-bold">🌾 AI Crop Recommender</h1>
          <p className="text-white/90">Choose your preferred language</p>
          <p className="text-white/80 text-sm">अपनी भाषा चुनें • మీ భాషను ఎంచుకోండి</p>
        </div>

        <div className="space-y-3">
          {languages.map((language) => (
            <Card
              key={language.code}
              className={cn(
                "p-4 cursor-pointer transition-spring hover:scale-105 shadow-card",
                "border-2 bg-white/95 backdrop-blur-sm",
                selected === language.code
                  ? "border-crop-green bg-crop-light/20 shadow-elevated"
                  : "border-white/30 hover:border-crop-green/50"
              )}
              onClick={() => handleSelect(language.code)}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{language.flag}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">
                    {language.nativeName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{language.name}</p>
                </div>
                {selected === language.code && (
                  <div className="w-6 h-6 bg-crop-green rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Button
          onClick={() => selected && onLanguageSelect(selected)}
          disabled={!selected}
          className="w-full h-12 text-lg font-semibold bg-harvest-gold hover:bg-harvest-gold/90 text-white shadow-card"
        >
          Continue • जारी रखें • కొనసాగించు
        </Button>
      </div>
    </div>
  );
}