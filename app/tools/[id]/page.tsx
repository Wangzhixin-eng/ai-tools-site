import { aiTools, categories, getToolsByCategory } from '@/data/tools';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

export function generateStaticParams() {
  return aiTools.map((tool) => ({ id: tool.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = aiTools.find(t => t.id === id);
  if (!tool) return { title: 'Tool Not Found' };
  return {
    title: `${tool.name} - ${tool.nameCn} | AIHub`,
    description: tool.descriptionCn,
  };
}

const categoryNames: Record<string, string> = {
  chatbot: 'AI 对话',
  image: 'AI 图像',
  video: 'AI 视频',
  audio: 'AI 音频',
  code: 'AI 编程',
  productivity: 'AI 效率',
  design: 'AI 设计',
  writing: 'AI 写作',
};

async function ToolDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = aiTools.find(t => t.id === id);
  
  if (!tool) {
    notFound();
  }

  const relatedTools = aiTools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-purple-600">首页</Link>
            <span>/</span>
            <Link href={`/categories/${tool.category}`} className="hover:text-purple-600">
              {categoryNames[tool.category] || tool.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{tool.name}</span>
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
                <span className="text-lg text-gray-500 dark:text-gray-400">{tool.nameCn}</span>
                {tool.new && (
                  <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">NEW</span>
                )}
                {tool.featured && (
                  <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-xs font-medium rounded-full">⭐ 精选</span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{tool.rating}</span>
                  <span className="text-gray-400 text-sm">({tool.reviewCount.toLocaleString()} 评价)</span>
                </div>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-medium ${
                  tool.pricing === 'free' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' :
                  tool.pricing === 'freemium' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400' :
                  'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400'
                }`}>
                  {tool.pricing === 'free' ? '免费' : tool.pricing === 'freemium' ? 'Freemium' : '付费'}
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
            🔗 访问 {tool.name} 官网 →
          </a>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📝 工具介绍</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{tool.descriptionCn}</p>
          <p className="text-gray-400 dark:text-gray-500 leading-relaxed italic">{tool.description}</p>
        </div>

        {/* Tags */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🏷️ 标签</h2>
          <div className="flex flex-wrap gap-2">
            {tool.tagsCn.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-lg">
                {tag}
              </span>
            ))}
            {tool.tags.map((tag, i) => (
              <span key={`en-${i}`} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💰 价格</h2>
          <p className="text-gray-600 dark:text-gray-300">{tool.pricingNote}</p>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              🔗 同类工具推荐
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map(t => (
                <Link
                  key={t.id}
                  href={`/tools/${t.id}`}
                  className="block p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t.nameCn}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>}>
      <ToolDetailContent params={params} />
    </Suspense>
  );
}
