'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { AITool } from '@/data/tools';

interface ToolCardProps {
  tool: AITool;
  basePath?: string;
}

const pricingLabel = {
  free: { en: 'Free', cn: '免费', jp: '無料', kr: '무료' },
  freemium: { en: 'Freemium', cn: 'Freemium', jp: 'フレミアム', kr: '프리미엄' },
  paid: { en: 'Paid', cn: '付费', jp: '有料', kr: '유료' },
};

const visitLabel = { en: 'Visit →', cn: '访问官网 →', jp: '公式サイト →', kr: '공식 사이트 →' };

const newLabel = { en: 'NEW', cn: '新', jp: '新', kr: '신규' };

const sponsoredLabel = { en: '⭐ Sponsor', cn: '⭐ 赞助', jp: '⭐ 赞助', kr: '⭐ 스폰서' };

export default function ToolCard({ tool, basePath = '' }: ToolCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { t, lang } = useLanguage();

  const name = t({ en: tool.name, cn: tool.nameCn, jp: tool.nameJp, kr: tool.nameKr });
  const desc = t({ en: tool.description, cn: tool.descriptionCn, jp: tool.descriptionJp, kr: tool.descriptionKr });
  const tags = lang === 'en' ? tool.tags : lang === 'cn' ? tool.tagsCn : lang === 'jp' ? tool.tagsJp : tool.tagsKr;
  const pricingText = pricingLabel[tool.pricing][lang];
  const visitText = visitLabel[lang];
  const newText = newLabel[lang];
  const sponsorText = sponsoredLabel[lang];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group overflow-hidden ${tool.sponsored ? 'ring-2 ring-yellow-400/40' : ''}`}>
      {/* Clickable card area → detail page */}
      <a
        href={`${basePath}/tools/${tool.id}`}
        className="block p-5 no-underline"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
              tool.category === 'chatbot' ? 'bg-blue-100 dark:bg-blue-900/40' :
              tool.category === 'image' ? 'bg-pink-100 dark:bg-pink-900/40' :
              tool.category === 'video' ? 'bg-orange-100 dark:bg-orange-900/40' :
              tool.category === 'audio' ? 'bg-violet-100 dark:bg-violet-900/40' :
              tool.category === 'code' ? 'bg-gray-100 dark:bg-gray-700' :
              tool.category === 'writing' ? 'bg-green-100 dark:bg-green-900/40' :
              tool.category === 'design' ? 'bg-teal-100 dark:bg-teal-900/40' :
              'bg-yellow-100 dark:bg-yellow-900/40'
            }`}>
              {getCategoryEmoji(tool.category)}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition truncate">
                {name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {tool.sponsored && (
              <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-xs font-medium rounded-full">
                {sponsorText}
              </span>
            )}
            {tool.new && (
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                {newText}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed line-clamp-2">
          {desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold text-gray-900 dark:text-white text-sm">{tool.rating}</span>
            <span className="text-gray-400 dark:text-gray-500 text-xs">({tool.reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
              tool.pricing === 'free' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' :
              tool.pricing === 'freemium' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400' :
              'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400'
            }`}>
              {pricingText}
            </span>
          </div>
        </div>
      </a>

      {/* Visit button — stops propagation, opens external link */}
      <div className="px-5 pb-4 pt-0">
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block w-full text-center px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition"
        >
          {visitText}
        </a>
      </div>
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    chatbot: '💬', writing: '✍️', image: '🎨', video: '🎬',
    audio: '🎵', code: '💻', productivity: '⚡', design: '🖼️',
  };
  return emojis[category] || '🤖';
}
