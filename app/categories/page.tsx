'use client';
import Link from 'next/link';
import { aiTools } from '../../data/tools';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';

export default function CategoriesPage() {
  const { t } = useLanguage();

  const categories = [
    { id: 'chatbot', name: 'AI Chatbots', nameCn: 'AI聊天', nameJp: 'AIチャット', nameKr: 'AI 챗봇', emoji: '💬' },
    { id: 'image', name: 'Image Generation', nameCn: '图像生成', nameJp: '画像生成', nameKr: '이미지 생성', emoji: '🎨' },
    { id: 'video', name: 'Video & Animation', nameCn: '视频动画', nameJp: '動画・アニメーション', nameKr: '비디오 & 애니메이션', emoji: '🎬' },
    { id: 'audio', name: 'Audio & Music', nameCn: '音频音乐', nameJp: 'オーディオ・音楽', nameKr: '오디오 & 음악', emoji: '🎵' },
    { id: 'code', name: 'Code & Dev', nameCn: '编程开发', nameJp: 'コーディング', nameKr: '코딩', emoji: '💻' },
    { id: 'productivity', name: 'Productivity', nameCn: '效率工具', nameJp: '生産性ツール', nameKr: '생산성 도구', emoji: '⚡' },
    { id: 'design', name: 'Design & UI', nameCn: '设计UI', nameJp: 'デザイン・UI', nameKr: '디자인 & UI', emoji: '🖼️' },
    { id: 'writing', name: 'Writing & Text', nameCn: '写作文本', nameJp: '文章作成', nameKr: '글쓰기', emoji: '✍️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">AIHub</Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Home', cn: '首页', jp: 'ホーム', kr: '홈' })}</Link>
            <Link href="/categories" className="text-purple-600 dark:text-purple-400 font-medium text-sm">{t({ en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' })}</Link>
            <Link href="/featured" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'Featured', cn: '精选', jp: '注目', kr: '피쳐드' })}</Link>
            <Link href="/new" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'New', cn: '最新', jp: '新着', kr: '신규' })}</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t({ en: 'Browse by Category', cn: '按分类浏览', jp: 'カテゴリで絞り込む', kr: '카테고리로 탐색' })}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          {t({ en: `${aiTools.length} AI tools across all categories`, cn: `共${aiTools.length}个AI工具，涵盖所有分类`, jp: `全カテゴリで${aiTools.length}個のAIツール`, kr: `전체 카테고리 ${aiTools.length}개 AI 도구` })}
        </p>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const count = aiTools.filter(t => t.category === cat.id).length;
            const name = t({ en: cat.name, cn: cat.nameCn, jp: cat.nameJp, kr: cat.nameKr });
            return (
              <Link key={cat.id} href={`/categories/${cat.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700">
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm mt-3 font-medium">
                    {count} {t({ en: 'tools', cn: '个工具', jp: '個', kr: '개 도구' })}
                  </p>
                </div>
              </Link>
            );
          })}
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
