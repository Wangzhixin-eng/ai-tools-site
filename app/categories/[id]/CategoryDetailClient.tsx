'use client';
import React from 'react';
import Link from 'next/link';
import { aiTools } from '../../../data/tools';
import ToolCard from '../../../components/ToolCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';

const BASE_PATH = '/ai-tools-site';

const categoryInfo: Record<string, {
  name: string; nameCn: string; nameJp: string; nameKr: string;
  emoji: string;
  desc: string; descCn: string; descJp: string; descKr: string;
}> = {
  chatbot: {
    name: 'Chat & AI', nameCn: '聊天AI', nameJp: 'チャットAI', nameKr: '챗봇 & AI',
    emoji: '💬',
    desc: 'Conversational AI and chatbots', descCn: '对话AI与聊天机器人',
    descJp: '会話型AIとチャットボット', descKr: '대화형 AI 및 챗봇',
  },
  image: {
    name: 'Image Generation', nameCn: '图像生成', nameJp: '画像生成', nameKr: '이미지 생성',
    emoji: '🎨',
    desc: 'AI image generation and editing', descCn: 'AI图像生成与编辑',
    descJp: 'AI画像生成と編集', descKr: 'AI 이미지 생성 및 편집',
  },
  video: {
    name: 'Video & Animation', nameCn: '视频动画', nameJp: '動画・アニメーション', nameKr: '비디오 & 애니메이션',
    emoji: '🎬',
    desc: 'AI video creation and editing', descCn: 'AI视频创作与剪辑',
    descJp: 'AI動画作成と編集', descKr: 'AI 비디오 제작 및 편집',
  },
  audio: {
    name: 'Audio & Music', nameCn: '音频音乐', nameJp: 'オーディオ・音楽', nameKr: '오디오 & 음악',
    emoji: '🎵',
    desc: 'AI audio and music generation', descCn: 'AI音频与音乐生成',
    descJp: 'AIオーディオと音楽生成', descKr: 'AI 오디오 및 음악 생성',
  },
  code: {
    name: 'Code & Dev', nameCn: '编程开发', nameJp: 'コーディング', nameKr: '코딩',
    emoji: '💻',
    desc: 'AI coding assistants and dev tools', descCn: 'AI编程助手与开发工具',
    descJp: 'AIコーディングアシスタントと開発ツール', descKr: 'AI 코딩 어시스턴트 및 개발 도구',
  },
  productivity: {
    name: 'Productivity', nameCn: '效率工具', nameJp: '生産性ツール', nameKr: '생산성 도구',
    emoji: '⚡',
    desc: 'AI productivity and automation tools', descCn: 'AI效率与自动化工具',
    descJp: 'AI生産性と自動化ツール', descKr: 'AI 생산성 및 자동화 도구',
  },
  design: {
    name: 'Design & UI', nameCn: '设计UI', nameJp: 'デザイン・UI', nameKr: '디자인 & UI',
    emoji: '🖼️',
    desc: 'AI design and UI tools', descCn: 'AI设计与UI工具',
    descJp: 'AIデザインとUIツール', descKr: 'AI 디자인 및 UI 도구',
  },
  writing: {
    name: 'Writing & Text', nameCn: '写作文本', nameJp: '文章作成', nameKr: '글쓰기',
    emoji: '✍️',
    desc: 'AI writing and text tools', descCn: 'AI写作与文本工具',
    descJp: 'AI文章作成とテキストツール', descKr: 'AI 글쓰기 및 텍스트 도구',
  },
};

export default function CategoryDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { lang, t } = useLanguage();
  const [id, setId] = React.useState<string>('');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    params.then(p => {
      setId(p.id);
      setReady(true);
    });
  }, [params]);

  if (!ready) return null;

  const info = categoryInfo[id];
  if (!info) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-gray-500">Category not found</div>
    </div>
  );

  const tools = aiTools.filter(tool => tool.category === id);
  const catName = t({ en: info.name, cn: info.nameCn, jp: info.nameJp, kr: info.nameKr });
  const catDesc = t({ en: info.desc, cn: info.descCn, jp: info.descJp, kr: info.descKr });

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
            <Link href="/new" className="text-gray-600 dark:text-gray-300 text-sm">{t({ en: 'New', cn: '最新', jp: '新着', kr: '신규' })}</Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/categories">{t({ en: 'Categories', cn: '分类', jp: 'カテゴリ', kr: '카테고리' })}</Link>
          <span>›</span>
          <span className="text-purple-600">{catName}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
        <div className="text-5xl mb-4">{info.emoji}</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{catName}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{catDesc}</p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <span className="text-purple-600 dark:text-purple-400 font-medium">
          {t({ en: `${tools.length} tools in this category`, cn: `${tools.length}个工具`, jp: `${tools.length}個のツール`, kr: `${tools.length}개 도구` })}
        </span>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {tools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{info.emoji}</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">
              {t({ en: 'Coming soon!', cn: '即将上线！', jp: '近日公開！', kr: '곧 출시!' })}
            </h3>
            <Link href="/categories" className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
              {t({ en: 'Browse other categories →', cn: '浏览其他分类 →', jp: '他のカテゴリを見る →', kr: '다른 카테고리 탐색 →' })}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} basePath={BASE_PATH} />
            ))}
          </div>
        )}
      </div>

      {/* Other Categories */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {t({ en: 'Explore more categories', cn: '探索更多分类', jp: '他のカテゴリを見る', kr: '더 많은 카테고리 탐색' })}
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(categoryInfo)
              .filter(([catId]) => catId !== id)
              .map(([catId, cat]) => {
                const name = t({ en: cat.name, cn: cat.nameCn, jp: cat.nameJp, kr: cat.nameKr });
                return (
                  <Link key={catId} href={`/categories/${catId}`}>
                    <span className="inline-flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition cursor-pointer">
                      {cat.emoji} {name}
                    </span>
                  </Link>
                );
              })}
          </div>
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
