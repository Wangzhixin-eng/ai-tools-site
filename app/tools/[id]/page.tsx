'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { aiTools } from '../../../data/tools';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import { useLanguage } from '../../../app/context/LanguageContext';

const BASE_PATH = '/ai-tools-site';

export default function ToolPage() {
  const params = useParams();
  const { t, lang } = useLanguage();
  const toolId = params.id as string;
  const tool = aiTools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tool not found</h1>
          <Link href={BASE_PATH} className="text-purple-600 hover:underline">← Back to AIHub</Link>
        </div>
      </div>
    );
  }

  const name = t({ en: tool.name, cn: tool.nameCn, jp: tool.nameJp, kr: tool.nameKr });
  const desc = t({ en: tool.description, cn: tool.descriptionCn, jp: tool.descriptionJp, kr: tool.descriptionKr });
  const tags = lang === 'en' ? tool.tags : lang === 'cn' ? tool.tagsCn : lang === 'jp' ? tool.tagsJp : tool.tagsKr;
  const pricingText = { en: tool.pricing === 'free' ? 'Free' : tool.pricing === 'freemium' ? 'Freemium' : 'Paid', cn: tool.pricing === 'free' ? '免费' : tool.pricing === 'freemium' ? 'Freemium' : '付费', jp: tool.pricing === 'free' ? '無料' : tool.pricing === 'freemium' ? 'フレミアム' : '有料', kr: tool.pricing === 'free' ? '무료' : tool.pricing === 'freemium' ? '프리미엄' : '유료' }[lang]!;

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
            <Link href={`${BASE_PATH}/new`} className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'New', cn: '最新', jp: '新着', kr: '신규' })}</Link>
          </nav>
        </div>
      </header>

      {/* Tool Details */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Banner */}
          <div className={`h-3 ${tool.category === 'chatbot' ? 'bg-blue-500' : tool.category === 'image' ? 'bg-pink-500' : tool.category === 'video' ? 'bg-orange-500' : tool.category === 'audio' ? 'bg-violet-500' : tool.category === 'code' ? 'bg-gray-500' : tool.category === 'writing' ? 'bg-green-500' : tool.category === 'design' ? 'bg-teal-500' : 'bg-yellow-500'}`} />

          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-3xl">
                  {tool.category === 'chatbot' ? '💬' : tool.category === 'image' ? '🎨' : tool.category === 'video' ? '🎬' : tool.category === 'audio' ? '🎵' : tool.category === 'code' ? '💻' : tool.category === 'writing' ? '✍️' : tool.category === 'design' ? '🖼️' : '⚡'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${tool.pricing === 'free' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' : tool.pricing === 'freemium' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400' : 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400'}`}>
                      {pricingText}
                    </span>
                    <span className="text-yellow-500 font-semibold">⭐ {tool.rating}</span>
                    <span className="text-gray-400 text-sm">({tool.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                </div>
              </div>
              <Link href={tool.website} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition text-sm">
                {t({ en: 'Visit Website →', cn: '访问官网 →', jp: '公式サイト →', kr: '공식 사이트 →' })}
              </Link>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">{desc}</p>

            {/* Pricing Note */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                <span className="font-semibold">{t({ en: 'Pricing: ', cn: '收费说明: ', jp: '料金: ', kr: '결제: ' })}</span>
                {tool.pricingNoteCn}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Category Link */}
            <div className="border-t dark:border-gray-700 pt-6">
              <Link href={`${BASE_PATH}/categories/${tool.category}`}
                className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
                ← {t({ en: 'View all in this category', cn: '查看同类全部工具', jp: 'このカテゴリのすべてを見る', kr: '이 카테고리 모두 보기' })}
              </Link>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href={BASE_PATH} className="text-gray-500 hover:text-purple-600 text-sm">
            ← {t({ en: 'Back to AIHub', cn: '返回AIHub', jp: 'AIHubに戻る', kr: 'AIHub으로 돌아가기' })}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
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
