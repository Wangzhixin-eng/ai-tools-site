'use client';
import { useLanguage, Language } from '@/app/context/LanguageContext';

const LANGUAGES: { code: Language; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'cn', label: '简体中文', native: '中文', flag: '🇨🇳' },
  { code: 'jp', label: '日本語', native: '日本語', flag: '🇯🇵' },
  { code: 'kr', label: '한국어', native: '한국어', flag: '🇰🇷' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-gray-300 text-sm font-medium">🌐 Language · 语言 · 言語 · 언어</span>
      <div className="flex items-center gap-2 bg-gray-700/50 backdrop-blur-sm rounded-2xl p-1.5 border border-gray-600/30">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            title={`${l.label} (${l.native})`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              lang === l.code
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
            }`}
          >
            <span className="text-base">{l.flag}</span>
            <span className="hidden sm:inline">{l.native}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
