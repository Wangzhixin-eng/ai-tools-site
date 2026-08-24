import Link from 'next/link';
import { aiTools, categories } from '../../data/tools';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useLanguage } from '../../app/context/LanguageContext';

const BASE_PATH = '/ai-tools-site';

export default function CategoriesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={BASE_PATH} className="text-2xl font-bold text-purple-600 dark:text-purple-400">AIHub</Link>
          <nav className="flex gap-6">
            <Link href={BASE_PATH} className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Home', cn: '首页', jp: 'ホーム', kr: '홈' })}</Link>
            <Link href={`${BASE_PATH}/categories`} className="text-purple-600 dark:text-purple-400 font-medium text-sm">{t({ en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' })}</Link>
            <Link href={`${BASE_PATH}/featured`} className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Featured', cn: '精选', jp: 'おすすめ', kr: '추천' })}</Link>
            <Link href={`${BASE_PATH}/new`} className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'New', cn: '最新', jp: '新着', kr: '신규' })}</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t({ en: 'Browse by Category', cn: '按分类浏览', jp: 'カテゴリで閲覧', kr: '카테고리로 탐색' })}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">{t({ en: 'Explore all AI tools by category', cn: '按分类浏览所有AI工具', jp: 'カテゴリですべてのAIツールを閲覧', kr: '카테고리로 모든 AI 도구 탐색' })}</p>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const count = aiTools.filter(t => t.category === cat.id).length;
            return (
              <Link key={cat.id} href={`${BASE_PATH}/categories/${cat.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700">
                  <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{t({ en: cat.name, cn: cat.nameCn, jp: cat.nameJp, kr: cat.nameKr })}</h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm mt-3 font-medium">{count} {t({ en: 'tools', cn: '个工具', jp: 'ツール', kr: '개 도구' })}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Language Switcher + Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <LanguageSwitcher />
          </div>
          <p className="text-sm text-center">© 2026 AIHub · {t({ en: 'AI Tools Navigator', cn: 'AI工具导航站', jp: 'AIツールナビゲーター', kr: 'AI 도구 내비게이터' })}</p>
        </div>
      </footer>
    </div>
  );
}
