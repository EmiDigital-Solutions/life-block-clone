import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import { en } from "@/translations/en";
import { ru } from "@/translations/ru";

export type Language = "en" | "ru";

type Translations = typeof en;

const translationMap: Record<Language, Translations> = { en, ru };
const LANGUAGE_STORAGE_KEY = "rca_language";
const LEGACY_LANGUAGE_STORAGE_KEY = "lang";

const isLanguage = (value: string | null): value is Language => value === "en" || value === "ru";

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";

  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(saved)) return saved;

    const legacySaved = localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY);
    if (isLanguage(legacySaved)) return legacySaved;
  } catch {
    return "en";
  }

  return "en";
};

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
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      localStorage.setItem(LEGACY_LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Ignore storage write failures (e.g. private mode restrictions)
    }
  }, []);

  const t = useMemo(() => translationMap[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
