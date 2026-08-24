import Link from 'next/link';
import { aiTools } from '../../data/tools';
import ToolCard from '../../components/ToolCard';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useLanguage } from '../../app/context/LanguageContext';

const BASE_PATH = '/ai-tools-site';

export default function NewPage() {
  const { t } = useLanguage();
  const newTools = aiTools.filter(tool => tool.new);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={BASE_PATH} className="text-2xl font-bold text-purple-600 dark:text-purple-400">AIHub</Link>
          <nav className="flex gap-6">
            <Link href={BASE_PATH} className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Home', cn: '首页', jp: 'ホーム', kr: '홈' })}</Link>
            <Link href={`${BASE_PATH}/categories`} className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' })}</Link>
            <Link href={`${BASE_PATH}/featured`} className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Featured', cn: '精选', jp: 'おすすめ', kr: '추천' })}</Link>
            <Link href={`${BASE_PATH}/new`} className="text-purple-600 dark:text-purple-400 font-medium text-sm">{t({ en: 'New', cn: '最新', jp: '新着', kr: '신규' })}</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="flex items-center gap-3">
          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">🆕 New</span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t({ en: 'New AI Tools', cn: '最新AI工具', jp: '新着AIツール', kr: '신규 AI 도구' })}</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">{t({ en: 'Fresh tools added recently', cn: '最新添加的AI工具', jp: '最近追加されたツール', kr: '최근 추가된 도구' })}</p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex gap-8 text-sm">
          <span className="text-green-600 dark:text-green-400 font-medium">🆕 {newTools.length} {t({ en: 'New Tools', cn: '个新工具', jp: '件新ツール', kr: '개 새 도구' })}</span>
          <span className="text-gray-500">{t({ en: 'Recently added', cn: '最近添加', jp: '最近追加', kr: '최근 추가됨' })}</span>
        </div>
      </div>

      {/* New Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {newTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">{t({ en: 'More tools coming soon!', cn: '更多工具即将上线！', jp: 'もっとツールが 곧追加されます！', kr: '더 많은 도구가 곧 올라올 예정입니다!' })}</h3>
            <p className="text-gray-500 mt-2">{t({ en: 'We add new AI tools every week', cn: '我们每周都会添加新AI工具', jp: '毎週新しいAIツールを追加しています', kr: '매주 새로운 AI 도구를 추가합니다' })}</p>
            <Link href={BASE_PATH} className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
              {t({ en: 'Browse all →', cn: '查看全部 →', jp: 'すべて見る →', kr: '모두 보기 →' })}
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
          <h2 className="text-2xl font-bold">{t({ en: 'Stay updated!', cn: '保持关注！', jp: '最新情報をお見逃しなく！', kr: '최신 정보를 놓치지 마세요!' })}</h2>
          <p className="text-purple-200 mt-2">{t({ en: 'Check back regularly for new AI tools', cn: '定期回来查看新上线的AI工具', jp: '新しいAIツールを定期的にチェックしてください', kr: '새로운 AI 도구를 정기적으로 확인하세요' })}</p>
          <Link href={`${BASE_PATH}/categories`} className="inline-block mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition">
            {t({ en: 'Browse by Category →', cn: '按分类浏览 →', jp: 'カテゴリで閲覧 →', kr: '카테고리로 탐색 →' })}
          </Link>
        </div>
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
