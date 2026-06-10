'use client';

import { useState } from 'react';
import { aiTools } from '@/data/tools';
import { searchTools } from '@/data/tools';
import Link from 'next/link';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchTools>>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      setResults(searchTools(value));
    } else {
      setResults([]);
    }
  };

  return (
    <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
            🌟 {aiTools.length}+ AI Tools Updated | {aiTools.length}+ AI工具持续更新
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Discover the Best<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">AI Tools in 2026</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
            探索2026年最佳AI工具 · Comprehensive reviews, ratings and comparisons<br />
            全面的评测、评分和对比
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search AI tools... (e.g. ChatGPT, Midjourney, 图像生成)"
              className="w-full px-6 py-4 pl-14 rounded-2xl text-gray-900 placeholder-gray-400 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">🔍</div>
            {query.length > 0 && (
              <button
                onClick={() => { setQuery(''); setResults([]); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              {results.slice(0, 8).map((tool) => (
                <a
                  key={tool.id}
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-3 hover:bg-purple-50 transition border-b border-gray-100 last:border-0"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl shrink-0">
                    {getCategoryEmoji(tool.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">{tool.name}</div>
                    <div className="text-xs text-gray-500 truncate">{tool.nameCn} · {tool.descriptionCn}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                    tool.pricing === 'free' ? 'bg-green-100 text-green-700' :
                    tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {tool.pricing === 'free' ? '免费' : tool.pricing === 'freemium' ? ' freemium' : '付费'}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['ChatGPT', 'Midjourney', 'Claude', 'Suno', 'Cursor', '可灵AI', '豆包', 'DeepSeek'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleSearch(tag)}
              className="px-4 py-1.5 bg-white/15 hover:bg-white/25 rounded-full text-sm font-medium transition backdrop-blur-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    chatbot: '💬', writing: '✍️', image: '🎨', video: '🎬',
    audio: '🎵', code: '💻', productivity: '⚡', design: '🖼️',
  };
  return emojis[category] || '🤖';
}


