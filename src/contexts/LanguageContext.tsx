import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { en } from "@/translations/en";
import { ru } from "@/translations/ru";

export type Language = "en" | "ru";

type Translations = typeof en;

const translationMap: Record<Language, Translations> = { en, ru };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: en,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "ru" ? "ru" : "en") as Language;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translationMap[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
