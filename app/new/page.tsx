'use client';
import Link from 'next/link';
import { aiTools } from '../../data/tools';
import ToolCard from '../../components/ToolCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';

const BASE_PATH = '/ai-tools-site';

export default function NewPage() {
  const { t } = useLanguage();
  const newTools = aiTools.filter(tool => tool.new);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">AIHub</Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Home', cn: '首页', jp: 'ホーム', kr: '홈' })}</Link>
            <Link href="/categories" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' })}</Link>
            <Link href="/featured" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Featured', cn: '精选', jp: '注目', kr: '피쳐드' })}</Link>
            <Link href="/new" className="text-purple-600 dark:text-purple-400 font-medium text-sm">{t({ en: 'New', cn: '最新', jp: '新着', kr: '신규' })}</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="flex items-center gap-3">
          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">🆕 New</span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t({ en: 'New AI Tools', cn: '最新AI工具', jp: '新着AIツール', kr: '신규 AI 도구' })}
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          {t({ en: 'Fresh tools added recently', cn: '最新上线的AI工具', jp: '最近追加されたツール', kr: '최근 추가된 도구' })}
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <span className="text-green-600 dark:text-green-400 font-medium text-sm">
          🆕 {newTools.length} {t({ en: 'New Tools', cn: '个新工具', jp: '個の新規ツール', kr: '개 신규 도구' })}
        </span>
      </div>

      {/* New Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {newTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">
              {t({ en: 'More tools coming soon!', cn: '更多工具即将上线！', jp: 'もっとツールが Soon!', kr: '더 많은 도구가 곧 출시됩니다!' })}
            </h3>
            <Link href="/" className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
              {t({ en: 'Browse all →', cn: '查看全部 →', jp: 'すべて見る →', kr: '전체 보기 →' })}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} basePath={BASE_PATH} />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-purple-600 dark:bg-purple-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">
            {t({ en: 'Stay updated!', cn: '保持关注！', jp: '最新情報をチェック！', kr: '최신 정보를 확인하세요!' })}
          </h2>
          <p className="text-purple-200 mt-2">
            {t({ en: 'Check back regularly for new AI tools', cn: '定期查看新上线的AI工具', jp: '定期的に新しいAIツールをチェック', kr: '정기적으로 새로운 AI 도구를 확인하세요' })}
          </p>
          <Link href="/categories" className="inline-block mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition">
            {t({ en: 'Browse by Category →', cn: '按分类浏览 →', jp: 'カテゴリで絞り込む →', kr: '카테고리로 탐색 →' })}
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
