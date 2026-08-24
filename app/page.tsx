'use client';

import { useState } from 'react';
import Link from 'next/link';
import { aiTools, categories, getFeaturedTools, getSponsoredTools } from '@/data/tools';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import HeroSection from '@/components/HeroSection';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';

const TOOLS_PER_PAGE = 12;
const BASE_PATH = '/ai-tools-site';

const labels = {
  navHome: { en: 'Home', cn: '首页', jp: 'ホーム', kr: '홈' },
  navCategories: { en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' },
  navFeatured: { en: 'Featured', cn: '精选', jp: 'おすすめ', kr: '추천' },
  navNew: { en: 'New', cn: '最新', jp: '新着', kr: '신규' },
  navSubmit: { en: 'Submit', cn: '提交', jp: '提交', kr: '제출' },
  statsTools: { en: 'AI Tools', cn: 'AI工具', jp: 'AIツール', kr: 'AI 도구' },
  statsCategories: { en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' },
  statsFree: { en: 'Free & Paid', cn: '免费和付费', jp: '無料と有料', kr: '무료와 유료' },
  statsUpdated: { en: 'Updated', cn: '每日更新', jp: '毎日更新', kr: '매일 업데이트' },
  browseTitle: { en: 'Browse by Category', cn: '按分类浏览', jp: 'カテゴリで閲覧', kr: '카테고리로 탐색' },
  browseViewAll: { en: 'View All →', cn: '查看全部 →', jp: 'すべて見る →', kr: '모두 보기 →' },
  featuredTitle: { en: '⭐ Featured AI Tools', cn: '⭐ 精选AI工具推荐', jp: '⭐ おすすめAIツール', kr: '⭐ 추천 AI 도구' },
  featuredViewAll: { en: 'View All →', cn: '查看全部 →', jp: 'すべて見る →', kr: '모두 보기 →' },
  allTitle: { en: '🔥 All AI Tools', cn: '🔥 全部AI工具', jp: '🔥 すべてのAIツール', kr: '🔥 모든 AI 도구' },
  allCount: { en: `Total: ${aiTools.length} tools`, cn: `共${aiTools.length}个工具`, jp: `全${aiTools.length}ツール`, kr: `총 ${aiTools.length}개 도구` },
  byCategory: { en: 'Browse by Category →', cn: '按分类浏览 →', jp: 'カテゴリで閲覧 →', kr: '카테고리로 탐색 →' },
  loadMore: { en: `Load More`, cn: '加载更多', jp: 'もっと読み込む', kr: '더 보기' },
  remaining: { en: `remaining`, cn: '剩余', jp: '残り', kr: '남음' },
  ctaTitle: { en: 'Know a Great AI Tool?', cn: '推荐好用的AI工具？', jp: '素晴らしいAIツールを知っていますか？', kr: '훌륭한 AI 도구를 알고 계십니까?' },
  ctaText: { en: 'Help us build the most comprehensive AI tools database!', cn: '帮助我们建设最全面的AI工具导航站！', jp: '最も包括的なAIツールデータベース的建设にご协力ください！', kr: '가장 포괄적인 AI 도구 데이터베이스 구축에 도와주세요!' },
  footerTagline: { en: 'Your ultimate AI tools navigator.', cn: '最全面的AI工具导航站。', jp: '究極のAIツールナビゲーター。', kr: '최고의 AI 도구 내비게이터.' },
  footerCopyright: { en: '© 2026 AIHub. All rights reserved.', cn: '© 2026 AIHub. 保留所有权利。', jp: '© 2026 AIHub. 全著作権所有。', kr: '© 2026 AIHub. 모든 권리 보유.' },
  footerLangLabel: { en: '🌐 Language · 语言 · 言語 · 언어', cn: '🌐 语言切换', jp: '🌐 言語選択', kr: '🌐 언어 선택' },
  footerSubmit: { en: 'Submit a Tool →', cn: '提交工具 →', jp: 'ツールを提交 →', kr: '도구 제출 →' },
  footerAd: { en: '📢 Place your ad here · 广告位招商', cn: '📢 广告位招商中', jp: '📢 広告スペース招商中', kr: '📢 광고 공간 광고중' },
  paidCount: { en: 'Paid Tools', cn: '付费工具', jp: '有料ツール', kr: '유료 도구' },
};

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(TOOLS_PER_PAGE);
  const { t } = useLanguage();
  const featuredTools = getFeaturedTools();
  const sponsoredTools = getSponsoredTools();
  const paidCount = aiTools.filter(t => t.pricing === 'paid').length;

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
                <p className="text-xs text-gray-500 dark:text-gray-400">AI Tools Navigator · AI工具精选</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-purple-600 dark:text-purple-400 font-medium text-sm">{t(labels.navHome)}</Link>
              <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm">{t(labels.navCategories)}</Link>
              <Link href="/featured" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm">{t(labels.navFeatured)}</Link>
              <Link href="/new" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm">{t(labels.navNew)}</Link>
              <Link href="/submit" className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-xs font-bold rounded-lg transition">{t(labels.navSubmit)}</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">{aiTools.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t(labels.statsTools)}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">8</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t(labels.statsCategories)}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">{aiTools.filter(t => t.pricing === 'free').length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t({ en: 'Free', cn: '免费', jp: '無料', kr: '무료' })}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">{paidCount}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t({ en: 'Paid', cn: '付费', jp: '有料', kr: '유료' })}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400">Daily</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t(labels.statsUpdated)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsored Tools */}
      {sponsoredTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-12">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800/40 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏆</span>
              <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">{t({ en: '⭐ Recommended Sponsors', cn: '⭐ 赞助推荐', jp: '⭐ 赞助おすすめ', kr: '⭐ 스폰서 추천' })}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sponsoredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} basePath={BASE_PATH} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t(labels.browseTitle)}</h2>
          </div>
          <Link href="/categories" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            {t(labels.browseViewAll)}
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t(labels.featuredTitle)}</h2>
          </div>
          <Link href="/featured" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            {t(labels.featuredViewAll)}
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t(labels.allTitle)}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t(labels.allCount)}</p>
          </div>
          <Link href="/categories" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            {t(labels.byCategory)}
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
              onClick={() => setVisibleCount(prev => Math.min(prev + TOOLS_PER_PAGE, aiTools.length))}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition"
            >
              {t(labels.loadMore)} ({aiTools.length - visibleCount} {t(labels.remaining)})
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t(labels.ctaTitle)}
          </h2>
          <p className="text-purple-100 mb-8 text-lg">
            {t(labels.ctaText)}
          </p>
          <Link href="/submit" className="inline-block px-8 py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-100 transition">
            {t(labels.navSubmit)} →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400">
        {/* Language Switcher */}
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Submit Tool Banner */}
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center">
            <p className="text-gray-400 text-sm mb-2">{t(labels.footerAd)}</p>
            <Link href="/submit" className="text-yellow-400 hover:text-yellow-300 font-medium text-sm">
              {t(labels.footerSubmit)}
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <span className="text-white font-bold text-lg">AIHub</span>
            </div>
            <p className="text-sm text-gray-500">{t(labels.footerTagline)}</p>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-600">
            <p>{t(labels.footerCopyright)}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
