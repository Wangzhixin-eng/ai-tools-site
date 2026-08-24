'use client';
import Link from 'next/link';
import { aiTools } from '../../data/tools';
import ToolCard from '../../components/ToolCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';

const BASE_PATH = '/ai-tools-site';

export default function FeaturedPage() {
  const { t } = useLanguage();
  const featuredTools = aiTools.filter(tool => tool.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">AIHub</Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Home', cn: '首页', jp: 'ホーム', kr: '홈' })}</Link>
            <Link href="/categories" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' })}</Link>
            <Link href="/featured" className="text-purple-600 dark:text-purple-400 font-medium text-sm">{t({ en: 'Featured', cn: '精选', jp: '注目', kr: '피쳐드' })}</Link>
            <Link href="/new" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'New', cn: '最新', jp: '新着', kr: '신규' })}</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ⭐ {t({ en: 'Featured AI Tools', cn: '精选AI工具', jp: '注目のAIツール', kr: '피쳐드 AI 도구' })}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          {t({ en: 'Hand-picked by our editors', cn: '编辑精选推荐', jp: '編集者のおすすめ', kr: '편집자가 직접 선택' })}
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex gap-8 text-sm">
          <span className="text-purple-600 dark:text-purple-400 font-medium">
            ✨ {featuredTools.length} {t({ en: 'Featured Tools', cn: '个精选', jp: '個の注目ツール', kr: '개 피쳐드 도구' })}
          </span>
          <span className="text-gray-500">
            {t({ en: 'Avg. Rating', cn: '平均评分', jp: '平均評価', kr: '평균 평점' })} {Math.round(featuredTools.reduce((a, tool) => a + tool.rating, 0) / featuredTools.length * 10) / 10} ⭐
          </span>
        </div>
      </div>

      {/* Featured Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} basePath={BASE_PATH} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-600 dark:bg-purple-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">
            {t({ en: 'Want more AI tools?', cn: '想看更多AI工具？', jp: 'もっとAIツールを見たい？', kr: '더 많은 AI 도구를 원하시나요?' })}
          </h2>
          <p className="text-purple-200 mt-2">
            {t({ en: `Explore our full collection of ${aiTools.length}+ AI tools`, cn: `探索全部${aiTools.length}+个AI工具`, jp: `${aiTools.length}+個のAIツールの全コレクションを見る`, kr: `${aiTools.length}+개 AI 도구 전체 컬렉션 탐색` })}
          </p>
          <Link href="/" className="inline-block mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition">
            {t({ en: 'Browse All →', cn: '查看全部 →', jp: 'すべて見る →', kr: '전체 보기 →' })}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="bg-gray-800 dark:bg-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 flex justify-center">
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-sm">© 2026 AIHub</p>
        </div>
      </footer>
    </div>
  );
}
