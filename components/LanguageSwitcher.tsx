'use client';
import { useLanguage, Language } from '@/app/context/LanguageContext';

const LANGUAGES: { code: Language; label: string; shortLabel: string; flag: string }[] = [
  { code: 'en', label: 'English', shortLabel: 'EN', flag: '🇺🇸' },
  { code: 'cn', label: '中文', shortLabel: '中', flag: '🇨🇳' },
  { code: 'jp', label: '日本語', shortLabel: '日', flag: '🇯🇵' },
  { code: 'kr', label: '한국어', shortLabel: '한', flag: '🇰🇷' },
];

interface LanguageSwitcherProps {
  /** 渲染样式：'footer' 居中按钮组 | 'header' 行内紧凑 | 'dropdown' 下拉式 */
  variant?: 'footer' | 'header' | 'dropdown';
}

export default function LanguageSwitcher({ variant = 'footer' }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();

  // Footer 样式：居中圆角按钮组，带背景
  if (variant === 'footer' || variant === undefined) {
    return (
      <div className="flex flex-col items-center gap-3">
        <span className="text-gray-400 text-xs tracking-wide">🌐 Choose Language</span>
        <div className="inline-flex items-center gap-1 bg-gray-800 dark:bg-gray-700 rounded-xl p-1.5">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              title={l.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                lang === l.code
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <span className="text-xs">{l.shortLabel}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Header 样式：紧凑单行
  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          title={l.label}
          className={`px-2 py-1 rounded text-xs font-medium transition-all ${
            lang === l.code
              ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          {l.flag}
        </button>
      ))}
    </div>
  );
}
