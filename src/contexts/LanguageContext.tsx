import { createContext, useContext, ReactNode } from "react";
import { en } from "@/translations/en";

type Translations = typeof en;

interface LanguageContextType {
  language: "en";
  setLanguage: (lang: "en") => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: en,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LanguageContext.Provider value={{ language: "en", setLanguage: () => {}, t: en }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
