'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'cn' | 'jp' | 'kr';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (translations: Partial<Record<Language, string>>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'cn',
  setLang: () => {},
  t: (translations) => translations['cn'] || translations['en'] || Object.values(translations)[0] || '',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('cn');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('aihub-lang') as Language | null;
    if (saved && ['en', 'cn', 'jp', 'kr'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('aihub-lang', l);
  };

  const t = (translations: Partial<Record<Language, string>>) => {
    return translations[lang] || translations['cn'] || translations['en'] || Object.values(translations)[0] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
