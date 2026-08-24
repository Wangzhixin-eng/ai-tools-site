'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    nameCn: string;
    nameJp: string;
    nameKr: string;
    description: string;
    descriptionCn: string;
    descriptionJp: string;
    descriptionKr: string;
    category: string;
    pricing: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    tagsCn: string[];
    tagsJp: string[];
    tagsKr: string[];
    new?: boolean;
    website: string;
  };
  basePath?: string;
}

export default function ToolCard({ tool, basePath = '' }: ToolCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { lang, t } = useLanguage();

  const toolName = lang === 'en' ? tool.name : lang === 'cn' ? tool.nameCn : lang === 'jp' ? tool.nameJp : tool.nameKr;
  const toolDesc = lang === 'en' ? tool.description : lang === 'cn' ? tool.descriptionCn : lang === 'jp' ? tool.descriptionJp : tool.descriptionKr;
  const toolTags = lang === 'en' ? tool.tags : lang === 'cn' ? tool.tagsCn : lang === 'jp' ? tool.tagsJp : tool.tagsKr;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group overflow-hidden">
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
                {toolName}
              </h3>
            </div>
          </div>
          {tool.new && (
            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-medium rounded-full flex-shrink-0">
              NEW
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed line-clamp-2">
          {toolDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {toolTags.slice(0, 3).map((tag, i) => (
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
              {tool.pricing === 'free'
                ? t({ en: 'Free', cn: '免费', jp: '無料', kr: '무료' })
                : tool.pricing === 'freemium'
                ? 'Freemium'
                : t({ en: 'Paid', cn: '付费', jp: '有料', kr: '유료' })}
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
          {t({ en: 'Visit Website →', cn: '访问官网 →', jp: '公式サイトへ →', kr: '웹사이트 방문 →' })}
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
