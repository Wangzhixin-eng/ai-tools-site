'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'cn' | 'jp' | 'kr';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (translations: Record<Language, string>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'cn',
  setLang: () => {},
  t: (translations) => translations['cn'] || '',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('cn');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('aihub-lang') as Language;
      if (saved && ['en', 'cn', 'jp', 'kr'].includes(saved)) {
        setLangState(saved);
      }
    } catch {}
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem('aihub-lang', l);
    } catch {}
  };

  const t = (translations: Record<Language, string>) => {
    return translations[lang] || translations['cn'] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
