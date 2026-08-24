'use client';

import { useState } from 'react';
import Link from 'next/link';
import { aiTools, getFeaturedTools } from '@/data/tools';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import HeroSection from '@/components/HeroSection';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';

const TOOLS_PER_PAGE = 12;
const BASE_PATH = '/ai-tools-site';

export default function Home() {
  const { t } = useLanguage();
  const featuredTools = getFeaturedTools();
  const [visibleCount, setVisibleCount] = useState(TOOLS_PER_PAGE);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AIHub</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI Tools Navigator</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-purple-600 dark:text-purple-400 font-medium text-sm">
                {t({ en: 'Home', cn: '首页', jp: 'ホーム', kr: '홈' })}
              </Link>
              <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                {t({ en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' })}
              </Link>
              <Link href="/featured" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                {t({ en: 'Featured', cn: '精选', jp: '注目', kr: '피쳐드' })}
              </Link>
              <Link href="/new" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                {t({ en: 'New', cn: '最新', jp: '新着', kr: '신규' })}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">{aiTools.length}+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t({ en: 'AI Tools', cn: 'AI工具', jp: 'AIツール', kr: 'AI 도구' })}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">8</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t({ en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' })}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
                {t({ en: 'Free & Paid', cn: '免费和付费', jp: '無料・有料', kr: '무료 & 유료' })}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400">
                {t({ en: 'Daily', cn: '每日', jp: '毎日', kr: '매일' })}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t({ en: 'Updated', cn: '更新', jp: '更新', kr: '업데이트' })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t({ en: 'Browse by Category', cn: '按分类浏览', jp: 'カテゴリで絞り込む', kr: '카테고리로 탐색' })}
            </h2>
          </div>
          <Link href="/categories" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            {t({ en: 'View All →', cn: '查看全部 →', jp: 'すべて見る →', kr: '전체 보기 →' })}
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {aiTools.length > 0 ? (
            // Use categories from tools.ts which has the icon/color
            [
              { id: 'chatbot', name: 'AI Chatbots', nameCn: 'AI聊天', nameJp: 'AIチャット', nameKr: 'AI 챗봇', icon: '💬', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
              { id: 'writing', name: 'Writing', nameCn: '写作助手', nameJp: '文章作成', nameKr: '글쓰기', icon: '✍️', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
              { id: 'image', name: 'Image Generation', nameCn: '图像生成', nameJp: '画像生成', nameKr: '이미지 생성', icon: '🎨', color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
              { id: 'video', name: 'Video AI', nameCn: '视频AI', nameJp: '動画AI', nameKr: '비디오 AI', icon: '🎬', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
              { id: 'audio', name: 'Audio & Music', nameCn: '音频音乐', nameJp: 'オーディオ・音楽', nameKr: '오디오 & 음악', icon: '🎵', color: 'bg-gradient-to-r from-violet-500 to-purple-500' },
              { id: 'code', name: 'Coding', nameCn: '编程开发', nameJp: 'コーディング', nameKr: '코딩', icon: '💻', color: 'bg-gradient-to-r from-gray-600 to-gray-800' },
              { id: 'productivity', name: 'Productivity', nameCn: '效率工具', nameJp: '生産性ツール', nameKr: '생산성 도구', icon: '⚡', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
              { id: 'design', name: 'Design', nameCn: '设计工具', nameJp: 'デザインツール', nameKr: '디자인 도구', icon: '🖼️', color: 'bg-gradient-to-r from-teal-500 to-cyan-500' },
            ].map((cat) => (
              <CategoryCard key={cat.id} category={cat as any} />
            ))
          ) : null}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              ⭐ {t({ en: 'Featured AI Tools', cn: '精选AI工具', jp: '注目のAIツール', kr: '피쳐드 AI 도구' })}
            </h2>
          </div>
          <Link href="/featured" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            {t({ en: 'View All →', cn: '查看全部 →', jp: 'すべて見る →', kr: '전체 보기 →' })}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.slice(0, 6).map((tool) => (
            <ToolCard key={tool.id} tool={tool} basePath={BASE_PATH} />
          ))}
        </div>
      </section>

      {/* All Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🔥 {t({ en: 'All AI Tools', cn: '全部AI工具', jp: 'すべてのAIツール', kr: '모든 AI 도구' })}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {(t({ en: 'Total', cn: '共', jp: '合計', kr: '총' }))} {aiTools.length}
              {(t({ en: ' tools', cn: '个', jp: '個', kr: '개' }))}
            </p>
          </div>
          <Link href="/categories" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            {t({ en: 'Browse by Category →', cn: '按分类浏览 →', jp: 'カテゴリで絞り込む →', kr: '카테고리로 탐색 →' })}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.slice(0, visibleCount).map((tool) => (
            <ToolCard key={tool.id} tool={tool} basePath={BASE_PATH} />
          ))}
        </div>
        {visibleCount < aiTools.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(prev => prev + TOOLS_PER_PAGE)}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition"
            >
              {t({ en: `Load More (${aiTools.length - visibleCount} remaining)`, cn: `加载更多 · (剩余${aiTools.length - visibleCount})`, jp: `もっと見る (残り${aiTools.length - visibleCount})`, kr: `더보기 (${aiTools.length - visibleCount}개 남음)` })}
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t({ en: 'Know a Great AI Tool?', cn: '推荐好用的AI工具？', jp: '優れたAIツールを知っている？', kr: '훌륭한 AI 도구를 알고 계신가요?' })}
          </h2>
          <p className="text-purple-100 mb-8 text-lg">
            {t({
              en: 'Help us build the most comprehensive AI tools database!',
              cn: '帮助我们建设最全面的AI工具导航站！',
              jp: '最も包括的なAIツールデータベース的建设にご協力ください！',
              kr: '가장 포괄적인 AI 도구 데이터베이스 구축에 도움을 주세요!',
            })}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400">
        {/* Language Switcher */}
        <div className="bg-gray-800 dark:bg-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 flex justify-center">
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <span className="text-white font-bold text-lg">AIHub</span>
            </div>
            <p className="text-sm text-gray-500">
              {t({ en: 'Your ultimate AI tools navigator.', cn: '最全面的AI工具导航站。', jp: 'あなたの究極のAIツールナビゲーター。', kr: '당신의 궁극적 AI 도구 네비게이터.' })}
            </p>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            <p>© 2026 AIHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
