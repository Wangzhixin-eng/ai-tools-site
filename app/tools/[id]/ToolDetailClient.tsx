'use client';
import React from 'react';
import { aiTools } from '../../../data/tools';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';

const categoryNames: Record<string, { en: string; cn: string; jp: string; kr: string }> = {
  chatbot: { en: 'AI Chatbot', cn: 'AI对话', jp: 'AIチャット', kr: 'AI 챗봇' },
  image: { en: 'AI Image', cn: 'AI图像', jp: 'AI画像', kr: 'AI 이미지' },
  video: { en: 'AI Video', cn: 'AI视频', jp: 'AI動画', kr: 'AI 비디오' },
  audio: { en: 'AI Audio', cn: 'AI音频', jp: 'AIオーディオ', kr: 'AI 오디오' },
  code: { en: 'AI Coding', cn: 'AI编程', jp: 'AIコーディング', kr: 'AI 코딩' },
  productivity: { en: 'AI Productivity', cn: 'AI效率', jp: 'AI生産性', kr: 'AI 생산성' },
  design: { en: 'AI Design', cn: 'AI设计', jp: 'AIデザイン', kr: 'AI 디자인' },
  writing: { en: 'AI Writing', cn: 'AI写作', jp: 'AI文章作成', kr: 'AI 글쓰기' },
};

export default function ToolDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { t, lang } = useLanguage();
  const [id, setId] = React.useState<string>('');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    params.then(p => {
      setId(p.id);
      setReady(true);
    });
  }, [params]);

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-gray-500">Loading...</div>
    </div>
  );

  const tool = aiTools.find(t => t.id === id);
  if (!tool) notFound();

  const relatedTools = aiTools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 6);
  const catName = t(categoryNames[tool.category] || { en: tool.category, cn: tool.category, jp: tool.category, kr: tool.category });

  const toolName = lang === 'en' ? tool.name : lang === 'cn' ? tool.nameCn : lang === 'jp' ? tool.nameJp : tool.nameKr;
  const toolDesc = lang === 'en' ? tool.description : lang === 'cn' ? tool.descriptionCn : lang === 'jp' ? tool.descriptionJp : tool.descriptionKr;
  const toolTags = lang === 'en' ? tool.tags : lang === 'cn' ? tool.tagsCn : lang === 'jp' ? tool.tagsJp : tool.tagsKr;
  const toolPricingNote = lang === 'en' ? tool.pricingNote : lang === 'cn' ? tool.pricingNoteCn : lang === 'jp' ? tool.pricingNoteJp : tool.pricingNoteKr;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600">{t({ en: 'Home', cn: '首页', jp: 'ホーム', kr: '홈' })}</Link>
            <span>/</span>
            <Link href={`/categories/${tool.category}`} className="hover:text-purple-600">{catName}</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{toolName}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tool Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
              tool.category === 'chatbot' ? 'bg-blue-100 dark:bg-blue-900/40' :
              tool.category === 'image' ? 'bg-pink-100 dark:bg-pink-900/40' :
              tool.category === 'video' ? 'bg-orange-100 dark:bg-orange-900/40' :
              tool.category === 'audio' ? 'bg-violet-100 dark:bg-violet-900/40' :
              tool.category === 'code' ? 'bg-gray-100 dark:bg-gray-700' :
              tool.category === 'writing' ? 'bg-green-100 dark:bg-green-900/40' :
              tool.category === 'design' ? 'bg-teal-100 dark:bg-teal-900/40' :
              'bg-yellow-100 dark:bg-yellow-900/40'
            }`}>
              {tool.category === 'chatbot' ? '💬' : tool.category === 'image' ? '🎨' : tool.category === 'video' ? '🎬' : tool.category === 'audio' ? '🎵' : tool.category === 'code' ? '💻' : tool.category === 'writing' ? '✍️' : tool.category === 'design' ? '🖼️' : '⚡'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{toolName}</h1>
                {tool.new && (
                  <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">NEW</span>
                )}
                {tool.featured && (
                  <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-xs font-medium rounded-full">
                    ⭐ {t({ en: 'Featured', cn: '精选', jp: '注目', kr: '피쳐드' })}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{tool.rating}</span>
                  <span className="text-gray-400 text-sm">({tool.reviewCount.toLocaleString()} {t({ en: 'reviews', cn: '评价', jp: 'レビュー', kr: '리뷰' })})</span>
                </div>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-medium ${
                  tool.pricing === 'free' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' :
                  tool.pricing === 'freemium' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400' :
                  'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400'
                }`}>
                  {tool.pricing === 'free'
                    ? t({ en: 'Free', cn: '免费', jp: '無料', kr: '무료' })
                    : tool.pricing === 'freemium'
                    ? 'Freemium'
                    : t({ en: 'Paid', cn: '付费', jp: '有料', kr: '유료' })}
                </span>
              </div>
            </div>
          </div>

          {/* Visit Button */}
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition text-lg"
          >
            🔗 {t({ en: `Visit ${tool.name} Website →`, cn: `访问 ${tool.nameCn} 官网 →`, jp: `${tool.nameJp} 公式サイトへ →`, kr: `${tool.nameKr} 웹사이트 방문 →` })}
          </a>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📝 {t({ en: 'About', cn: '工具介绍', jp: 'ツール紹介', kr: '도구 소개' })}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{toolDesc}</p>
        </div>

        {/* Tags */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            🏷️ {t({ en: 'Tags', cn: '标签', jp: 'タグ', kr: '태그' })}
          </h2>
          <div className="flex flex-wrap gap-2">
            {toolTags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            💰 {t({ en: 'Pricing', cn: '价格', jp: '料金', kr: '가격' })}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{toolPricingNote}</p>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              🔗 {t({ en: 'Related Tools', cn: '同类工具推荐', jp: '関連ツール', kr: '관련 도구' })}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map(rt => {
                const rtName = lang === 'en' ? rt.name : lang === 'cn' ? rt.nameCn : lang === 'jp' ? rt.nameJp : rt.nameKr;
                return (
                  <Link
                    key={rt.id}
                    href={`/tools/${rt.id}`}
                    className="block p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">{rtName}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{rt.rating}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="bg-gray-800 dark:bg-gray-800 py-8">
          <div className="max-w-4xl mx-auto px-4 flex justify-center">
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-sm">© 2026 AIHub</p>
        </div>
      </footer>
    </div>
  );
}
