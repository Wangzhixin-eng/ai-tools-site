'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { aiTools, categories } from '../../../data/tools';
import ToolCard from '../../../components/ToolCard';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import { useLanguage } from '../../../app/context/LanguageContext';

const BASE_PATH = '/ai-tools-site';

export default function CategoryPage() {
  const params = useParams();
  const { t } = useLanguage();
  const categoryId = params.id as string;
  const category = categories.find(c => c.id === categoryId);
  const tools = aiTools.filter(tool => tool.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category not found</h1>
          <Link href={`${BASE_PATH}/categories`} className="text-purple-600 hover:underline">← Back to Categories</Link>
        </div>
      </div>
    );
  }

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
      <div className={`${category.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{category.icon}</div>
            <div>
              <h1 className="text-4xl font-bold">{t({ en: category.name, cn: category.nameCn, jp: category.nameJp, kr: category.nameKr })}</h1>
              <p className="text-white/80 mt-1">{tools.length} {t({ en: 'AI tools in this category', cn: '个AI工具', jp: 'AIツール', kr: '개 AI 도구' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} basePath={BASE_PATH} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">{t({ en: 'No tools yet', cn: '暂无工具', jp: 'ツールなし', kr: '아직 도구 없음' })}</h3>
            <Link href={BASE_PATH} className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
              {t({ en: 'Browse all →', cn: '查看全部 →', jp: 'すべて見る →', kr: '모두 보기 →' })}
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
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
